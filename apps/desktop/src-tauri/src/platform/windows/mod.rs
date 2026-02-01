use tauri::App;

pub mod spellcheck;
pub mod window;

pub fn setup(app: &mut App) {
    window::setup_win_window(app);
}