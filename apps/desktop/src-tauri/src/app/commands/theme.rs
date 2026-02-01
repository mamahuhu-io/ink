//! Theme-related commands

use crate::domain::themes::ThemeManager;
use crate::utils::open_in_explorer;
use std::sync::Arc;
use tauri::{AppHandle, Emitter};

/// Get list of available themes
#[tauri::command]
pub fn get_themes(
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
) -> Vec<crate::domain::themes::ThemeInfo> {
    theme_manager.get_themes()
}

/// Get current theme ID
#[tauri::command]
pub fn get_current_theme(
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
) -> String {
    theme_manager.get_current_theme()
}

/// Get theme CSS content
#[tauri::command]
pub fn get_theme_css(
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
    theme_id: String,
) -> Result<String, String> {
    let _span = tracing::info_span!("get_theme_css", theme_id = %theme_id).entered();
    let result = theme_manager.read_theme_css(&theme_id);
    if let Ok(ref css) = result {
        tracing::debug!("Loaded theme CSS: {} bytes", css.len());
    }
    result
}

/// Set current theme
#[tauri::command]
pub fn set_theme(
    app: AppHandle,
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
    theme_id: String,
) -> Result<(), String> {
    let _span = tracing::info_span!("set_theme", theme_id = %theme_id).entered();

    theme_manager.set_current_theme(&theme_id)?;
    tracing::info!("Theme changed successfully");

    // Update menu checkmarks
    crate::domain::menu::update_theme_check_state(&app, &theme_id);
    // Notify frontend
    let _ = app.emit("theme-changed", &theme_id);
    Ok(())
}

/// Refresh theme list
#[tauri::command]
pub fn refresh_themes(
    app: AppHandle,
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
) -> Vec<crate::domain::themes::ThemeInfo> {
    let _span = tracing::info_span!("refresh_themes").entered();

    let themes = theme_manager.refresh();
    tracing::info!("Refreshed {} themes", themes.len());

    // Rebuild menu with new themes
    let _ = crate::domain::menu::rebuild_menu(&app);
    themes
}

/// Open user themes directory
#[tauri::command]
pub fn open_themes_directory(
    theme_manager: tauri::State<'_, Arc<ThemeManager>>,
) -> Result<String, String> {
    let dir = theme_manager.get_user_themes_dir();
    open_in_explorer(&dir)?;
    Ok(dir)
}
