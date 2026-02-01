//! Business domain layer
//!
//! Contains all business logic, independent of framework.
//! This layer can be reused across different UI frameworks.
//!
//! # Domains
//!
//! - `files`: File management (operations, watching, search)
//! - `recent`: Recent items management with caching
//! - `themes`: Theme management
//! - `menu`: Application menu building
//! - `i18n`: Internationalization
//! - `spellcheck`: System spell checking (macOS/Windows only)

pub mod files;
pub mod i18n;
pub mod menu;
pub mod recent;
pub mod spellcheck;
pub mod themes;
