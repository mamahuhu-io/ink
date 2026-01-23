//! I18n commands

use crate::domain::i18n::I18nManager;
use std::sync::Arc;
use tauri::AppHandle;

/// Set the current language for menus
#[tauri::command]
pub fn set_language(
    app: AppHandle,
    i18n_manager: tauri::State<'_, Arc<I18nManager>>,
    language: String,
) -> Result<(), String> {
    i18n_manager.set_language(&language);
    // Rebuild menu with new language
    crate::domain::menu::rebuild_menu(&app).map_err(|e| e.to_string())
}

/// Get the current language
#[tauri::command]
pub fn get_language(
    i18n_manager: tauri::State<'_, Arc<I18nManager>>,
) -> String {
    i18n_manager.get_language()
}
