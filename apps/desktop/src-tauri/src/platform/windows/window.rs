//! Windows window configuration using Tauri built-in APIs only.

use tauri::{App, Manager, Listener, Theme};

/// Setup Windows window with custom styling
pub fn setup_win_window(app: &mut App) {
    let window = match app.get_webview_window("main") {
        Some(w) => w,
        None => return,
    };

    // Disable native window decorations - we use a custom web-based title bar
    let _ = window.set_decorations(false);

    // Initialize with dark theme
    let _ = window.set_theme(Some(Theme::Dark));

    // Listen for theme changes from frontend
    let win = window.clone();
    app.listen("theme-changed", move |event| {
        let theme_id = event.payload();
        let is_dark = theme_id.contains("dark");
        let theme = if is_dark { Theme::Dark } else { Theme::Light };
        let _ = win.set_theme(Some(theme));
    });
}
