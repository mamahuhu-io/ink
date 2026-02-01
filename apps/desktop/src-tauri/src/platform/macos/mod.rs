use tauri::App;

pub mod spellcheck;
pub mod window;

pub use window::{configure_window, update_window_theme};

pub fn setup(app: &mut App) {
    window::setup_mac_window(app);
}