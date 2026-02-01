//! Linux specific implementations

use tauri::App;

pub mod window {
    use super::*;

    /// Setup Linux specific window settings
    pub fn setup_linux_window(_app: &mut App) {
        // Placeholder for Linux specific window setup
        // e.g. Wayland vs X11 handling, window decorations, etc.
        tracing::debug!("Setting up Linux window");
    }
}

pub fn setup(app: &mut App) {
    window::setup_linux_window(app);
}