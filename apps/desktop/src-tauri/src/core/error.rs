//! Unified error types for the application
//!
//! Provides a centralized error handling system using thiserror.

use std::io;
use std::path::PathBuf;
use thiserror::Error;

/// Main application error type
#[derive(Error, Debug)]
pub enum AppError {
    // File system errors
    #[error("File not found: {0}")]
    FileNotFound(PathBuf),

    #[error("Directory not found: {0}")]
    DirectoryNotFound(PathBuf),

    #[error("Path is not a file: {0}")]
    NotAFile(PathBuf),

    #[error("Path is not a directory: {0}")]
    NotADirectory(PathBuf),

    #[error("Failed to read file: {path}")]
    FileReadError {
        path: PathBuf,
        #[source]
        source: io::Error,
    },

    #[error("Failed to write file: {path}")]
    FileWriteError {
        path: PathBuf,
        #[source]
        source: io::Error,
    },

    // Path validation errors
    #[error("Invalid path: {0}")]
    InvalidPath(String),

    #[error("Path traversal attempt detected: {0}")]
    PathTraversal(String),

    #[error("Path outside allowed directory: {0}")]
    PathOutsideBase(PathBuf),

    // Recent items errors
    #[error("Failed to load recent items")]
    RecentItemsLoadError(#[source] Box<dyn std::error::Error + Send + Sync>),

    #[error("Failed to save recent items")]
    RecentItemsSaveError(#[source] Box<dyn std::error::Error + Send + Sync>),

    // Theme errors
    #[error("Theme not found: {0}")]
    ThemeNotFound(String),

    #[error("Failed to read theme CSS: {0}")]
    ThemeReadError(String),

    #[error("Failed to initialize theme manager")]
    ThemeInitError(#[source] Box<dyn std::error::Error + Send + Sync>),

    // Menu errors
    #[error("Failed to rebuild menu")]
    MenuRebuildError(#[source] Box<dyn std::error::Error + Send + Sync>),

    // Search errors
    #[error("Search failed in directory: {0}")]
    SearchError(PathBuf),

    #[error("Search query is empty")]
    EmptySearchQuery,

    // I/O errors
    #[error("I/O error")]
    Io(#[from] io::Error),

    // JSON errors
    #[error("JSON serialization error")]
    JsonError(#[from] serde_json::Error),

    // Tauri errors
    #[error("Tauri error")]
    TauriError(#[from] tauri::Error),

    // Generic errors
    #[error("Operation failed: {0}")]
    Generic(String),

    #[error("Internal error: {0}")]
    Internal(String),
}

/// Result type alias for application operations
pub type AppResult<T> = Result<T, AppError>;

/// Convert AppError to String for Tauri commands
impl From<AppError> for String {
    fn from(error: AppError) -> Self {
        error.to_string()
    }
}

/// Convert AppError to Tauri's InvokeError for command handlers
impl From<AppError> for tauri::ipc::InvokeError {
    fn from(error: AppError) -> Self {
        tauri::ipc::InvokeError::from_anyhow(anyhow::Error::msg(error.to_string()))
    }
}

/// Helper macro to create a generic error quickly
#[macro_export]
macro_rules! app_error {
    ($msg:expr) => {
        $crate::error::AppError::Generic($msg.to_string())
    };
    ($fmt:expr, $($arg:tt)*) => {
        $crate::error::AppError::Generic(format!($fmt, $($arg)*))
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_error_display() {
        let err = AppError::FileNotFound(PathBuf::from("/test/file.txt"));
        assert_eq!(err.to_string(), "File not found: /test/file.txt");
    }

    #[test]
    fn test_error_conversion_to_string() {
        let err = AppError::InvalidPath("../etc/passwd".to_string());
        let s: String = err.into();
        assert!(s.contains("Invalid path"));
    }

    #[test]
    fn test_path_traversal_error() {
        let err = AppError::PathTraversal("..".to_string());
        assert!(err.to_string().contains("Path traversal"));
    }
}
