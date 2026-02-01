//! Application layer
//!
//! Tauri integration and command handlers.
//! This layer connects the UI (frontend) with business logic (domain layer).
//!
//! # Modules
//!
//! - `commands`: Tauri command handlers
//! - `events`: Event handlers (window, app lifecycle)
//! - `state`: Application state management

pub mod commands;
pub mod events;
pub mod state;
