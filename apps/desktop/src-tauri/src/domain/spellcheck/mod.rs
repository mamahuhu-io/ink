//! Spell checking domain
//!
//! Provides a unified interface for system spell checking.
//! - macOS: Uses NSSpellChecker
//! - Windows: Uses ISpellChecker API
//! - Linux: Not supported (returns empty results)

/// A spelling error with position and length
#[derive(Debug, Clone, serde::Serialize)]
pub struct SpellingError {
    /// Start position in the text (character index)
    pub start: usize,
    /// Length of the misspelled word
    pub length: usize,
    /// The misspelled word
    pub word: String,
    /// Suggested corrections
    pub suggestions: Vec<String>,
}

/// Check spelling of the given text and return a list of errors
#[cfg(target_os = "macos")]
pub fn check_spelling(text: &str) -> Vec<SpellingError> {
    crate::platform::macos::spellcheck::check_spelling(text)
        .into_iter()
        .map(|e| SpellingError {
            start: e.start,
            length: e.length,
            word: e.word,
            suggestions: e.suggestions,
        })
        .collect()
}

#[cfg(target_os = "windows")]
pub fn check_spelling(text: &str) -> Vec<SpellingError> {
    crate::platform::windows::spellcheck::check_spelling(text)
        .into_iter()
        .map(|e| SpellingError {
            start: e.start,
            length: e.length,
            word: e.word,
            suggestions: e.suggestions,
        })
        .collect()
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn check_spelling(_text: &str) -> Vec<SpellingError> {
    Vec::new()
}

/// Check if spell checking is available on this system
#[cfg(target_os = "macos")]
pub fn is_available() -> bool {
    crate::platform::macos::spellcheck::is_available()
}

#[cfg(target_os = "windows")]
pub fn is_available() -> bool {
    crate::platform::windows::spellcheck::is_available()
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn is_available() -> bool {
    false
}

/// Get the list of available languages for spell checking
#[cfg(target_os = "macos")]
pub fn get_available_languages() -> Vec<String> {
    crate::platform::macos::spellcheck::get_available_languages()
}

#[cfg(target_os = "windows")]
pub fn get_available_languages() -> Vec<String> {
    crate::platform::windows::spellcheck::get_available_languages()
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn get_available_languages() -> Vec<String> {
    Vec::new()
}

/// Add a word to the user's dictionary (learn word)
#[cfg(target_os = "macos")]
pub fn learn_word(word: &str) {
    crate::platform::macos::spellcheck::learn_word(word);
}

#[cfg(target_os = "windows")]
pub fn learn_word(word: &str) {
    crate::platform::windows::spellcheck::learn_word(word);
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn learn_word(_word: &str) {}

/// Remove a word from the user's dictionary (unlearn word)
#[cfg(target_os = "macos")]
pub fn unlearn_word(word: &str) {
    crate::platform::macos::spellcheck::unlearn_word(word);
}

#[cfg(target_os = "windows")]
pub fn unlearn_word(word: &str) {
    crate::platform::windows::spellcheck::unlearn_word(word);
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn unlearn_word(_word: &str) {}

/// Ignore a word for this session
#[cfg(target_os = "macos")]
pub fn ignore_word(word: &str) {
    crate::platform::macos::spellcheck::ignore_word(word);
}

#[cfg(target_os = "windows")]
pub fn ignore_word(word: &str) {
    crate::platform::windows::spellcheck::ignore_word(word);
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
pub fn ignore_word(_word: &str) {}
