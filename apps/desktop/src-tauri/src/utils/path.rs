//! Path validation utilities for security
//!
//! This module provides comprehensive path validation functions to prevent
//! path traversal attacks and other file system security vulnerabilities.
//!
//! # Security Model
//!
//! All file operations in the application MUST go through these validation
//! functions before accessing the file system. This provides defense-in-depth
//! against:
//!
//! - **Path Traversal**: Blocks ".." sequences that could escape intended directories
//! - **Symlink Attacks**: Canonicalizes paths to resolve symlinks
//! - **Directory/File Type Confusion**: Validates expected path types
//!
//! # Validation Levels
//!
//! 1. **Basic**: `validate_path()` - Checks for ".." and canonicalizes
//! 2. **Directory**: `validate_directory()` - Ensures path is an existing directory
//! 3. **File**: `validate_file_path()` - Validates file paths with existence options
//! 4. **Restricted**: `validate_path_in_base()` - Confines paths to specific directories
//!
//! # Usage Pattern
//!
//! ```rust,ignore
//! // In any command that accepts user-provided paths:
//! #[tauri::command]
//! pub fn read_file(path: String) -> Result<String, String> {
//!     let safe_path = validate_file_path(&path, true)?;
//!     // Now safe to use safe_path for file operations
//!     std::fs::read_to_string(safe_path)
//!         .map_err(|e| e.to_string())
//! }
//! ```
//!
//! # Testing
//!
//! Contains 11 comprehensive tests covering:
//! - Path traversal detection (simple and nested)
//! - Valid path acceptance
//! - Directory/file type validation
//! - Base directory confinement

use std::path::{Path, PathBuf};

/// Validates that a path is safe to access
/// Returns the canonicalized path if valid, or an error if the path is unsafe
pub fn validate_path(path: &str) -> Result<PathBuf, String> {
    let path_buf = PathBuf::from(path);

    // Check for path traversal attempts
    if path.contains("..") {
        return Err("Path contains '..' which is not allowed".to_string());
    }

    // Ensure the path exists before canonicalizing
    // (canonicalize requires the path to exist)
    if !path_buf.exists() {
        // For new files, validate the parent directory instead
        if let Some(parent) = path_buf.parent() {
            if !parent.exists() {
                return Err(format!("Parent directory does not exist: {}", parent.display()));
            }
        }
        return Ok(path_buf);
    }

    // Canonicalize the path to resolve any symlinks and relative paths
    path_buf.canonicalize()
        .map_err(|e| format!("Failed to canonicalize path: {}", e))
}

/// Validates that a path is within an allowed base directory
/// This is useful for restricting file access to specific directories
#[allow(dead_code)]
pub fn validate_path_in_base(path: &str, base_dir: &Path) -> Result<PathBuf, String> {
    let validated_path = validate_path(path)?;
    let canonical_base = base_dir
        .canonicalize()
        .map_err(|e| format!("Failed to canonicalize base directory: {}", e))?;

    // Check if the validated path starts with the base directory
    if validated_path.starts_with(&canonical_base) {
        Ok(validated_path)
    } else {
        Err(format!(
            "Path '{}' is outside allowed directory '{}'",
            validated_path.display(),
            canonical_base.display()
        ))
    }
}

/// Validates a directory path for listing operations
pub fn validate_directory(path: &str) -> Result<PathBuf, String> {
    let validated_path = validate_path(path)?;

    if !validated_path.exists() {
        return Err(format!("Directory not found: {}", path));
    }

    if !validated_path.is_dir() {
        return Err(format!("Not a directory: {}", path));
    }

    Ok(validated_path)
}

/// Validates a file path for read/write operations
pub fn validate_file_path(path: &str, must_exist: bool) -> Result<PathBuf, String> {
    let validated_path = validate_path(path)?;

    if must_exist && !validated_path.exists() {
        return Err(format!("File not found: {}", path));
    }

    if validated_path.exists() && validated_path.is_dir() {
        return Err(format!("Path is a directory, not a file: {}", path));
    }

    Ok(validated_path)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::env;

    #[test]
    fn test_path_traversal_detection() {
        let result = validate_path("../etc/passwd");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains(".."));
    }

    #[test]
    fn test_path_traversal_nested() {
        let result = validate_path("/home/user/../../etc/passwd");
        assert!(result.is_err());
    }

    #[test]
    fn test_valid_absolute_path() {
        // Create a temporary file for testing
        let temp_dir = env::temp_dir();
        let test_file = temp_dir.join("test_file.txt");
        fs::write(&test_file, "test").unwrap();

        let result = validate_path(test_file.to_str().unwrap());
        assert!(result.is_ok());

        // Cleanup
        fs::remove_file(test_file).ok();
    }

    #[test]
    fn test_directory_validation() {
        let temp_dir = env::temp_dir();
        let result = validate_directory(temp_dir.to_str().unwrap());
        assert!(result.is_ok());
    }

    #[test]
    fn test_directory_validation_nonexistent() {
        let result = validate_directory("/nonexistent/directory/path");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("not found"));
    }

    #[test]
    fn test_directory_validation_file_instead() {
        let temp_dir = env::temp_dir();
        let test_file = temp_dir.join("test_not_dir.txt");
        fs::write(&test_file, "test").unwrap();

        let result = validate_directory(test_file.to_str().unwrap());
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Not a directory"));

        fs::remove_file(test_file).ok();
    }

    #[test]
    fn test_file_path_validation_must_exist() {
        let temp_dir = env::temp_dir();
        let test_file = temp_dir.join("test_exists.txt");
        fs::write(&test_file, "test").unwrap();

        let result = validate_file_path(test_file.to_str().unwrap(), true);
        assert!(result.is_ok());

        fs::remove_file(test_file).ok();
    }

    #[test]
    fn test_file_path_validation_not_exist_ok() {
        let result = validate_file_path("/tmp/new_file_123456.txt", false);
        assert!(result.is_ok());
    }

    #[test]
    fn test_file_path_validation_directory_instead() {
        let temp_dir = env::temp_dir();
        let result = validate_file_path(temp_dir.to_str().unwrap(), false);
        assert!(result.is_err());
    }

    #[test]
    fn test_validate_path_in_base() {
        let temp_dir = env::temp_dir();
        let test_file = temp_dir.join("test_in_base.txt");
        fs::write(&test_file, "test").unwrap();

        let result = validate_path_in_base(test_file.to_str().unwrap(), &temp_dir);
        assert!(result.is_ok());

        fs::remove_file(test_file).ok();
    }

    #[test]
    fn test_validate_path_outside_base() {
        let temp_dir = env::temp_dir();
        let outside_path = "/etc/passwd";

        let result = validate_path_in_base(outside_path, &temp_dir);
        // This will fail because /etc/passwd doesn't exist in temp or access denied
        assert!(result.is_err());
    }
}
