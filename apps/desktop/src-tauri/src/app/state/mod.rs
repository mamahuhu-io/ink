//! Application state management
//!
//! This module centralizes all application-wide state that needs to be shared
//! across commands and event handlers. State is managed through Tauri's managed
//! state system, which provides thread-safe access patterns.
//!
//! # Architecture
//!
//! - `OpenedFiles`: Tracks currently opened file paths across windows
//! - `SidebarState`: Manages sidebar visibility state for UI synchronization
//! - `QuitConfirmed`: Atomic flag for clean application shutdown coordination
//!
//! # Thread Safety
//!
//! All state types use appropriate synchronization primitives:
//! - `Mutex` for data that needs mutable access
//! - `AtomicBool` for simple boolean flags (lock-free)
//!
//! # Example
//!
//! ```rust,ignore
//! // Accessing state in a command
//! #[tauri::command]
//! fn some_command(opened_files: tauri::State<'_, OpenedFiles>) {
//!     let files = opened_files.0.lock().unwrap();
//!     // Use files...
//! }
//! ```

use std::sync::atomic::AtomicBool;
use std::sync::Mutex;

/// State to store files opened via "Open With" before the frontend is ready
pub struct OpenedFiles(pub Mutex<Vec<String>>);

impl OpenedFiles {
    pub fn new() -> Self {
        Self(Mutex::new(Vec::new()))
    }
}

impl Default for OpenedFiles {
    fn default() -> Self {
        Self::new()
    }
}

/// State to store sidebar visibility for menu sync
pub struct SidebarState(pub Mutex<bool>);

impl SidebarState {
    pub fn new(visible: bool) -> Self {
        Self(Mutex::new(visible))
    }
}

impl Default for SidebarState {
    fn default() -> Self {
        Self::new(true) // Default to visible
    }
}

/// Global flag to indicate we've confirmed quit and should exit
pub struct QuitConfirmed(pub AtomicBool);

impl QuitConfirmed {
    pub fn new() -> Self {
        Self(AtomicBool::new(false))
    }

    pub fn is_confirmed(&self) -> bool {
        self.0.load(std::sync::atomic::Ordering::SeqCst)
    }

    pub fn set_confirmed(&self, confirmed: bool) {
        self.0.store(confirmed, std::sync::atomic::Ordering::SeqCst);
    }
}

impl Default for QuitConfirmed {
    fn default() -> Self {
        Self::new()
    }
}
