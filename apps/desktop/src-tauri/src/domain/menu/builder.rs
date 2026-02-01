use std::sync::Arc;
use tauri::{
    menu::{CheckMenuItem, Menu, MenuItem, MenuItemBuilder, PredefinedMenuItem, Submenu},
    Manager,
};

use crate::domain::i18n::I18nManager;
use crate::domain::recent::items::RecentItems;
use crate::domain::recent::manager::RecentItemsManager;
use crate::domain::themes::ThemeManager;

/// Find a CheckMenuItem by ID in the menu (searches all submenus)
fn find_check_menu_item(
    app: &tauri::AppHandle,
    item_id: &str,
) -> Option<CheckMenuItem<tauri::Wry>> {
    let menu = app.menu()?;
    let items = menu.items().ok()?;

    for item in items {
        if let Some(submenu) = item.as_submenu() {
            if let Ok(submenu_items) = submenu.items() {
                for submenu_item in submenu_items {
                    if let Some(check_item) = submenu_item.as_check_menuitem() {
                        if check_item.id().0.as_str() == item_id {
                            return Some(check_item.clone());
                        }
                    }
                }
            }
        }
    }
    None
}

/// Find all CheckMenuItems with ID matching a prefix (searches all submenus)
fn find_check_menu_items_by_prefix(
    app: &tauri::AppHandle,
    prefix: &str,
) -> Vec<CheckMenuItem<tauri::Wry>> {
    let mut results = Vec::new();

    let Some(menu) = app.menu() else {
        return results;
    };
    let Ok(items) = menu.items() else {
        return results;
    };

    for item in items {
        if let Some(submenu) = item.as_submenu() {
            if let Ok(submenu_items) = submenu.items() {
                for submenu_item in submenu_items {
                    if let Some(check_item) = submenu_item.as_check_menuitem() {
                        if check_item.id().0.as_str().starts_with(prefix) {
                            results.push(check_item.clone());
                        }
                    }
                }
            }
            // If we found items with this prefix, no need to search other submenus
            // if !results.is_empty() {
            //     return results;
            // }
        }
    }
    results
}

/// Build the Open Recent submenu
fn build_open_recent_submenu(
    handle: &tauri::AppHandle,
    i18n: &I18nManager,
) -> Result<Submenu<tauri::Wry>, Box<dyn std::error::Error>> {
    // Get recent items from cache
    let recent_items = if let Some(manager) = handle.try_state::<Arc<RecentItemsManager>>() {
        manager.get_items()
    } else {
        RecentItems::new()
    };

    if recent_items.is_empty() {
        // Show disabled "No Recent Items" if empty
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

    // Create all menu items first
    let mut all_items: Vec<Box<dyn tauri::menu::IsMenuItem<tauri::Wry>>> = Vec::new();

    // Add files first
    for (index, file_path) in recent_items.files.iter().enumerate() {
        let file_name = std::path::Path::new(file_path)
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or(file_path);

        let menu_id = format!("recent-file-{}", index);
        let item = MenuItemBuilder::with_id(&menu_id, file_name).build(handle)?;
        all_items.push(Box::new(item));
    }

    // Add separator between files and folders if both exist
    if !recent_items.files.is_empty() && !recent_items.folders.is_empty() {
        let sep = PredefinedMenuItem::separator(handle)?;
        all_items.push(Box::new(sep));
    }

    // Add folder items
    for (index, folder_path) in recent_items.folders.iter().enumerate() {
        let folder_name = std::path::Path::new(folder_path)
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or(folder_path);

        let menu_id = format!("recent-folder-{}", index);
        // Add folder icon prefix to distinguish from files
        let display_name = format!("📁 {}", folder_name);
        let item = MenuItemBuilder::with_id(&menu_id, &display_name).build(handle)?;
        all_items.push(Box::new(item));
    }

    // Add separator before Clear
    let sep2 = PredefinedMenuItem::separator(handle)?;
    all_items.push(Box::new(sep2));

    // Add Clear Recent Items
    let clear_item = MenuItemBuilder::with_id("clear-recent", &i18n.t("menu.file.clear_recent"))
        .build(handle)?;
    all_items.push(Box::new(clear_item));

    // Build references vector
    let refs: Vec<&dyn tauri::menu::IsMenuItem<tauri::Wry>> =
        all_items.iter().map(|item| item.as_ref()).collect();

    Ok(Submenu::with_items(
        handle,
        &i18n.t("menu.file.open_recent"),
        true,
        &refs,
    )?)
}

/// Build the Themes submenu
fn build_themes_submenu(
    handle: &tauri::AppHandle,
    i18n: &I18nManager,
) -> Result<Submenu<tauri::Wry>, Box<dyn std::error::Error>> {
    // Get theme manager from state
    let theme_manager = handle.try_state::<Arc<ThemeManager>>();

    let (themes, current_theme) = match &theme_manager {
        Some(tm) => (tm.get_themes(), tm.get_current_theme()),
        None => (Vec::new(), "light".to_string()),
    };

    // Create menu items
    let mut all_items: Vec<Box<dyn tauri::menu::IsMenuItem<tauri::Wry>>> = Vec::new();

    // Add theme items as CheckMenuItems
    for theme in &themes {
        let menu_id = format!("theme-{}", theme.id);
        let is_current = theme.id == current_theme;

        let item = CheckMenuItem::with_id(
            handle,
            &menu_id,
            &theme.name,
            true,
            is_current,
            None::<&str>,
        )?;
        all_items.push(Box::new(item));
    }

    // Add separator
    let sep = PredefinedMenuItem::separator(handle)?;
    all_items.push(Box::new(sep));

    // Add "Open Themes Folder..." item
    let open_folder_item = MenuItem::with_id(
        handle,
        "themes-open-folder",
        &i18n.t("menu.themes.open_folder"),
        true,
        None::<&str>,
    )?;
    all_items.push(Box::new(open_folder_item));

    // Add "Refresh" item
    let refresh_item = MenuItem::with_id(
        handle,
        "themes-refresh",
        &i18n.t("menu.themes.refresh"),
        true,
        None::<&str>,
    )?;
    all_items.push(Box::new(refresh_item));

    // Build references vector
    let refs: Vec<&dyn tauri::menu::IsMenuItem<tauri::Wry>> =
        all_items.iter().map(|item| item.as_ref()).collect();

    Ok(Submenu::with_items(
        handle,
        &i18n.t("menu.themes"),
        true,
        &refs,
    )?)
}

/// Rebuild the entire menu including window list and recent items
pub fn rebuild_menu(app: &tauri::AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let _span = tracing::info_span!("rebuild_menu").entered();
    let handle = app;

    // Get i18n manager
    let i18n_manager = handle
        .try_state::<Arc<I18nManager>>()
        .ok_or("I18nManager not initialized")?;
    let i18n = i18n_manager.as_ref();

    // Build Open Recent submenu
    let open_recent_submenu = build_open_recent_submenu(handle, i18n)?;

    // Build Themes submenu
    let themes_submenu = build_themes_submenu(handle, i18n)?;

    // File menu with Open Recent
    let new_window_item = MenuItem::with_id(
        handle,
        "new_window",
        &i18n.t("menu.file.new_window"),
        true,
        Some("CmdOrCtrl+N"),
    )?;
    let new_tab_item = MenuItem::with_id(
        handle,
        "new_tab",
        &i18n.t("menu.file.new_tab"),
        true,
        Some("CmdOrCtrl+T"),
    )?;
    let open_item = MenuItem::with_id(
        handle,
        "open",
        &i18n.t("menu.file.open"),
        true,
        Some("CmdOrCtrl+O"),
    )?;
    let sep1 = PredefinedMenuItem::separator(handle)?;
    let save_item = MenuItem::with_id(
        handle,
        "save",
        &i18n.t("menu.file.save"),
        true,
        Some("CmdOrCtrl+S"),
    )?;
    let save_as_item = MenuItem::with_id(
        handle,
        "save_as",
        &i18n.t("menu.file.save_as"),
        true,
        Some("CmdOrCtrl+Shift+S"),
    )?;
    let sep2 = PredefinedMenuItem::separator(handle)?;
    let import_item = MenuItem::with_id(
        handle,
        "import",
        &i18n.t("menu.file.import"),
        true,
        None::<&str>,
    )?;
    // Export submenu
    let export_html_item = MenuItem::with_id(
        handle,
        "export_html",
        &i18n.t("menu.file.export.html"),
        true,
        None::<&str>,
    )?;
    let export_pdf_item = MenuItem::with_id(
        handle,
        "export_pdf",
        &i18n.t("menu.file.export.pdf"),
        true,
        None::<&str>,
    )?;
    let export_docx_item = MenuItem::with_id(
        handle,
        "export_docx",
        &i18n.t("menu.file.export.docx"),
        true,
        None::<&str>,
    )?;
    let export_image_item = MenuItem::with_id(
        handle,
        "export_image",
        &i18n.t("menu.file.export.image"),
        true,
        None::<&str>,
    )?;
    let export_submenu = Submenu::with_items(
        handle,
        &i18n.t("menu.file.export"),
        true,
        &[
            &export_html_item,
            &export_pdf_item,
            &export_docx_item,
            &export_image_item,
        ],
    )?;
    let sep3 = PredefinedMenuItem::separator(handle)?;
    let close_tab_item = MenuItem::with_id(
        handle,
        "close_tab",
        &i18n.t("menu.file.close_tab"),
        true,
        Some("CmdOrCtrl+W"),
    )?;

    #[cfg(not(target_os = "macos"))]
    let sep4 = PredefinedMenuItem::separator(handle)?;
    #[cfg(not(target_os = "macos"))]
    let quit_item = MenuItem::with_id(
        handle,
        "quit",
        &i18n.t("menu.file.quit"),
        true,
        Some("CmdOrCtrl+Q"),
    )?;

    #[cfg(target_os = "macos")]
    let file_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.file"),
        true,
        &[
            &new_window_item,
            &new_tab_item,
            &open_item,
            &open_recent_submenu,
            &sep1,
            &save_item,
            &save_as_item,
            &sep2,
            &import_item,
            &export_submenu,
            &sep3,
            &close_tab_item,
        ],
    )?;

    #[cfg(not(target_os = "macos"))]
    let file_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.file"),
        true,
        &[
            &new_window_item,
            &new_tab_item,
            &open_item,
            &open_recent_submenu,
            &sep1,
            &save_item,
            &save_as_item,
            &sep2,
            &import_item,
            &export_submenu,
            &sep3,
            &close_tab_item,
            &sep4,
            &quit_item,
        ],
    )?;

    // Edit menu
    // Undo/Redo shortcuts are handled by Tauri menu (Ink's handling is disabled)
    #[cfg(target_os = "macos")]
    let edit_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.edit"),
        true,
        &[
            &MenuItem::with_id(
                handle,
                "undo",
                &i18n.t("menu.edit.undo"),
                true,
                Some("CmdOrCtrl+Z"),
            )?,
            &MenuItem::with_id(
                handle,
                "redo",
                &i18n.t("menu.edit.redo"),
                true,
                Some("CmdOrCtrl+Shift+Z"),
            )?,
            &PredefinedMenuItem::separator(handle)?,
            &PredefinedMenuItem::cut(handle, Some(&i18n.t("menu.edit.cut")))?,
            &PredefinedMenuItem::copy(handle, Some(&i18n.t("menu.edit.copy")))?,
            &PredefinedMenuItem::paste(handle, Some(&i18n.t("menu.edit.paste")))?,
            &PredefinedMenuItem::select_all(handle, Some(&i18n.t("menu.edit.select_all")))?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItem::with_id(
                handle,
                "find",
                &i18n.t("menu.edit.find"),
                true,
                Some("CmdOrCtrl+F"),
            )?,
            &MenuItem::with_id(
                handle,
                "find_replace",
                &i18n.t("menu.edit.find_replace"),
                true,
                Some("CmdOrCtrl+H"),
            )?,
            &MenuItem::with_id(
                handle,
                "global_search",
                &i18n.t("menu.edit.search_files"),
                true,
                Some("CmdOrCtrl+K"),
            )?,
        ],
    )?;

    #[cfg(not(target_os = "macos"))]
    let edit_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.edit"),
        true,
        &[
            &MenuItem::with_id(
                handle,
                "undo",
                &i18n.t("menu.edit.undo"),
                true,
                Some("CmdOrCtrl+Z"),
            )?,
            &MenuItem::with_id(
                handle,
                "redo",
                &i18n.t("menu.edit.redo"),
                true,
                Some("CmdOrCtrl+Shift+Z"),
            )?,
            &PredefinedMenuItem::separator(handle)?,
            &PredefinedMenuItem::cut(handle, Some(&i18n.t("menu.edit.cut")))?,
            &PredefinedMenuItem::copy(handle, Some(&i18n.t("menu.edit.copy")))?,
            &PredefinedMenuItem::paste(handle, Some(&i18n.t("menu.edit.paste")))?,
            &PredefinedMenuItem::select_all(handle, Some(&i18n.t("menu.edit.select_all")))?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItem::with_id(
                handle,
                "find",
                &i18n.t("menu.edit.find"),
                true,
                Some("CmdOrCtrl+F"),
            )?,
            &MenuItem::with_id(
                handle,
                "find_replace",
                &i18n.t("menu.edit.find_replace"),
                true,
                Some("CmdOrCtrl+H"),
            )?,
            &MenuItem::with_id(
                handle,
                "global_search",
                &i18n.t("menu.edit.search_files"),
                true,
                Some("CmdOrCtrl+K"),
            )?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItem::with_id(
                handle,
                "preferences",
                &i18n.t("menu.edit.preferences"),
                true,
                Some("CmdOrCtrl+,"),
            )?,
        ],
    )?;

    // View menu
    // Get sidebar visibility state
    let sidebar_visible = handle
        .try_state::<crate::app::state::SidebarState>()
        .and_then(|state| state.0.lock().ok().map(|s| *s))
        .unwrap_or(true); // Default to visible if state not available

    let toggle_sidebar_item = CheckMenuItem::with_id(
        handle,
        "toggle_sidebar",
        &i18n.t("menu.view.toggle_sidebar"),
        true,
        sidebar_visible, // Use stored state instead of hardcoded true
        Some("CmdOrCtrl+\\"),
    )?;

    let toggle_source_item = CheckMenuItem::with_id(
        handle,
        "toggle_source_mode",
        &i18n.t("menu.view.toggle_source"),
        true,
        false, // Default to unchecked (preview mode)
        Some("CmdOrCtrl+/"),
    )?;

    let view_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.view"),
        true,
        &[
            &toggle_sidebar_item,
            &toggle_source_item,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItem::with_id(
                handle,
                "zoom_in",
                &i18n.t("menu.view.zoom_in"),
                true,
                Some("CmdOrCtrl+="),
            )?,
            &MenuItem::with_id(
                handle,
                "zoom_out",
                &i18n.t("menu.view.zoom_out"),
                true,
                Some("CmdOrCtrl+-"),
            )?,
            &MenuItem::with_id(
                handle,
                "zoom_reset",
                &i18n.t("menu.view.actual_size"),
                true,
                Some("CmdOrCtrl+0"),
            )?,
            &PredefinedMenuItem::separator(handle)?,
            &PredefinedMenuItem::fullscreen(handle, Some(&i18n.t("menu.view.fullscreen")))?,
            #[cfg(debug_assertions)]
            &MenuItem::with_id(
                handle,
                "dev_force_reload",
                "Force Reload",
                true,
                Some("CmdOrCtrl+Shift+R"),
            )?,
            #[cfg(debug_assertions)]
            &MenuItem::with_id(
                handle,
                "dev_open_devtools",
                "Open Devtools",
                true,
                Some("CmdOrCtrl+Alt+I"),
            )?,
        ],
    )?;

    // Window menu with dynamic window list (macOS only)
    #[cfg(target_os = "macos")]
    let window_menu = {
        // Get all windows and filter out invalid ones
        let windows_map = handle.webview_windows();

        // Filter to only include valid, visible windows
        let windows: Vec<_> = windows_map
            .values()
            .filter(|window| {
                // Check if window is actually valid by trying to get its visibility
                match window.is_visible() {
                    Ok(_) => true, // Window is valid
                    Err(_) => {
                        // Window handle is invalid, skip it
                        #[cfg(debug_assertions)]
                        eprintln!("[Menu] Skipping invalid window: {}", window.label());
                        false
                    }
                }
            })
            .collect();

        // Base window menu items
        let minimize_item =
            PredefinedMenuItem::minimize(handle, Some(&i18n.t("menu.window.minimize")))?;
        let maximize_item =
            PredefinedMenuItem::maximize(handle, Some(&i18n.t("menu.window.zoom")))?;
        let separator1 = PredefinedMenuItem::separator(handle)?;

        // Store dynamic window menu items
        let mut dynamic_separators: Vec<PredefinedMenuItem<tauri::Wry>> = Vec::new();
        let mut dynamic_window_items: Vec<CheckMenuItem<tauri::Wry>> = Vec::new();

        let mut window_menu_items: Vec<&dyn tauri::menu::IsMenuItem<tauri::Wry>> =
            vec![&minimize_item, &maximize_item, &separator1];

        // Add window list if there are valid windows
        if !windows.is_empty() {
            let separator2 = PredefinedMenuItem::separator(handle)?;
            dynamic_separators.push(separator2);

            // Check if any window is focused, if not and there's only one window, select it
            let any_focused = windows.iter().any(|w| w.is_focused().unwrap_or(false));
            let single_window = windows.len() == 1;

            // Create menu items for each valid window
            for (index, window) in windows.iter().enumerate() {
                let label = window.label().to_string();
                let title = window.title().unwrap_or_else(|_| label.clone());
                let menu_id = format!("window-{}", label);

                // Set checked state: if window is focused, or if it's the only window
                let is_focused = window.is_focused().unwrap_or(false);
                let should_check =
                    is_focused || (single_window && !any_focused) || (!any_focused && index == 0);

                let window_item = CheckMenuItem::with_id(
                    handle,
                    &menu_id,
                    &title,
                    true,
                    should_check,
                    None::<&str>,
                )?;
                dynamic_window_items.push(window_item);
            }

            // Add references to menu items list
            window_menu_items.push(dynamic_separators.last().unwrap());
            for item in &dynamic_window_items {
                window_menu_items.push(item);
            }
        }

        Submenu::with_items(handle, &i18n.t("menu.window"), true, &window_menu_items)?
    };

    // Help menu
    let website_item = MenuItem::with_id(
        handle,
        "website",
        &i18n.t("menu.help.website"),
        true,
        None::<&str>,
    )?;
    let about_item = MenuItem::with_id(
        handle,
        "about",
        &i18n.t("menu.help.about"),
        true,
        None::<&str>,
    )?;
    let help_menu = Submenu::with_items(
        handle,
        &i18n.t("menu.help"),
        true,
        &[&website_item, &about_item],
    )?;

    // Build the menu
    #[cfg(target_os = "macos")]
    let menu = {
        let app_menu = Submenu::with_items(
            handle,
            "Ink",
            true,
            &[
                // Use custom about item to open settings
                &MenuItem::with_id(handle, "about", &i18n.t("app.about"), true, None::<&str>)?,
                &PredefinedMenuItem::separator(handle)?,
                &MenuItem::with_id(
                    handle,
                    "preferences",
                    &i18n.t("app.preferences"),
                    true,
                    Some("CmdOrCtrl+,"),
                )?,
                &PredefinedMenuItem::separator(handle)?,
                &PredefinedMenuItem::services(handle, Some(&i18n.t("app.services")))?,
                &PredefinedMenuItem::separator(handle)?,
                &PredefinedMenuItem::hide(handle, Some(&i18n.t("app.hide")))?,
                &PredefinedMenuItem::hide_others(handle, Some(&i18n.t("app.hide_others")))?,
                &PredefinedMenuItem::show_all(handle, Some(&i18n.t("app.show_all")))?,
                &PredefinedMenuItem::separator(handle)?,
                // Use custom quit item to allow checking for unsaved changes
                &MenuItem::with_id(
                    handle,
                    "quit",
                    &i18n.t("app.quit"),
                    true,
                    Some("CmdOrCtrl+Q"),
                )?,
            ],
        )?;

        Menu::with_items(
            handle,
            &[
                &app_menu,
                &file_menu,
                &edit_menu,
                &view_menu,
                &themes_submenu,
                &window_menu,
                &help_menu,
            ],
        )?
    };

    #[cfg(not(target_os = "macos"))]
    let menu = Menu::with_items(
        handle,
        &[
            &file_menu,
            &edit_menu,
            &view_menu,
            &themes_submenu,
            &help_menu,
        ],
    )?;

    app.set_menu(menu)?;
    Ok(())
}

/// Handle menu events
#[allow(dead_code)]
pub fn handle_menu_event(app: &tauri::AppHandle, event_id: &str) {
    use tauri::Emitter;

    // Get the focused window and emit events to it specifically
    // This prevents events from being sent to all windows
    let get_focused_window = || {
        // Try to find a focused window
        for (_label, window) in app.webview_windows() {
            if window.is_focused().unwrap_or(false) {
                return Some(window);
            }
        }
        // Fallback to "main" window if no focused window found
        app.get_webview_window("main").or_else(|| {
            // Or any window starting with "main-"
            app.webview_windows()
                .into_iter()
                .find(|(label, _)| label.starts_with("main"))
                .map(|(_, window)| window)
        })
    };

    let emit_event = |event: &str| {
        if let Some(window) = get_focused_window() {
            let _ = window.emit("menu-event", event);
        }
    };

    // Emit event with payload to focused window
    let emit_event_with_payload = |event: &str, payload: &str| {
        if let Some(window) = get_focused_window() {
            let _ = window.emit(event, payload);
        }
    };

    match event_id {
        "new_window" => emit_event("new_window"),
        "new_tab" => emit_event("new_tab"),
        "open" => emit_event("open"),
        "save" => emit_event("save"),
        "save_as" => emit_event("save_as"),
        "close_tab" => emit_event("close_tab"),
        "export_html" => emit_event("export_html"),
        "export_pdf" => emit_event("export_pdf"),
        "export_docx" => emit_event("export_docx"),
        "export_image" => emit_event("export_image"),
        "import" => emit_event("import"),
        "preferences" => emit_event("preferences"),
        "toggle_sidebar" => {
            // Update stored state when menu is toggled (CheckMenuItem auto-toggles)
            if let Some(check_item) = find_check_menu_item(app, "toggle_sidebar") {
                let is_checked = check_item.is_checked().unwrap_or(true);
                if let Some(state) = app.try_state::<crate::app::state::SidebarState>() {
                    if let Ok(mut s) = state.0.lock() {
                        *s = is_checked;
                    }
                }
            }
            emit_event("toggle_sidebar")
        }
        "toggle_source_mode" => emit_event("toggle_source_mode"),
        "zoom_in" => emit_event("zoom_in"),
        "zoom_out" => emit_event("zoom_out"),
        "zoom_reset" => emit_event("zoom_reset"),
        "dev_force_reload" => {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.eval("location.reload(true)");
            }
        }
        "dev_open_devtools" => {
            #[cfg(debug_assertions)]
            {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.open_devtools();
                }
            }
        }
        "about" => emit_event("about"),
        "website" => {
            // Open website in default browser
            use tauri_plugin_shell::ShellExt;
            #[allow(deprecated)]
            let _ = app.shell().open("https://ink.mamahuhu.io", None);
        }
        "global_search" => emit_event("global_search"),
        "find" => emit_event("find"),
        "find_replace" => emit_event("find_replace"),
        "undo" => emit_event("undo"),
        "redo" => emit_event("redo"),
        "quit" => {
            // Emit quit request event to let frontend check for unsaved changes
            #[cfg(debug_assertions)]
            eprintln!("[Menu] Quit menu item clicked, emitting app-quit-requested");
            if let Err(e) = app.emit("app-quit-requested", ()) {
                #[cfg(debug_assertions)]
                eprintln!("[Menu] Failed to emit app-quit-requested: {}", e);
                // Fallback to direct exit if emit fails
                let _ = e;
                app.exit(0);
            }
        }
        "clear-recent" => {
            // Clear recent items using manager
            if let Some(manager) = app.try_state::<Arc<RecentItemsManager>>() {
                manager.clear();
                if let Err(e) = manager.save() {
                    #[cfg(debug_assertions)]
                    eprintln!("Failed to save recent items: {}", e);
                    let _ = e;
                }
            }
            // Rebuild menu to reflect changes
            if let Err(e) = rebuild_menu(app) {
                #[cfg(debug_assertions)]
                eprintln!("Failed to rebuild menu: {}", e);
                let _ = e;
            }
        }
        id if id.starts_with("recent-file-") => {
            // Handle recent file click
            let index_str = id.strip_prefix("recent-file-").unwrap_or("");
            if let Ok(index) = index_str.parse::<usize>() {
                if let Some(manager) = app.try_state::<Arc<RecentItemsManager>>() {
                    let recent_items = manager.get_items();
                    if index < recent_items.files.len() {
                        let file_path = recent_items.files[index].clone();
                        emit_event_with_payload("open-recent-file", &file_path);
                    }
                }
            }
        }
        id if id.starts_with("recent-folder-") => {
            // Handle recent folder click
            let index_str = id.strip_prefix("recent-folder-").unwrap_or("");
            if let Ok(index) = index_str.parse::<usize>() {
                if let Some(manager) = app.try_state::<Arc<RecentItemsManager>>() {
                    let recent_items = manager.get_items();
                    if index < recent_items.folders.len() {
                        let folder_path = recent_items.folders[index].clone();
                        emit_event_with_payload("open-recent-folder", &folder_path);
                    }
                }
            }
        }
        id if id.starts_with("window-") => {
            // Handle window switching
            let window_label = id.strip_prefix("window-").unwrap_or("");
            if let Some(window) = app.get_webview_window(window_label) {
                if let Err(e) = window.set_focus() {
                    #[cfg(debug_assertions)]
                    eprintln!("Failed to focus window {}: {}", window_label, e);
                    let _ = e;
                }
                // Explicitly update check state to override native toggle behavior
                update_window_check_state(app, window_label);
            } else {
                // Window not found, update menu
                #[cfg(debug_assertions)]
                eprintln!("Window {} not found, updating menu", window_label);
                if let Err(e) = rebuild_menu(app) {
                    #[cfg(debug_assertions)]
                    eprintln!("Failed to rebuild menu: {}", e);
                    let _ = e;
                }
            }
        }
        id if id.starts_with("theme-") => {
            // Handle theme switching
            let theme_id = id.strip_prefix("theme-").unwrap_or("");
            if !theme_id.is_empty() {
                // Get theme manager and set theme
                if let Some(theme_manager) = app.try_state::<Arc<ThemeManager>>() {
                    if let Err(e) = theme_manager.set_current_theme(theme_id) {
                        #[cfg(debug_assertions)]
                        eprintln!("Failed to set theme: {}", e);
                        let _ = e;
                    } else {
                        // Update menu checkmarks
                        update_theme_check_state(app, theme_id);
                        // Notify frontend
                        emit_event_with_payload("theme-changed", theme_id);
                    }
                }
            }
        }
        "themes-open-folder" => {
            // Open user themes directory
            if let Some(theme_manager) = app.try_state::<Arc<ThemeManager>>() {
                let dir = theme_manager.get_user_themes_dir();
                #[cfg(target_os = "macos")]
                {
                    let _ = std::process::Command::new("open").arg(&dir).spawn();
                }
                #[cfg(target_os = "windows")]
                {
                    let _ = std::process::Command::new("explorer").arg(&dir).spawn();
                }
                #[cfg(target_os = "linux")]
                {
                    let _ = std::process::Command::new("xdg-open").arg(&dir).spawn();
                }
            }
        }
        "themes-refresh" => {
            // Refresh themes and rebuild menu
            if let Some(theme_manager) = app.try_state::<Arc<ThemeManager>>() {
                theme_manager.refresh();
                if let Err(e) = rebuild_menu(app) {
                    #[cfg(debug_assertions)]
                    eprintln!("Failed to rebuild menu after theme refresh: {}", e);
                    let _ = e;
                }
                // Notify frontend to reload themes (emit directly, not via menu-event)
                let _ = app.emit("themes-refreshed", ());
            }
        }
        _ => {}
    }
}

/// Update the sidebar menu check state
pub fn update_sidebar_check_state(app: &tauri::AppHandle, is_visible: bool) {
    if let Some(check_item) = find_check_menu_item(app, "toggle_sidebar") {
        let _ = check_item.set_checked(is_visible);
    }
}

/// Update theme menu check states
pub fn update_theme_check_state(app: &tauri::AppHandle, selected_theme_id: &str) {
    for check_item in find_check_menu_items_by_prefix(app, "theme-") {
        let item_id = check_item.id().0.as_str();
        let theme_id = item_id.strip_prefix("theme-").unwrap_or("");
        let _ = check_item.set_checked(theme_id == selected_theme_id);
    }
}

/// Update window menu check states
pub fn update_window_check_state(app: &tauri::AppHandle, focused_label: &str) {
    for check_item in find_check_menu_items_by_prefix(app, "window-") {
        let item_id = check_item.id().0.as_str();
        let window_label = item_id.strip_prefix("window-").unwrap_or("");
        let _ = check_item.set_checked(window_label == focused_label);
    }
}
