//! macOS spell checking using NSSpellChecker

use objc2_app_kit::NSSpellChecker;
use objc2_foundation::{NSRange, NSString};

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
pub fn check_spelling(text: &str) -> Vec<SpellingError> {
    let mut errors = Vec::new();
    let ns_text = NSString::from_str(text);
    let text_len = ns_text.length();

    if text_len == 0 {
        return errors;
    }

    let checker = NSSpellChecker::sharedSpellChecker();
    let mut offset: usize = 0;

    while offset < text_len {
        // Check for the next misspelled word
        let misspelled_range = checker.checkSpellingOfString_startingAt(&ns_text, offset as isize);

        // If no more errors found (location is NSNotFound which is usize::MAX)
        if misspelled_range.location == usize::MAX {
            break;
        }

        // Extract the misspelled word
        let word = ns_text.substringWithRange(misspelled_range).to_string();

        // Get suggestions for the misspelled word
        let suggestions = get_suggestions(&checker, &word);

        errors.push(SpellingError {
            start: misspelled_range.location,
            length: misspelled_range.length,
            word,
            suggestions,
        });

        // Move past this error
        offset = misspelled_range.location + misspelled_range.length;
    }

    errors
}

/// Get spelling suggestions for a word
fn get_suggestions(checker: &NSSpellChecker, word: &str) -> Vec<String> {
    let ns_word = NSString::from_str(word);
    let range = NSRange::new(0, ns_word.length());

    let suggestions =
        checker.guessesForWordRange_inString_language_inSpellDocumentWithTag(range, &ns_word, None, 0);

    match suggestions {
        Some(arr) => {
            let count = arr.count();
            let mut result = Vec::with_capacity(count.min(5)); // Limit to 5 suggestions
            for i in 0..count.min(5) {
                let s = arr.objectAtIndex(i);
                result.push(s.to_string());
            }
            result
        }
        None => Vec::new(),
    }
}

/// Check if spell checking is available on this system
pub fn is_available() -> bool {
    // NSSpellChecker is always available on macOS
    true
}

/// Get the list of available languages for spell checking
pub fn get_available_languages() -> Vec<String> {
    let checker = NSSpellChecker::sharedSpellChecker();
    let languages = checker.availableLanguages();

    let count = languages.count();
    let mut result = Vec::with_capacity(count);
    for i in 0..count {
        let lang = languages.objectAtIndex(i);
        result.push(lang.to_string());
    }
    result
}

/// Add a word to the user's dictionary (learn word)
pub fn learn_word(word: &str) {
    let checker = NSSpellChecker::sharedSpellChecker();
    let ns_word = NSString::from_str(word);
    checker.learnWord(&ns_word);
}

/// Remove a word from the user's dictionary (unlearn word)
pub fn unlearn_word(word: &str) {
    let checker = NSSpellChecker::sharedSpellChecker();
    let ns_word = NSString::from_str(word);
    checker.unlearnWord(&ns_word);
}

/// Ignore a word for this session
pub fn ignore_word(word: &str) {
    let checker = NSSpellChecker::sharedSpellChecker();
    let ns_word = NSString::from_str(word);
    checker.ignoreWord_inSpellDocumentWithTag(&ns_word, 0);
}
