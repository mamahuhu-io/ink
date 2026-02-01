use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;
use tauri::window::Color;

/// Default background color for dark themes (#141414)
pub const DARK_BACKGROUND_COLOR: Color = Color(20, 20, 20, 255);
/// Default background color for light themes (#ffffff)
pub const LIGHT_BACKGROUND_COLOR: Color = Color(255, 255, 255, 255);

/// Theme information
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ThemeInfo {
    /// Theme identifier (filename without extension)
    pub id: String,
    /// Display name (derived from filename)
    pub name: String,
    /// Whether this is a built-in theme
    pub is_builtin: bool,
    /// Full path to the CSS file
    pub path: String,
}

/// Theme configuration stored in app data
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct ThemeConfig {
    /// Currently selected theme ID
    pub current_theme: String,
}

/// Theme manager state
pub struct ThemeManager {
    /// Cached theme list
    themes: Mutex<Vec<ThemeInfo>>,
    /// Built-in themes directory
    builtin_dir: PathBuf,
    /// User themes directory
    user_dir: PathBuf,
    /// Config file path
    config_path: PathBuf,
}

impl ThemeManager {
    /// Create a new theme manager
    pub fn new(app: &tauri::AppHandle) -> Result<Self, Box<dyn std::error::Error>> {
        // Get resource directory for built-in themes
        let resource_dir = app.path().resource_dir()?;
        let mut builtin_dir = resource_dir.join("themes");

        let bundled_count = if builtin_dir.exists() {
            fs::read_dir(&builtin_dir).map(|d| d.count()).unwrap_or(0)
        } else {
            0
        };

        // In development mode, prefer source directory if it has more themes
        // This handles the case where new themes are added but not yet copied to target
        let current_dir = std::env::current_dir().ok();
        let possible_paths = [
            // When running from project root
            current_dir
                .as_ref()
                .map(|p| p.join("src-tauri").join("resources").join("themes")),
            // When running from src-tauri
            current_dir
                .as_ref()
                .map(|p| p.join("resources").join("themes")),
        ];

        for path in possible_paths.into_iter().flatten() {
            if path.exists() {
                let source_count = fs::read_dir(&path).map(|d| d.count()).unwrap_or(0);
                // Use source directory if it has more themes than bundled
                if source_count > bundled_count {
                    builtin_dir = path;
                    break;
                }
            }
        }

        // Get app data directory for user themes and config
        let app_data_dir = app.path().app_data_dir()?;
        fs::create_dir_all(&app_data_dir)?;

        let user_dir = app_data_dir.join("themes");
        fs::create_dir_all(&user_dir)?;

        let config_path = app_data_dir.join("theme_config.json");

        Ok(Self {
            themes: Mutex::new(Vec::new()),
            builtin_dir,
            user_dir,
            config_path,
        })
    }

    /// Scan and cache all available themes
    pub fn scan_themes(&self) -> Vec<ThemeInfo> {
        let mut themes = Vec::new();
        let mut seen_ids: HashMap<String, bool> = HashMap::new();

        // Scan built-in themes first
        if let Ok(entries) = fs::read_dir(&self.builtin_dir) {
            for entry in entries.flatten() {
                if let Some(theme) = self.parse_theme_entry(&entry, true) {
                    seen_ids.insert(theme.id.clone(), true);
                    themes.push(theme);
                }
            }
        }

        // Scan user themes (can override built-in themes)
        if let Ok(entries) = fs::read_dir(&self.user_dir) {
            for entry in entries.flatten() {
                if let Some(theme) = self.parse_theme_entry(&entry, false) {
                    // If user theme has same ID as built-in, replace it
                    if seen_ids.contains_key(&theme.id) {
                        themes.retain(|t| t.id != theme.id);
                    }
                    themes.push(theme);
                }
            }
        }

        // Sort themes: light first, then dark, then alphabetically
        themes.sort_by(|a, b| {
            let order_a = theme_sort_order(&a.id);
            let order_b = theme_sort_order(&b.id);
            order_a.cmp(&order_b).then_with(|| a.name.cmp(&b.name))
        });

        // Cache the themes
        if let Ok(mut cached) = self.themes.lock() {
            *cached = themes.clone();
        }

        themes
    }

    /// Parse a directory entry as a theme
    fn parse_theme_entry(&self, entry: &fs::DirEntry, is_builtin: bool) -> Option<ThemeInfo> {
        let path = entry.path();

        // Must be a CSS file
        if path.extension()?.to_str()? != "css" {
            return None;
        }

        let filename = path.file_stem()?.to_str()?;

        // Skip hidden files
        if filename.starts_with('.') {
            return None;
        }

        Some(ThemeInfo {
            id: filename.to_string(),
            name: format_theme_name(filename),
            is_builtin,
            path: path.to_string_lossy().to_string(),
        })
    }

    /// Get cached themes or scan if cache is empty
    pub fn get_themes(&self) -> Vec<ThemeInfo> {
        let cached = self.themes.lock().ok().and_then(|t| {
            if t.is_empty() {
                None
            } else {
                Some(t.clone())
            }
        });

        cached.unwrap_or_else(|| self.scan_themes())
    }

    /// Get a specific theme by ID
    pub fn get_theme(&self, id: &str) -> Option<ThemeInfo> {
        self.get_themes().into_iter().find(|t| t.id == id)
    }

    /// Read theme CSS content
    pub fn read_theme_css(&self, id: &str) -> Result<String, String> {
        let theme = self
            .get_theme(id)
            .ok_or_else(|| format!("Theme not found: {}", id))?;

        fs::read_to_string(&theme.path)
            .map_err(|e| format!("Failed to read theme CSS: {}", e))
    }

    /// Load theme configuration
    pub fn load_config(&self) -> ThemeConfig {
        if self.config_path.exists() {
            if let Ok(content) = fs::read_to_string(&self.config_path) {
                if let Ok(config) = serde_json::from_str(&content) {
                    return config;
                }
            }
        }

        // Default to light theme
        ThemeConfig {
            current_theme: "light".to_string(),
        }
    }

    /// Save theme configuration
    pub fn save_config(&self, config: &ThemeConfig) -> Result<(), String> {
        let content = serde_json::to_string_pretty(config)
            .map_err(|e| format!("Failed to serialize config: {}", e))?;

        fs::write(&self.config_path, content)
            .map_err(|e| format!("Failed to save config: {}", e))
    }

    /// Set current theme and save
    pub fn set_current_theme(&self, theme_id: &str) -> Result<(), String> {
        // Verify theme exists
        if self.get_theme(theme_id).is_none() {
            return Err(format!("Theme not found: {}", theme_id));
        }

        let config = ThemeConfig {
            current_theme: theme_id.to_string(),
        };

        self.save_config(&config)
    }

    /// Get current theme ID
    pub fn get_current_theme(&self) -> String {
        let config = self.load_config();

        // Verify the saved theme still exists
        if self.get_theme(&config.current_theme).is_some() {
            config.current_theme
        } else {
            // Fallback to light theme
            "light".to_string()
        }
    }

    /// Check if a theme is dark by reading its CSS and checking color-scheme
    pub fn is_dark_theme(&self, id: &str) -> bool {
        if let Ok(css) = self.read_theme_css(id) {
            css.contains("color-scheme: dark") || css.contains("color-scheme:dark")
        } else {
            // Default to dark if theme cannot be read
            true
        }
    }

    /// Get background color for a theme
    pub fn get_theme_background_color(&self, id: &str) -> Color {
        if self.is_dark_theme(id) {
            DARK_BACKGROUND_COLOR
        } else {
            LIGHT_BACKGROUND_COLOR
        }
    }

    /// Get background color for the current theme
    pub fn get_current_background_color(&self) -> Color {
        self.get_theme_background_color(&self.get_current_theme())
    }

    /// Get user themes directory path
    pub fn get_user_themes_dir(&self) -> String {
        self.user_dir.to_string_lossy().to_string()
    }

    /// Refresh themes (clear cache and rescan)
    pub fn refresh(&self) -> Vec<ThemeInfo> {
        if let Ok(mut cached) = self.themes.lock() {
            cached.clear();
        }
        self.scan_themes()
    }
}

/// Format theme filename as display name
fn format_theme_name(filename: &str) -> String {
    filename
        .split(|c| c == '-' || c == '_')
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first) => first.to_uppercase().chain(chars).collect(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

/// Get sort order for built-in themes
fn theme_sort_order(id: &str) -> u8 {
    match id {
        "light" => 0,
        "dark" => 1,
        "github-light" => 2,
        "github-dark" => 3,
        "nord" => 4,
        _ => 10, // User themes come after built-in
    }
}
