//! Windows spell checking using ISpellChecker API (Windows 8+)

use std::ffi::OsString;
use std::os::windows::ffi::OsStringExt;
use windows::core::HSTRING;
use windows::Win32::Globalization::{
    ISpellChecker, ISpellCheckerFactory, SpellCheckerFactory,
    CORRECTIVE_ACTION_GET_SUGGESTIONS, CORRECTIVE_ACTION_REPLACE,
};
use windows::Win32::System::Com::{CoCreateInstance, CoInitializeEx, CLSCTX_INPROC_SERVER, COINIT_MULTITHREADED};

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

// Thread-local COM initialization flag
thread_local! {
    static COM_INITIALIZED: std::cell::Cell<bool> = const { std::cell::Cell::new(false) };
}

/// Ensure COM is initialized for the current thread
fn ensure_com_initialized() {
    COM_INITIALIZED.with(|initialized| {
        if !initialized.get() {
            unsafe {
                let _ = CoInitializeEx(None, COINIT_MULTITHREADED);
            }
            initialized.set(true);
        }
    });
}

/// Get the spell checker factory
fn get_factory() -> windows::core::Result<ISpellCheckerFactory> {
    ensure_com_initialized();
    unsafe { CoCreateInstance(&SpellCheckerFactory, None, CLSCTX_INPROC_SERVER) }
}

/// Get a spell checker for the specified language (defaults to en-US)
fn get_checker(language: Option<&str>) -> windows::core::Result<ISpellChecker> {
    let factory = get_factory()?;
    let lang = language.unwrap_or("en-US");
    let lang_hstring = HSTRING::from(lang);
    unsafe { factory.CreateSpellChecker(&lang_hstring) }
}

/// Check spelling of the given text and return a list of errors
pub fn check_spelling(text: &str) -> Vec<SpellingError> {
    let mut errors = Vec::new();

    let checker = match get_checker(None) {
        Ok(c) => c,
        Err(e) => {
            #[cfg(debug_assertions)]
            eprintln!("[SpellCheck] Failed to create spell checker: {}", e);
            let _ = e;
            return errors;
        }
    };

    let text_hstring = HSTRING::from(text);
    let text_chars: Vec<char> = text.chars().collect();

    let spell_errors = match unsafe { checker.Check(&text_hstring) } {
        Ok(e) => e,
        Err(e) => {
            #[cfg(debug_assertions)]
            eprintln!("[SpellCheck] Failed to check spelling: {}", e);
            let _ = e;
            return errors;
        }
    };

    loop {
        let mut error = None;
        if unsafe { spell_errors.Next(&mut error) }.is_err() {
            break;
        }

        let Some(err) = error else {
            break;
        };

        let start = match unsafe { err.StartIndex() } {
            Ok(s) => s as usize,
            Err(_) => continue,
        };

        let length = match unsafe { err.Length() } {
            Ok(l) => l as usize,
            Err(_) => continue,
        };

        // Extract the misspelled word
        let word: String = text_chars[start..start + length].iter().collect();

        // Get suggestions
        let suggestions = match unsafe { err.CorrectiveAction() } {
            Ok(action) if action == CORRECTIVE_ACTION_GET_SUGGESTIONS || action == CORRECTIVE_ACTION_REPLACE => {
                get_suggestions_for_word(&checker, &word)
            }
            _ => Vec::new(),
        };

        errors.push(SpellingError {
            start,
            length,
            word,
            suggestions,
        });
    }

    errors
}

/// Get spelling suggestions for a word
fn get_suggestions_for_word(checker: &ISpellChecker, word: &str) -> Vec<String> {
    let word_hstring = HSTRING::from(word);

    let suggestions = match unsafe { checker.Suggest(&word_hstring) } {
        Ok(s) => s,
        Err(_) => return Vec::new(),
    };

    let mut result = Vec::new();
    loop {
        let mut suggestion: PwstrWrapper = PwstrWrapper::default();
        if unsafe { suggestions.Next(std::slice::from_mut(&mut suggestion.0), None) }.is_err() {
            break;
        }
        if suggestion.0.is_null() {
            break;
        }

        let s = unsafe { pwstr_to_string(suggestion.0) };
        if !s.is_empty() {
            result.push(s);
            if result.len() >= 5 {
                // Limit to 5 suggestions
                break;
            }
        }
    }

    result
}

/// Wrapper for PWSTR to help with safety
struct PwstrWrapper(windows::core::PWSTR);

impl Default for PwstrWrapper {
    fn default() -> Self {
        PwstrWrapper(windows::core::PWSTR::null())
    }
}

/// Convert PWSTR to String
unsafe fn pwstr_to_string(ptr: windows::core::PWSTR) -> String {
    if ptr.is_null() {
        return String::new();
    }

    let mut len = 0;
    while *ptr.0.add(len) != 0 {
        len += 1;
    }

    let slice = std::slice::from_raw_parts(ptr.0, len);
    OsString::from_wide(slice).to_string_lossy().into_owned()
}

/// Check if spell checking is available on this system
pub fn is_available() -> bool {
    get_factory().is_ok()
}

/// Get the list of available languages for spell checking
pub fn get_available_languages() -> Vec<String> {
    let factory = match get_factory() {
        Ok(f) => f,
        Err(_) => return Vec::new(),
    };

    let languages = match unsafe { factory.SupportedLanguages() } {
        Ok(l) => l,
        Err(_) => return Vec::new(),
    };

    let mut result = Vec::new();
    loop {
        let mut lang: PwstrWrapper = PwstrWrapper::default();
        if unsafe { languages.Next(std::slice::from_mut(&mut lang.0), None) }.is_err() {
            break;
        }
        if lang.0.is_null() {
            break;
        }

        let s = unsafe { pwstr_to_string(lang.0) };
        if !s.is_empty() {
            result.push(s);
        }
    }

    result
}

/// Add a word to the user's dictionary
pub fn learn_word(word: &str) {
    let checker = match get_checker(None) {
        Ok(c) => c,
        Err(_) => return,
    };

    let word_hstring = HSTRING::from(word);
    let _ = unsafe { checker.Add(&word_hstring) };
}

/// Ignore a word for this session
pub fn ignore_word(word: &str) {
    let checker = match get_checker(None) {
        Ok(c) => c,
        Err(_) => return,
    };

    let word_hstring = HSTRING::from(word);
    let _ = unsafe { checker.Ignore(&word_hstring) };
}

/// Remove a word from the user's dictionary (Windows doesn't have direct unlearn)
pub fn unlearn_word(_word: &str) {
    // Windows ISpellChecker doesn't have a direct unlearn API
    // Words added via Add() are stored in the user dictionary
    // Removal would require direct manipulation of the dictionary file
}
