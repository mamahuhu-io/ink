//! Application configuration constants
//!
//! This module contains all configurable constants used throughout the application.
//! Centralizing these values makes the codebase more maintainable and easier to tune.

/// Search-related configuration
pub mod search {
    /// Maximum number of search results to return
    pub const MAX_RESULTS: usize = 50;

    /// Maximum directory depth to traverse during search
    pub const MAX_DEPTH: usize = 10;

    /// Maximum number of matches to show per file
    pub const MAX_MATCHES_PER_FILE: usize = 10;
}

/// Recent items configuration
pub mod recent_items {
    /// Default limit for recent files/folders to keep
    pub const DEFAULT_LIMIT: usize = 10;

    /// Maximum limit for recent files/folders (hard cap)
    pub const MAX_LIMIT: usize = 50;
}

/// File watcher configuration
pub mod file_watcher {
    use std::time::Duration;

    /// Debounce duration for file change events (in milliseconds)
    /// This prevents excessive event firing for rapid file changes
    #[allow(dead_code)]
    pub const DEBOUNCE_MS: u64 = 500;

    /// Returns the debounce duration
    #[allow(dead_code)]
    pub fn debounce_duration() -> Duration {
        Duration::from_millis(DEBOUNCE_MS)
    }
}

/// Theme management configuration
pub mod themes {
    /// Name of the user themes subdirectory
    #[allow(dead_code)]
    pub const USER_THEMES_DIR: &str = "themes";

    /// Default theme ID
    #[allow(dead_code)]
    pub const DEFAULT_THEME: &str = "light";

    /// Theme configuration file name
    #[allow(dead_code)]
    pub const THEME_CONFIG_FILE: &str = "theme.json";
}

/// Logging configuration
pub mod logging {
    /// Default log level
    pub const DEFAULT_LEVEL: &str = "info";

    /// Whether to include thread IDs in logs
    pub const LOG_THREAD_IDS: bool = true;

    /// Whether to include file locations in logs
    pub const LOG_FILE_LOCATIONS: bool = true;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_search_limits_reasonable() {
        assert!(search::MAX_RESULTS > 0);
        assert!(search::MAX_RESULTS <= 1000);
        assert!(search::MAX_DEPTH > 0);
        assert!(search::MAX_DEPTH <= 20);
    }

    #[test]
    fn test_recent_items_limits() {
        assert!(recent_items::DEFAULT_LIMIT > 0);
        assert!(recent_items::DEFAULT_LIMIT <= recent_items::MAX_LIMIT);
    }

    #[test]
    fn test_debounce_duration() {
        let duration = file_watcher::debounce_duration();
        assert!(duration.as_millis() > 0);
        assert!(duration.as_millis() < 5000);
    }
}
