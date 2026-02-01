//! Command modules organized by functionality

pub mod i18n;
pub mod recent;
pub mod spellcheck;
pub mod theme;
pub mod window;

// Re-export commonly used commands
pub use i18n::*;
pub use recent::*;
pub use spellcheck::*;
pub use theme::*;
pub use window::*;
