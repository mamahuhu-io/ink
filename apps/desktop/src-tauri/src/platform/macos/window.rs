//! macOS window configuration using Tauri built-in APIs only.

use tauri::{App, Manager, Theme, WebviewWindow};

/// Update window appearance (light/dark theme)
pub fn update_window_theme(window: &WebviewWindow, use_dark: bool) {
    let theme = if use_dark { Theme::Dark } else { Theme::Light };
    let _ = window.set_theme(Some(theme));
}

pub fn setup_mac_window(app: &mut App) {
    let _window = app.get_webview_window("main");
    // Window configuration (titleBarStyle, hiddenTitle, trafficLightPosition)
    // is handled via tauri.conf.json
}
