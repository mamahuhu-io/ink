//! Ink - A modern Markdown editor built with Tauri
//!
//! This is the main library entry point for the Tauri application.
//!
//! # Architecture
//!
//! The codebase follows a layered architecture:
//!
//! ```text
//! ┌─────────────────────────────────────┐
//! │    App Layer (Tauri Integration)   │  ← commands, events, state
//! ├─────────────────────────────────────┤
//! │      Domain Layer (Business)        │  ← files, recent, themes, menu, i18n
//! ├─────────────────────────────────────┤
//! │   Core Layer (Infrastructure)       │  ← config, error, logging
//! └─────────────────────────────────────┘
//! ```
//!
//! See ARCHITECTURE.md for detailed documentation.

// Module declarations - organized by architecture layers
mod app;      // Application layer (commands, events, state)
mod core;     // Core infrastructure (config, error, logging)
mod domain;   // Business domains (files, recent, themes, menu, i18n)
mod platform; // Platform-specific code (macos, windows)
mod setup;    // App initialization logic
mod utils;    // General utilities

// Re-export commonly used types
pub use app::state::{OpenedFiles, QuitConfirmed, SidebarState};
pub use core::error::{AppError, AppResult};

use tauri::Manager;

// Internal imports for the run function
use app::{commands, events};
use domain::files::{operations as file_ops, search as search_async, watcher as file_watcher};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Build the app with platform-specific configuration
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        // Initialize application state
        .manage(file_watcher::create_file_watcher())
        .manage(OpenedFiles::default())
        .manage(SidebarState::default())
        .manage(QuitConfirmed::default())
        // App setup (initialization)
        .setup(setup::init);

    // Handle menu events (not used on Windows where we use web-based menu)
    #[cfg(not(target_os = "windows"))]
    let builder = builder.on_menu_event(|app, event| {
        domain::menu::handle_menu_event(app, event.id().as_ref());
    });

    let app = builder
        .on_window_event(|window, event| {
            match event {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                    events::handle_window_close_requested(window);
                }
                tauri::WindowEvent::Destroyed => {
                    events::handle_window_destroyed(&window.app_handle());
                }
                tauri::WindowEvent::Focused(true) => {
                    domain::menu::update_window_check_state(window.app_handle(), window.label());
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![
            // Window management commands
            commands::show_window,
            commands::rebuild_menu,
            commands::update_window_appearance,
            commands::get_pending_files,
            commands::force_close_window,
            commands::force_quit_app,
            // Theme commands
            commands::get_themes,
            commands::get_current_theme,
            commands::get_theme_css,
            commands::set_theme,
            commands::refresh_themes,
            commands::open_themes_directory,
            // I18n commands
            commands::set_language,
            commands::get_language,
            // Recent items commands
            commands::add_recent_file,
            commands::add_recent_folder,
            commands::get_recent_items,
            commands::clear_recent_items,
            // Spell checking commands
            commands::spellcheck_available,
            commands::check_spelling,
            commands::get_spell_languages,
            commands::learn_spelling,
            commands::unlearn_spelling,
            commands::ignore_spelling,
            // File operation commands (from file_ops.rs)
            file_ops::read_file,
            file_ops::write_file,
            file_ops::get_app_info,
            file_ops::list_directory,
            file_ops::get_home_directory,
            file_ops::create_directory,
            file_ops::delete_path,
            file_ops::rename_path,
            file_ops::get_file_metadata,
            file_ops::ensure_assets_directory,
            file_ops::save_image,
            file_ops::read_binary_file,
            file_ops::write_binary_file,
            file_ops::set_sidebar_visible,
            file_ops::show_in_folder,
            // Async search (optimized for performance)
            search_async::search_files,
            // File watcher commands
            file_watcher::init_file_watcher,
            file_watcher::watch_file,
            file_watcher::unwatch_file,
            file_watcher::unwatch_all,
            file_watcher::get_watched_files,
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    // Run the app with event handler
    app.run(|app_handle, event| {
        events::handle_run_event(app_handle, event);
    });
}
