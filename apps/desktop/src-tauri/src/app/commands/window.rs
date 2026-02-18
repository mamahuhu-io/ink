//! Window management commands

use crate::app::state::QuitConfirmed;
use tauri::{AppHandle, Manager, WebviewWindow};

/// Debug logging macro - only prints in debug builds
macro_rules! debug_log {
    ($tag:expr, $($arg:tt)*) => {
        #[cfg(debug_assertions)]
        eprintln!("[{}] {}", $tag, format!($($arg)*));
    };
}

/// Show the window after frontend is ready (theme loaded)
/// This prevents the white flash during startup
#[tauri::command]
pub fn show_window(window: WebviewWindow) -> Result<(), String> {
    debug_log!("ShowWindow", "Showing window: {}", window.label());
    window.show().map_err(|e| e.to_string())?;
    window.set_focus().map_err(|e| e.to_string())?;

    // Explicitly update menu check state after window is shown and focused
    // This ensures the window is marked as selected in the Window menu
    let label = window.label().to_string();
    crate::domain::menu::update_window_check_state(window.app_handle(), &label);

    Ok(())
}

/// Update window appearance for macOS (traffic light buttons)
#[tauri::command]
pub fn update_window_appearance(window: WebviewWindow, is_dark: bool) {
    let theme = if is_dark {
        tauri::Theme::Dark
    } else {
        tauri::Theme::Light
    };
    let _ = window.set_theme(Some(theme));
}

/// Get files that were opened via "Open With" before frontend was ready
#[tauri::command]
pub fn get_pending_files(state: tauri::State<'_, crate::app::state::OpenedFiles>) -> Vec<String> {
    state
        .0
        .lock()
        .map(|mut files| files.drain(..).collect())
        .unwrap_or_default()
}

/// Force close a window (used after confirming unsaved changes)
#[tauri::command]
pub fn force_close_window(
    window: WebviewWindow,
    _quit_confirmed: tauri::State<'_, QuitConfirmed>,
) -> Result<(), String> {
    #[allow(unused_variables)]
    let label = window.label().to_string();
    let app_handle = window.app_handle().clone();

    debug_log!("ForceClose", "Destroying window: {}", label);

    // Check how many windows we have (used on non-macOS platforms)
    #[allow(unused_variables)]
    let window_count = app_handle.webview_windows().len();
    debug_log!("ForceClose", "Current window count: {}", window_count);

    match window.destroy() {
        Ok(_) => {
            debug_log!("ForceClose", "Successfully destroyed window: {}", label);

            // On macOS, don't exit when closing the last window
            // The app should stay running with just the Dock icon
            // User can click Dock icon to reopen (handled by Reopen event)
            #[cfg(not(target_os = "macos"))]
            {
                // On Windows/Linux, exit when closing the last window
                if window_count <= 1 {
                    debug_log!("ForceClose", "Last window closed, exiting app");
                    _quit_confirmed.set_confirmed(true);
                    app_handle.exit(0);
                }
            }

            #[cfg(target_os = "macos")]
            {
                debug_log!("ForceClose", "Window destroyed on macOS, app stays running");
            }

            Ok(())
        }
        Err(e) => {
            #[cfg(debug_assertions)]
            eprintln!("[ForceClose] Failed to destroy window {}: {}", label, e);
            Err(e.to_string())
        }
    }
}

/// Force quit the entire application (used for Cmd+Q after confirming unsaved changes)
#[tauri::command]
pub fn force_quit_app(app: AppHandle, quit_confirmed: tauri::State<'_, QuitConfirmed>) {
    debug_log!("ForceQuit", "Quitting application...");
    quit_confirmed.set_confirmed(true);
    app.exit(0);
}

/// Tauri command to rebuild the menu (for updating window list)
#[tauri::command]
pub fn rebuild_menu(app: AppHandle) -> Result<(), String> {
    crate::domain::menu::rebuild_menu(&app).map_err(|e| e.to_string())
}
