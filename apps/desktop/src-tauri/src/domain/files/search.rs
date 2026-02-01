//! Async search functionality for improved performance
//!
//! Provides non-blocking file search using tokio async runtime.

use crate::core::config::search as search_config;
use crate::core::error::{AppError, AppResult};
use ignore::WalkBuilder;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::Path;
use tokio::task;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchMatch {
    pub line_number: usize,
    pub line_content: String,
    pub match_start: usize,
    pub match_end: usize,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchResult {
    pub file_path: String,
    pub file_name: String,
    pub is_name_match: bool,
    pub matches: Vec<SearchMatch>,
}

/// Async search for files and content matching the query
#[tauri::command]
pub async fn search_files(
    root_path: String,
    query: String,
    case_sensitive: bool,
) -> AppResult<Vec<SearchResult>> {
    let span = tracing::info_span!("search_files", root = %root_path, query = %query, case_sensitive);
    let _entered = span.enter();

    if query.trim().is_empty() {
        return Ok(Vec::new());
    }

    tracing::info!("Starting async search");

    // Spawn blocking task to avoid blocking the async runtime
    let start = std::time::Instant::now();
    let results = task::spawn_blocking(move || {
        search_directory_sync(&root_path, &query, case_sensitive)
    })
    .await
    .map_err(|e| AppError::Internal(format!("Search task panicked: {}", e)))??;

    let duration = start.elapsed();
    tracing::info!("Search completed in {:?}, found {} results", duration, results.len());

    Ok(results)
}

/// Synchronous search implementation using `ignore` crate for performance
fn search_directory_sync(
    root_path: &str,
    query: &str,
    case_sensitive: bool,
) -> AppResult<Vec<SearchResult>> {
    // Validate directory path
    let root = crate::utils::validate_directory(root_path)
        .map_err(|e| AppError::InvalidPath(e))?;

    let mut results: Vec<SearchResult> = Vec::new();
    let query_lower = query.to_lowercase();
    let query_to_check = if case_sensitive { query } else { &query_lower };

    // Configure the walker:
    // - Respect .gitignore (default)
    // - Ignore hidden files (default)
    // - Max depth from config
    let walker = WalkBuilder::new(&root)
        .max_depth(Some(search_config::MAX_DEPTH))
        .git_ignore(true)
        .hidden(true) 
        .filter_entry(|entry| {
            // Additional hardcoded skips for common large directories
            // strictly following the previous logic's skip list
            if entry.file_type().map(|ft| ft.is_dir()).unwrap_or(false) {
                let name = entry.file_name().to_string_lossy();
                const SKIP_DIRS: &[&str] = &[
                    "node_modules",
                    "target",
                    "dist",
                    "build",
                    ".git",
                    "__pycache__",
                    "vendor",
                ];
                if SKIP_DIRS.contains(&name.as_ref()) {
                    return false;
                }
            }
            true
        })
        .build();

    for result in walker {
        // Stop if we hit the max results limit
        if results.len() >= search_config::MAX_RESULTS {
            break;
        }

        let entry = match result {
            Ok(e) => e,
            Err(_) => continue, // Skip errors (permissions etc)
        };

        // Only process files
        if !entry.file_type().map(|ft| ft.is_file()).unwrap_or(false) {
            continue;
        }

        let path = entry.path();
        
        // Extension filter (Markdown only)
        let ext = path.extension().map(|e| e.to_string_lossy().to_lowercase());
        if ext != Some("md".to_string()) && ext != Some("markdown".to_string()) {
            continue;
        }

        let name = entry.file_name().to_string_lossy().to_string();
        
        // Check filename match
        let name_to_check = if case_sensitive {
            name.clone()
        } else {
            name.to_lowercase()
        };
        let is_name_match = name_to_check.contains(query_to_check);

        // Search content (only if we haven't found a match by name, OR if we want to show content matches too)
        // The previous implementation showed both name matches AND content matches.
        
        let matches = search_file_content(path, query, query_to_check, case_sensitive);

        if is_name_match || !matches.is_empty() {
            results.push(SearchResult {
                file_path: path.to_string_lossy().to_string(),
                file_name: name,
                is_name_match,
                matches,
            });
        }
    }

    // Sort results: name matches first, then by number of content matches
    results.sort_by(|a, b| match (a.is_name_match, b.is_name_match) {
        (true, false) => std::cmp::Ordering::Less,
        (false, true) => std::cmp::Ordering::Greater,
        _ => b.matches.len().cmp(&a.matches.len()),
    });

    Ok(results)
}

fn search_file_content(
    path: &Path,
    query: &str,
    query_to_check: &str,
    case_sensitive: bool,
) -> Vec<SearchMatch> {
    let mut matches: Vec<SearchMatch> = Vec::new();

    // Use BufReader for memory efficiency (read line by line instead of whole file)
    let file = match File::open(path) {
        Ok(f) => f,
        Err(_) => return matches,
    };
    let reader = BufReader::new(file);

    for (line_idx, line_result) in reader.lines().enumerate() {
        let line = match line_result {
            Ok(l) => l,
            Err(_) => continue, // Skip binary files or read errors
        };

        // Check limits per file
        if matches.len() >= search_config::MAX_MATCHES_PER_FILE {
            break;
        }

        let line_to_check = if case_sensitive {
            line.clone()
        } else {
            line.to_lowercase()
        };

        let mut search_start = 0;
        while let Some(pos) = line_to_check[search_start..].find(query_to_check) {
            let match_start = search_start + pos;
            let match_end = match_start + query.len();

            matches.push(SearchMatch {
                line_number: line_idx + 1,
                line_content: line.clone(), // Clone original line for display
                match_start,
                match_end,
            });

            search_start = match_end;

            if matches.len() >= search_config::MAX_MATCHES_PER_FILE {
                break;
            }
        }
    }

    matches
}