use serde::{Deserialize, Serialize};

/// Recent items (files and folders)
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct RecentItems {
    pub files: Vec<String>,
    pub folders: Vec<String>,
}

impl RecentItems {
    pub fn new() -> Self {
        RecentItems {
            files: Vec::new(),
            folders: Vec::new(),
        }
    }

    /// Add a file to recent list (moves to front if exists)
    pub fn add_file(&mut self, file_path: String, limit: usize) {
        // Remove if exists
        self.files.retain(|f| f != &file_path);
        // Add to front
        self.files.insert(0, file_path);
        // Limit to specified number of files
        if self.files.len() > limit {
            self.files.truncate(limit);
        }
    }

    /// Add a folder to recent list (moves to front if exists)
    pub fn add_folder(&mut self, folder_path: String, limit: usize) {
        // Remove if exists
        self.folders.retain(|f| f != &folder_path);
        // Add to front
        self.folders.insert(0, folder_path);
        // Limit to specified number of folders
        if self.folders.len() > limit {
            self.folders.truncate(limit);
        }
    }

    /// Clear all recent items
    pub fn clear(&mut self) {
        self.files.clear();
        self.folders.clear();
    }

    /// Check if empty
    pub fn is_empty(&self) -> bool {
        self.files.is_empty() && self.folders.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_file_to_empty_list() {
        let mut items = RecentItems::new();
        items.add_file("/path/to/file1.md".to_string(), 10);

        assert_eq!(items.files.len(), 1);
        assert_eq!(items.files[0], "/path/to/file1.md");
    }

    #[test]
    fn test_add_file_moves_to_front() {
        let mut items = RecentItems::new();
        items.add_file("/path/to/file1.md".to_string(), 10);
        items.add_file("/path/to/file2.md".to_string(), 10);
        items.add_file("/path/to/file1.md".to_string(), 10);

        assert_eq!(items.files.len(), 2);
        assert_eq!(items.files[0], "/path/to/file1.md");
        assert_eq!(items.files[1], "/path/to/file2.md");
    }

    #[test]
    fn test_add_file_respects_limit() {
        let mut items = RecentItems::new();
        for i in 0..15 {
            items.add_file(format!("/path/to/file{}.md", i), 10);
        }

        assert_eq!(items.files.len(), 10);
        assert_eq!(items.files[0], "/path/to/file14.md");
        assert_eq!(items.files[9], "/path/to/file5.md");
    }

    #[test]
    fn test_add_folder() {
        let mut items = RecentItems::new();
        items.add_folder("/path/to/folder1".to_string(), 10);
        items.add_folder("/path/to/folder2".to_string(), 10);

        assert_eq!(items.folders.len(), 2);
        assert_eq!(items.folders[0], "/path/to/folder2");
    }

    #[test]
    fn test_clear() {
        let mut items = RecentItems::new();
        items.add_file("/path/to/file.md".to_string(), 10);
        items.add_folder("/path/to/folder".to_string(), 10);

        assert!(!items.is_empty());

        items.clear();

        assert!(items.is_empty());
        assert_eq!(items.files.len(), 0);
        assert_eq!(items.folders.len(), 0);
    }

    #[test]
    fn test_is_empty() {
        let items = RecentItems::new();
        assert!(items.is_empty());

        let mut items2 = RecentItems::new();
        items2.add_file("/test.md".to_string(), 10);
        assert!(!items2.is_empty());
    }

    #[test]
    fn test_serialization() {
        let mut items = RecentItems::new();
        items.add_file("/file1.md".to_string(), 10);
        items.add_folder("/folder1".to_string(), 10);

        let json = serde_json::to_string(&items).unwrap();
        let deserialized: RecentItems = serde_json::from_str(&json).unwrap();

        assert_eq!(items.files, deserialized.files);
        assert_eq!(items.folders, deserialized.folders);
    }
}
