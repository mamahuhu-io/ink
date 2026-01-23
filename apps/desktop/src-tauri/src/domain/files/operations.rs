//! File operation commands

use crate::core::error::{AppError, AppResult};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use std::time::UNIX_EPOCH;

use crate::utils::{show_in_folder as show_in_folder_util, validate_directory, validate_file_path, validate_path};

#[derive(Debug, Serialize, Deserialize)]
pub struct AppInfo {
    pub name: String,
    pub version: String,
    pub os: String,
    pub platform: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileContent {
    pub path: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub is_directory: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileMetadata {
    pub path: String,
    pub size: u64,
    pub modified: u64,
    pub is_directory: bool,
}

/// Read file content from the given path
#[tauri::command]
pub fn read_file(path: String) -> AppResult<FileContent> {
    let _span = tracing::info_span!("read_file", path = %path).entered();

    // Validate path to prevent path traversal attacks
    let validated_path = validate_file_path(&path, true)
        .map_err(|e| AppError::InvalidPath(e))?;

    match fs::read_to_string(&validated_path) {
        Ok(content) => {
            tracing::debug!("Successfully read {} bytes", content.len());
            Ok(FileContent { path, content })
        }
        Err(e) => {
            tracing::error!("Failed to read file: {}", e);
            Err(AppError::FileReadError {
                path: validated_path,
                source: e,
            })
        }
    }
}

/// Write content to the given file path
#[tauri::command]
pub fn write_file(path: String, content: String) -> AppResult<()> {
    let _span = tracing::info_span!("write_file", path = %path, size = content.len()).entered();

    // Validate path to prevent path traversal attacks
    let validated_path = validate_file_path(&path, false)
        .map_err(|e| AppError::InvalidPath(e))?;

    // Create parent directories if they don't exist
    if let Some(parent) = validated_path.parent() {
        if !parent.exists() {
            tracing::debug!("Creating parent directories");
            fs::create_dir_all(parent).map_err(|e| AppError::FileWriteError {
                path: validated_path.clone(),
                source: e,
            })?;
        }
    }

    match fs::write(&validated_path, &content) {
        Ok(_) => {
            tracing::info!("Successfully wrote {} bytes", content.len());
            Ok(())
        }
        Err(e) => {
            tracing::error!("Failed to write file: {}", e);
            Err(AppError::FileWriteError {
                path: validated_path,
                source: e,
            })
        }
    }
}

/// Get application info
#[tauri::command]
pub fn get_app_info() -> AppInfo {
    AppInfo {
        name: "Ink".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        os: std::env::consts::OS.to_string(),
        platform: std::env::consts::FAMILY.to_string(),
    }
}

/// List directory contents, filtering for markdown files
#[tauri::command]
pub fn list_directory(path: String, markdown_only: bool) -> AppResult<Vec<FileEntry>> {
    let _span = tracing::info_span!("list_directory", path = %path, markdown_only).entered();

    // Validate directory path to prevent path traversal attacks
    let dir_path = validate_directory(&path)
        .map_err(|e| AppError::InvalidPath(e))?;

    let mut entries: Vec<FileEntry> = Vec::new();

    match fs::read_dir(&dir_path) {
        Ok(read_dir) => {
            for entry in read_dir.flatten() {
                let entry_path = entry.path();
                let name = entry.file_name().to_string_lossy().to_string();

                // Skip hidden files/folders
                if name.starts_with('.') {
                    continue;
                }

                let is_dir = entry_path.is_dir();

                // If markdown_only, filter files but keep directories
                if markdown_only && !is_dir {
                    let ext = entry_path
                        .extension()
                        .map(|e| e.to_string_lossy().to_lowercase());
                    if ext != Some("md".to_string()) && ext != Some("markdown".to_string()) {
                        continue;
                    }
                }

                entries.push(FileEntry {
                    name,
                    path: entry_path.to_string_lossy().to_string(),
                    is_directory: is_dir,
                });
            }
        }
        Err(e) => {
            return Err(AppError::FileReadError {
                path: dir_path,
                source: e,
            })
        }
    }

    // Sort: directories first, then files, alphabetically
    entries.sort_by(|a, b| match (a.is_directory, b.is_directory) {
        (true, false) => std::cmp::Ordering::Less,
        (false, true) => std::cmp::Ordering::Greater,
        _ => a.name.to_lowercase().cmp(&b.name.to_lowercase()),
    });

    tracing::debug!("Listed {} entries", entries.len());
    Ok(entries)
}

/// Get user's home directory
#[tauri::command]
pub fn get_home_directory() -> AppResult<String> {
    dirs::home_dir()
        .map(|p| p.to_string_lossy().to_string())
        .ok_or(AppError::Generic("Could not determine home directory".to_string()))
}

/// Create a new directory
#[tauri::command]
pub fn create_directory(path: String) -> AppResult<()> {
    // Validate path to prevent path traversal attacks
    let validated_path = validate_path(&path)
        .map_err(|e| AppError::InvalidPath(e))?;
    fs::create_dir_all(&validated_path).map_err(|e| AppError::Io(e))
}

/// Delete a file or directory
#[tauri::command]
pub fn delete_path(path: String) -> AppResult<()> {
    // Validate path to prevent path traversal attacks
    let validated_path = validate_path(&path)
        .map_err(|e| AppError::InvalidPath(e))?;

    if !validated_path.exists() {
        if validated_path.is_dir() {
            return Err(AppError::DirectoryNotFound(validated_path));
        } else {
            return Err(AppError::FileNotFound(validated_path));
        }
    }

    if validated_path.is_dir() {
        fs::remove_dir_all(&validated_path).map_err(|e| AppError::Io(e))
    } else {
        fs::remove_file(&validated_path).map_err(|e| AppError::Io(e))
    }
}

/// Rename/move a file or directory
#[tauri::command]
pub fn rename_path(old_path: String, new_path: String) -> AppResult<()> {
    // Validate both paths to prevent path traversal attacks
    let validated_old = validate_path(&old_path)
        .map_err(|e| AppError::InvalidPath(e))?;
    let validated_new = validate_path(&new_path)
        .map_err(|e| AppError::InvalidPath(e))?;

    if !validated_old.exists() {
        return Err(AppError::FileNotFound(validated_old));
    }

    fs::rename(&validated_old, &validated_new).map_err(|e| AppError::Io(e))
}

/// Get file or directory metadata
#[tauri::command]
pub fn get_file_metadata(path: String) -> AppResult<FileMetadata> {
    // Validate path to prevent path traversal attacks
    let validated_path = validate_path(&path)
        .map_err(|e| AppError::InvalidPath(e))?;

    if !validated_path.exists() {
        return Err(AppError::FileNotFound(validated_path));
    }

    let metadata = fs::metadata(&validated_path).map_err(|e| AppError::Io(e))?;

    let modified = metadata
        .modified()
        .ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs())
        .unwrap_or(0);

    Ok(FileMetadata {
        path,
        size: metadata.len(),
        modified,
        is_directory: metadata.is_dir(),
    })
}

/// Ensure the assets directory exists next to a markdown file
#[tauri::command]
pub fn ensure_assets_directory(markdown_path: String) -> AppResult<String> {
    let md_path = Path::new(&markdown_path);

    let parent = md_path
        .parent()
        .ok_or(AppError::Generic("Could not determine parent directory".to_string()))?;

    let assets_path = parent.join("assets");

    if !assets_path.exists() {
        fs::create_dir_all(&assets_path).map_err(|e| AppError::Io(e))?;
    }

    Ok(assets_path.to_string_lossy().to_string())
}

/// Save binary image data to a file
#[tauri::command]
pub fn save_image(file_path: String, image_data: Vec<u8>) -> AppResult<String> {
    let path = Path::new(&file_path);

    // Create parent directories if they don't exist
    if let Some(parent) = path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent).map_err(|e| AppError::Io(e))?;
        }
    }

    fs::write(path, &image_data).map_err(|e| AppError::FileWriteError {
        path: path.to_path_buf(),
        source: e,
    })?;

    Ok(file_path)
}

/// Read binary file (for images)
#[tauri::command]
pub fn read_binary_file(path: String) -> AppResult<Vec<u8>> {
    // Validate path to prevent path traversal attacks
    let validated_path = validate_file_path(&path, true)
        .map_err(|e| AppError::InvalidPath(e))?;

    fs::read(&validated_path).map_err(|e| AppError::FileReadError {
        path: validated_path,
        source: e,
    })
}

/// Write binary data to a file
#[tauri::command]
pub fn write_binary_file(path: String, data: Vec<u8>) -> AppResult<()> {
    // Validate path to prevent path traversal attacks
    let validated_path = validate_file_path(&path, false)
        .map_err(|e| AppError::InvalidPath(e))?;

    // Create parent directories if they don't exist
    if let Some(parent) = validated_path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent).map_err(|e| AppError::Io(e))?;
        }
    }

    fs::write(&validated_path, &data).map_err(|e| AppError::FileWriteError {
        path: validated_path,
        source: e,
    })
}

// ============================================
// Sidebar State
// ============================================

/// Update the sidebar menu check state
#[tauri::command]
pub fn set_sidebar_visible(
    app_handle: tauri::AppHandle,
    sidebar_state: tauri::State<'_, crate::app::state::SidebarState>,
    visible: bool,
) -> AppResult<()> {
    // Store the state for menu rebuilds
    if let Ok(mut state) = sidebar_state.0.lock() {
        *state = visible;
    }

    crate::domain::menu::update_sidebar_check_state(&app_handle, visible);
    Ok(())
}

/// Reveal file in system explorer
#[tauri::command]
pub fn show_in_folder(path: String) -> AppResult<()> {
    // Validate path to prevent command injection
    let validated_path = validate_path(&path)
        .map_err(|e| AppError::InvalidPath(e))?;

    // Use the platform utility function
    show_in_folder_util(validated_path.to_str()
        .ok_or(AppError::Generic("Invalid path encoding".to_string()))?
    ).map_err(|e| AppError::Generic(e))?;

    Ok(())
}