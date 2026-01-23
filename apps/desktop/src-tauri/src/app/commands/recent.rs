//! Recent items commands with caching

use crate::core::config::recent_items as recent_config;
use crate::domain::recent::items::RecentItems;
use std::sync::Arc;
use tauri::{AppHandle, Emitter};

/// Tauri command to add a file to recent items
#[tauri::command]
pub fn add_recent_file(
    app: AppHandle,
    recent_manager: tauri::State<'_, Arc<crate::domain::recent::manager::RecentItemsManager>>,
    file_path: String,
    limit: Option<usize>,
) -> Result<(), String> {
    // Use provided limit or default from configuration, capped at max
    let limit = limit
        .unwrap_or(recent_config::DEFAULT_LIMIT)
        .min(recent_config::MAX_LIMIT);

    // Add to cache
    recent_manager.add_file(file_path, limit);

    // Persist to disk
    recent_manager.save().map_err(|e| e.to_string())?;

    // Notify frontend
    let _ = app.emit("recent-items-changed", ());

    // Rebuild menu to show updated recent items
    crate::domain::menu::rebuild_menu(&app).map_err(|e| e.to_string())
}

/// Tauri command to add a folder to recent items
#[tauri::command]
pub fn add_recent_folder(
    app: AppHandle,
    recent_manager: tauri::State<'_, Arc<crate::domain::recent::manager::RecentItemsManager>>,
    folder_path: String,
    limit: Option<usize>,
) -> Result<(), String> {
    // Use provided limit or default from configuration, capped at max
    let limit = limit
        .unwrap_or(recent_config::DEFAULT_LIMIT)
        .min(recent_config::MAX_LIMIT);

    // Add to cache
    recent_manager.add_folder(folder_path, limit);

    // Persist to disk
    recent_manager.save().map_err(|e| e.to_string())?;

    // Notify frontend
    let _ = app.emit("recent-items-changed", ());

    // Rebuild menu to show updated recent items
    crate::domain::menu::rebuild_menu(&app).map_err(|e| e.to_string())
}

/// Tauri command to get recent items
#[tauri::command]
pub fn get_recent_items(
    recent_manager: tauri::State<'_, Arc<crate::domain::recent::manager::RecentItemsManager>>,
) -> Result<RecentItems, String> {
    Ok(recent_manager.get_items())
}

/// Tauri command to clear recent items
#[tauri::command]
pub fn clear_recent_items(
    app: AppHandle,
    recent_manager: tauri::State<'_, Arc<crate::domain::recent::manager::RecentItemsManager>>,
) -> Result<(), String> {
    // Clear items
    recent_manager.clear();

    // Persist to disk
    recent_manager.save().map_err(|e| e.to_string())?;

    // Notify frontend
    let _ = app.emit("recent-items-changed", ());

    // Rebuild menu
    crate::domain::menu::rebuild_menu(&app).map_err(|e| e.to_string())
}
