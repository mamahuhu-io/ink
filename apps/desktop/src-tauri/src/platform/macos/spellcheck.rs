//! macOS spell checking stub
//! Spell checking is now handled by WebView's built-in spell checker.

pub struct SpellingError {
    pub start: usize,
    pub length: usize,
    pub word: String,
    pub suggestions: Vec<String>,
}

pub fn check_spelling(_text: &str) -> Vec<SpellingError> {
    Vec::new()
}

pub fn is_available() -> bool {
    false
}

pub fn get_available_languages() -> Vec<String> {
    Vec::new()
}

pub fn learn_word(_word: &str) {}

pub fn unlearn_word(_word: &str) {}

pub fn ignore_word(_word: &str) {}
