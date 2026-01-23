//! Menu update utilities for incremental updates
//!
//! Provides helper functions to update specific parts of the menu
//! without rebuilding the entire menu structure.

use std::sync::Arc;
use tauri::{menu::Submenu, AppHandle, Manager};

use crate::domain::i18n::I18nManager;
use crate::domain::recent::manager::RecentItemsManager;

/// Update only the recent items submenu
/// This is much faster than rebuilding the entire menu
#[allow(dead_code)]
pub fn update_recent_items_submenu(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    // Get required managers
    let i18n_manager = app
        .state::<Arc<I18nManager>>();

    // Build new recent submenu
    let new_submenu = build_recent_submenu_standalone(app, &i18n_manager)?;

    // Try to find and replace the existing submenu
    // Note: Tauri 2.x doesn't support direct submenu replacement easily
    // So we still need to rebuild the menu, but this provides a foundation
    // for future optimization when Tauri adds better menu APIs

    // For now, we'll just return Ok - the actual update still uses rebuild_menu
    // But this function is here for when Tauri supports incremental updates
    let _ = new_submenu; // Suppress unused variable warning

    Ok(())
}

/// Build recent items submenu as a standalone component
#[allow(dead_code)]
fn build_recent_submenu_standalone(
    handle: &AppHandle,
    i18n: &I18nManager,
) -> Result<Submenu<tauri::Wry>, Box<dyn std::error::Error>> {
    use tauri::menu::{MenuItemBuilder, PredefinedMenuItem};

    // Get recent items from cache
    let recent_items = if let Some(manager) = handle.try_state::<Arc<RecentItemsManager>>() {
        manager.get_items()
    } else {
        crate::domain::recent::items::RecentItems::new()
    };

    if recent_items.is_empty() {
        let empty_item = MenuItemBuilder::with_id("recent-empty", &i18n.t("menu.file.no_recent"))
            .enabled(false)
            .build(handle)?;
        return Ok(Submenu::with_items(
            handle,
            &i18n.t("menu.file.open_recent"),
            true,
            &[&empty_item],
        )?);
    }

    let mut all_items: Vec<Box<dyn tauri::menu::IsMenuItem<tauri::Wry>>> = Vec::new();

    // Add files
    for (index, file_path) in recent_items.files.iter().enumerate() {
        let file_name = std::path::Path::new(file_path)
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or(file_path);

        let menu_id = format!("recent-file-{}", index);
        let item = MenuItemBuilder::with_id(&menu_id, file_name).build(handle)?;
        all_items.push(Box::new(item));
    }

    // Add separator if both files and folders exist
    if !recent_items.files.is_empty() && !recent_items.folders.is_empty() {
        let sep = PredefinedMenuItem::separator(handle)?;
        all_items.push(Box::new(sep));
    }

    // Add folders
    for (index, folder_path) in recent_items.folders.iter().enumerate() {
        let folder_name = std::path::Path::new(folder_path)
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or(folder_path);

        let menu_id = format!("recent-folder-{}", index);
        let display_name = format!("📁 {}", folder_name);
        let item = MenuItemBuilder::with_id(&menu_id, &display_name).build(handle)?;
        all_items.push(Box::new(item));
    }

    // Add separator and clear option
    let sep2 = PredefinedMenuItem::separator(handle)?;
    all_items.push(Box::new(sep2));

    let clear_item = MenuItemBuilder::with_id("clear-recent", &i18n.t("menu.file.clear_recent"))
        .build(handle)?;
    all_items.push(Box::new(clear_item));

    let refs: Vec<&dyn tauri::menu::IsMenuItem<tauri::Wry>> =
        all_items.iter().map(|item| item.as_ref()).collect();

    Ok(Submenu::with_items(
        handle,
        &i18n.t("menu.file.open_recent"),
        true,
        &refs,
    )?)
}

/// Check if full menu rebuild is necessary
/// Returns true if incremental update is sufficient
#[allow(dead_code)]
pub fn can_use_incremental_update(change_type: MenuChangeType) -> bool {
    match change_type {
        // These changes currently require full rebuild in Tauri 2.x
        MenuChangeType::RecentItems => false, // Would be true with better Tauri APIs
        MenuChangeType::WindowList => false,
        MenuChangeType::Theme => false,
        MenuChangeType::Language => false, // Affects all menu text
        MenuChangeType::Sidebar => true,   // Just a checkbox state
    }
}

/// Types of menu changes
#[derive(Debug, Clone, Copy)]
#[allow(dead_code)]
pub enum MenuChangeType {
    RecentItems,
    WindowList,
    Theme,
    Language,
    Sidebar,
}
