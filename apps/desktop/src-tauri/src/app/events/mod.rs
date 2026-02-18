//! Window event handlers

use crate::app::state::OpenedFiles;
use crate::app::state::QuitConfirmed;
use tauri::{AppHandle, Emitter, Manager, RunEvent, WebviewWindow, Window};

// macOS-specific imports for handle_reopen_event
#[cfg(target_os = "macos")]
use crate::domain::themes::{ThemeManager, DARK_BACKGROUND_COLOR};
#[cfg(target_os = "macos")]
use std::sync::Arc;
#[cfg(target_os = "macos")]
use tauri::{WebviewUrl, WebviewWindowBuilder};

/// Debug logging macro - only prints in debug builds
macro_rules! debug_log {
    ($tag:expr, $($arg:tt)*) => {
        #[cfg(debug_assertions)]
        eprintln!("[{}] {}", $tag, format!($($arg)*));
    };
}

/// Handle window close requested event
pub fn handle_window_close_requested(window: &Window) {
    let label = window.label();
    debug_log!("WindowClose", "CloseRequested for window: {}", label);

    // Intercept close for all windows to allow frontend to handle unsaved changes
    // Main window and windows starting with "main-" are our app windows
    if label == "main" || label.starts_with("main-") {
        debug_log!("WindowClose", "Emitting event for: {}", label);

        // Use emit_to to explicitly target this specific window by label
        // This is more explicit than window.emit() and ensures no cross-window contamination
        #[derive(serde::Serialize, Clone)]
        struct WindowCloseEvent {
            label: String,
            // Add a unique identifier to help frontend distinguish events
            timestamp: u128,
        }

        let app_handle = window.app_handle();
        let event_data = WindowCloseEvent {
            label: label.to_string(),
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap_or_default()
                .as_millis(),
        };

        // Use emit_to with the window label to ensure it only goes to this window
        if let Err(e) = app_handle.emit_to(label, "window-close-requested", event_data) {
            #[cfg(debug_assertions)]
            eprintln!("[WindowClose] Failed to emit to {}: {}", label, e);
            let _ = e;
        }
    }
    // For other windows (like devtools), let them close normally
}

/// Handle window destroyed event
pub fn handle_window_destroyed(app_handle: &AppHandle) {
    // Delay menu rebuild to ensure window is fully closed
    let app_handle = app_handle.clone();
    tauri::async_runtime::spawn(async move {
        tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
        if let Err(e) = crate::domain::menu::rebuild_menu(&app_handle) {
            #[cfg(debug_assertions)]
            eprintln!("Failed to rebuild menu after window close: {}", e);
            let _ = e;
        }
    });
}

/// Create a new main window with native macOS styling
#[cfg(target_os = "macos")]
fn create_main_window(app_handle: &AppHandle) {
    let unique_label = format!(
        "main-{}",
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis()
    );
    debug_log!("WindowCreation", "Creating new window with label: {}", unique_label);

    // Determine background color based on current theme
    let bg_color = if let Some(theme_manager) = app_handle.try_state::<Arc<ThemeManager>>() {
        theme_manager.get_current_background_color()
    } else {
        DARK_BACKGROUND_COLOR
    };

    let mut builder = WebviewWindowBuilder::new(
        app_handle,
        &unique_label,
        WebviewUrl::App("index.html".into()),
    )
    .title("Ink")
    .inner_size(1200.0, 800.0)
    .min_inner_size(800.0, 600.0)
    .resizable(true)
    .fullscreen(false)
    .center()
    .visible(false)  // Start hidden, frontend will show after theme loads
    .background_color(bg_color)
    .decorations(true);

    // macOS-specific title bar configuration
    #[cfg(target_os = "macos")]
    {
        builder = builder
            .title_bar_style(tauri::TitleBarStyle::Overlay)
            .hidden_title(true);
    }

    match builder.build() {
        Ok(window) => {
            debug_log!("WindowCreation", "Window created successfully");

            // Update window theme to match current theme
            #[cfg(target_os = "macos")]
            {
                if let Some(theme_manager) = app_handle.try_state::<Arc<ThemeManager>>() {
                    let current_theme = theme_manager.get_current_theme();
                    let is_dark = theme_manager.is_dark_theme(&current_theme);
                    crate::platform::macos::update_window_theme(&window, is_dark);
                }
            }

            // Rebuild menu to include the new window
            if let Err(e) = crate::domain::menu::rebuild_menu(app_handle) {
                #[cfg(debug_assertions)]
                eprintln!("[WindowCreation] Failed to rebuild menu: {}", e);
                let _ = e;
            }
        }
        Err(e) => {
            #[cfg(debug_assertions)]
            eprintln!("[WindowCreation] Failed to create window: {}", e);
            let _ = e;
        }
    }
}

/// Helper to find an existing main window or any valid editor window
fn find_main_window(app_handle: &AppHandle) -> Option<WebviewWindow> {
    app_handle.get_webview_window("main")
        .or_else(|| {
            app_handle.webview_windows()
                .values()
                .find(|w| w.label().starts_with("main"))
                .cloned()
        })
}

/// Handle Reopen event (macOS dock icon click)
#[cfg(target_os = "macos")]
pub fn handle_reopen_event(app_handle: &AppHandle, has_visible_windows: bool) {
    if !has_visible_windows {
        debug_log!("Reopen", "No visible windows, attempting to show or create main window");

        // First, try to show existing window if it exists and is valid
        if let Some(window) = find_main_window(app_handle) {
            // Check if window is actually valid by trying to get its visibility
            match window.is_visible() {
                Ok(_visible) => {
                    debug_log!("Reopen", "Found valid existing window, visible: {}", _visible);
                    
                    // Unminimize if needed (unconditional call is safe)
                    let _ = window.unminimize();
                    
                    if let Err(_e) = window.show() {
                        debug_log!("Reopen", "Failed to show window: {}, will create new", _e);
                    } else {
                        let _ = window.set_focus();
                        return;
                    }
                }
                Err(_e) => {
                    debug_log!("Reopen", "Window exists but is invalid: {}", _e);
                }
            }
        }

        // Window doesn't exist or is invalid, create a new one
        create_main_window(app_handle);
    }
}

/// Handle opened file paths (cross-platform core logic)
/// This is used by both macOS RunEvent::Opened and Windows/Linux CLI args
pub fn handle_opened_paths(app_handle: &AppHandle, paths: Vec<String>) {
    if paths.is_empty() {
        return;
    }

    debug_log!("FileOpen", "Received files: {:?}", paths);

    let app_handle = app_handle.clone();
    let paths = paths.clone();

    // Spawn async task to handle window finding with retry logic
    // This avoids race conditions during app startup where the main window
    // might be in the process of creation but not yet registered
    tauri::async_runtime::spawn(async move {
        // ALWAYS store files in state first.
        // This ensures that:
        // 1. If we are in "Cold Start", the frontend can pick them up via get_pending_files()
        // 2. If we are in "Closed Window" case, the new window will see them.
        // 3. If we are in "Already Running", the frontend calls get_pending_files() after event to clear them.
        if let Some(state) = app_handle.try_state::<OpenedFiles>() {
            if let Ok(mut files) = state.0.lock() {
                files.extend(paths.clone());
            }
        }

        // 1. Try to find existing window immediately
        let mut target_window = find_main_window(&app_handle);

        // 2. If not found, wait a bit and try again (Startup Race Guard)
        if target_window.is_none() {
            debug_log!("FileOpen", "No window found, waiting for potential startup...");
            tokio::time::sleep(tokio::time::Duration::from_millis(300)).await;
            target_window = find_main_window(&app_handle);
        }

        // Check validity: Ensure the window is actually visible or capable of being shown
        // If find_main_window returned a "zombie" window (about to be destroyed), this check helps.
        // We use is_minimizable() as a proxy for validity since is_valid() isn't available
        let is_valid = if let Some(ref w) = target_window {
            w.is_minimizable().is_ok()
        } else {
            false
        };

        if is_valid {
            let window = target_window.unwrap();
            let label = window.label();
            debug_log!("FileOpen", "Emitting to valid window: {}", label);
            
            // Emit event (Frontend will handle this if it's already running)
            // Note: Frontend will also call get_pending_files() to clear the state we just wrote to.
            let _ = app_handle.emit_to(label, "files-opened", &paths);

            // Ensure window is visible and focused (critical for "Open With")
            #[cfg(target_os = "macos")]
            {
                // Unminimize unconditionally to ensure it restores from Dock
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
            }
        } else {
            // 3. Still no valid window found - we are likely in "Closed Window" state (running but no UI)
            debug_log!("FileOpen", "No valid window available after retry, creating new one");
            
            // Files are already stored in state above.

            // On macOS, if the window was closed (red button), we need to recreate it
            #[cfg(target_os = "macos")]
            {
                create_main_window(&app_handle);
            }
        }
    });
}

/// Handle files opened via "Open With" or double-click (macOS only)
#[cfg(target_os = "macos")]
pub fn handle_opened_files(app_handle: &AppHandle, urls: Vec<tauri::Url>) {
    // Convert URLs to file paths
    let paths: Vec<String> = urls
        .iter()
        .filter_map(|url| url.to_file_path().ok())
        .map(|p| p.to_string_lossy().to_string())
        .collect();

    handle_opened_paths(app_handle, paths);
}

/// Handle app quit request (Cmd+Q or menu quit)
pub fn handle_exit_requested(app_handle: &AppHandle, quit_confirmed: &QuitConfirmed) -> bool {
    debug_log!("AppQuit", "ExitRequested event received");

    // Check if we've already confirmed quit
    if quit_confirmed.is_confirmed() {
        debug_log!("AppQuit", "Quit already confirmed, allowing exit");
        // Reset the flag (in case app is restarted somehow)
        quit_confirmed.set_confirmed(false);
        // Allow exit
        return true;
    }

    // Prevent default quit and let each window handle its unsaved changes
    debug_log!("AppQuit", "Emitting app-quit-requested globally");
    if let Err(e) = app_handle.emit("app-quit-requested", ()) {
        #[cfg(debug_assertions)]
        eprintln!("[AppQuit] Failed to emit app-quit-requested: {}", e);
        let _ = e;
    }

    // Prevent exit
    false
}

/// Main event loop handler
pub fn handle_run_event(app_handle: &tauri::AppHandle, event: RunEvent) {
    let quit_confirmed = app_handle.state::<QuitConfirmed>();

    // macOS-specific events (Reopen and Opened are only available on macOS)
    #[cfg(target_os = "macos")]
    match &event {
        // macOS: User clicked the dock icon when no windows are visible
        RunEvent::Reopen {
            has_visible_windows,
            ..
        } => {
            handle_reopen_event(app_handle, *has_visible_windows);
        }

        // Handle files opened via "Open With" or double-click
        RunEvent::Opened { urls } => {
            handle_opened_files(app_handle, urls.clone());
        }

        _ => {}
    }

    // Cross-platform events
    match event {
        // Handle app quit request (Cmd+Q or menu quit)
        RunEvent::ExitRequested { api, .. } => {
            let should_exit = handle_exit_requested(app_handle, &quit_confirmed);
            if !should_exit {
                api.prevent_exit();
            }
        }

        _ => {}
    }
}
