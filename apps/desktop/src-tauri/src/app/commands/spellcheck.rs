//! Spell checking commands

use crate::domain::spellcheck;

/// Check if spell checking is available on this platform
#[tauri::command]
pub fn spellcheck_available() -> bool {
    spellcheck::is_available()
}

/// Check spelling of the given text
#[tauri::command]
pub fn check_spelling(text: String) -> Vec<spellcheck::SpellingError> {
    spellcheck::check_spelling(&text)
}

/// Get available languages for spell checking
#[tauri::command]
pub fn get_spell_languages() -> Vec<String> {
    spellcheck::get_available_languages()
}

/// Add a word to the user's dictionary
#[tauri::command]
pub fn learn_spelling(word: String) {
    spellcheck::learn_word(&word);
}

/// Remove a word from the user's dictionary
#[tauri::command]
pub fn unlearn_spelling(word: String) {
    spellcheck::unlearn_word(&word);
}

/// Ignore a word for this session
#[tauri::command]
pub fn ignore_spelling(word: String) {
    spellcheck::ignore_word(&word);
}
