use crate::core::logging;
use crate::domain::{i18n, themes};
#[cfg(not(target_os = "windows"))]
use crate::domain::menu;
use crate::domain::recent::manager as recent_items_manager;
use crate::platform::current as platform;
use tauri::{App, Manager};

// Import events module for CLI file handling on Windows/Linux
#[cfg(not(target_os = "macos"))]
use crate::app::events;

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing (unified logging)
    if cfg!(debug_assertions) {
        logging::init_tracing();
        tracing::info!("Application starting in debug mode");
    }

    // Initialize i18n manager
    let i18n_manager = std::sync::Arc::new(i18n::I18nManager::new());
    app.manage(i18n_manager);

    // Initialize theme manager
    let theme_manager = themes::ThemeManager::new(app.handle())
        .expect("Failed to initialize theme manager");
    let theme_manager = std::sync::Arc::new(theme_manager);
    app.manage(theme_manager.clone());

    // Set main window background color based on current theme to prevent flash
    if let Some(window) = app.get_webview_window("main") {
        let bg_color = theme_manager.get_current_background_color();
        let _ = window.set_background_color(Some(bg_color));
    }

    // Defer theme scanning to background thread to avoid blocking startup
    // Themes will be loaded on-demand when first accessed
    let theme_manager_clone = theme_manager.clone();
    tauri::async_runtime::spawn_blocking(move || {
        // Small delay to let window render first
        std::thread::sleep(std::time::Duration::from_millis(100));
        #[cfg(debug_assertions)]
        {
            let start = std::time::Instant::now();
            theme_manager_clone.scan_themes();
            let duration = start.elapsed();
            eprintln!("[Perf] Theme scanning completed in {:?}", duration);
        }
        #[cfg(not(debug_assertions))]
        {
            theme_manager_clone.scan_themes();
        }
    });

    // Initialize recent items manager with caching
    let recent_items_manager = recent_items_manager::RecentItemsManager::new(app.handle())
        .expect("Failed to initialize recent items manager");
    let recent_items_manager = std::sync::Arc::new(recent_items_manager);
    app.manage(recent_items_manager);

    // Configure platform-specific window settings
    platform::setup(app);

    // Defer menu building to async task to avoid blocking window display
    // This significantly improves startup time by allowing window to render first
    // Note: On Windows, we use a web-based menu instead of native menu
    #[cfg(not(target_os = "windows"))]
    {
        let app_handle = app.handle().clone();
        tauri::async_runtime::spawn(async move {
            // Small delay to let window render first
            tokio::time::sleep(tokio::time::Duration::from_millis(50)).await;

            #[cfg(debug_assertions)]
            {
                let start = std::time::Instant::now();
                if let Err(e) = menu::rebuild_menu(&app_handle) {
                    eprintln!("Failed to create initial menu: {}", e);
                }
                let duration = start.elapsed();
                eprintln!("[Perf] Menu building completed in {:?}", duration);
            }
            #[cfg(not(debug_assertions))]
            {
                let _ = menu::rebuild_menu(&app_handle);
            }
        });
    }

    // Handle CLI file arguments on Windows/Linux
    // (macOS uses RunEvent::Opened instead)
    #[cfg(not(target_os = "macos"))]
    {
        handle_cli_file_args(app);
    }

    Ok(())
}

/// Handle files passed via command line arguments (Windows/Linux only)
/// This is the equivalent of macOS's RunEvent::Opened for file associations
#[cfg(not(target_os = "macos"))]
fn handle_cli_file_args(app: &App) {
    use std::path::Path;

    // Get command line arguments, skip the first one (program path)
    let args: Vec<String> = std::env::args().skip(1).collect();

    if args.is_empty() {
        return;
    }

    // Filter to only include valid file paths (not flags or other arguments)
    let file_paths: Vec<String> = args
        .into_iter()
        .filter(|arg| {
            // Skip arguments that look like flags
            if arg.starts_with('-') {
                return false;
            }
            // Check if it's a valid file path
            let path = Path::new(arg);
            path.exists() && path.is_file()
        })
        .collect();

    if !file_paths.is_empty() {
        #[cfg(debug_assertions)]
        eprintln!("[CLI] Opening files from command line: {:?}", file_paths);

        // Use the cross-platform handler
        events::handle_opened_paths(app.handle(), file_paths);
    }
}
