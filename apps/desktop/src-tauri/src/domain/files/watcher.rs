use notify::{Config, Event, EventKind, RecommendedWatcher, RecursiveMode, Watcher};
use parking_lot::Mutex;
use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter};

/// Global file watcher state
pub struct FileWatcherState {
    watcher: Option<RecommendedWatcher>,
    watched_paths: HashMap<String, Instant>,
}

impl FileWatcherState {
    pub fn new() -> Self {
        Self {
            watcher: None,
            watched_paths: HashMap::new(),
        }
    }
}

impl Default for FileWatcherState {
    fn default() -> Self {
        Self::new()
    }
}

/// Managed state type for Tauri
pub type FileWatcher = Arc<Mutex<FileWatcherState>>;

/// Create a new file watcher state
pub fn create_file_watcher() -> FileWatcher {
    Arc::new(Mutex::new(FileWatcherState::new()))
}

/// Initialize the file watcher with an app handle
#[tauri::command]
pub fn init_file_watcher(
    app: AppHandle,
    state: tauri::State<'_, FileWatcher>,
) -> Result<(), String> {
    let mut state = state.lock();

    if state.watcher.is_some() {
        return Ok(()); // Already initialized
    }

    let app_handle = app.clone();
    let watched_paths: Arc<Mutex<HashMap<String, Instant>>> = Arc::new(Mutex::new(HashMap::new()));
    let watched_paths_clone = watched_paths.clone();

    let watcher = RecommendedWatcher::new(
        move |res: Result<Event, notify::Error>| {
            if let Ok(event) = res {
                handle_file_event(&app_handle, &event, &watched_paths_clone);
            }
        },
        Config::default().with_poll_interval(Duration::from_secs(1)),
    )
    .map_err(|e| format!("Failed to create watcher: {}", e))?;

    state.watcher = Some(watcher);

    log::info!("File watcher initialized");
    Ok(())
}

/// Handle file system events
fn handle_file_event(
    app: &AppHandle,
    event: &Event,
    watched_paths: &Arc<Mutex<HashMap<String, Instant>>>,
) {
    // Only handle modify events
    let is_modify = matches!(
        event.kind,
        EventKind::Modify(_) | EventKind::Create(_)
    );

    if !is_modify {
        return;
    }

    for path in &event.paths {
        let path_str = path.to_string_lossy().to_string();

        // Debounce: ignore events within 500ms of the last one for the same file
        {
            let mut paths = watched_paths.lock();
            let now = Instant::now();

            if let Some(last_event) = paths.get(&path_str) {
                if now.duration_since(*last_event) < Duration::from_millis(500) {
                    continue;
                }
            }
            paths.insert(path_str.clone(), now);
        }

        // Emit event to frontend
        log::info!("File changed: {}", path_str);
        let _ = app.emit("file-changed", path_str);
    }
}

/// Start watching a file
#[tauri::command]
pub fn watch_file(
    path: String,
    state: tauri::State<'_, FileWatcher>,
) -> Result<(), String> {
    let mut state = state.lock();

    let watcher = state.watcher.as_mut()
        .ok_or_else(|| "File watcher not initialized".to_string())?;

    let file_path = PathBuf::from(&path);

    if !file_path.exists() {
        return Err(format!("File not found: {}", path));
    }

    // Watch the file (non-recursive since it's a file)
    watcher
        .watch(&file_path, RecursiveMode::NonRecursive)
        .map_err(|e| format!("Failed to watch file: {}", e))?;

    state.watched_paths.insert(path.clone(), Instant::now());

    log::info!("Started watching: {}", path);
    Ok(())
}

/// Stop watching a file
#[tauri::command]
pub fn unwatch_file(
    path: String,
    state: tauri::State<'_, FileWatcher>,
) -> Result<(), String> {
    let mut state = state.lock();

    let watcher = state.watcher.as_mut()
        .ok_or_else(|| "File watcher not initialized".to_string())?;

    let file_path = PathBuf::from(&path);

    // Unwatch the file
    let _ = watcher.unwatch(&file_path);
    state.watched_paths.remove(&path);

    log::info!("Stopped watching: {}", path);
    Ok(())
}

/// Stop watching all files
#[tauri::command]
pub fn unwatch_all(
    state: tauri::State<'_, FileWatcher>,
) -> Result<(), String> {
    let mut state = state.lock();

    // Collect paths first to avoid borrow conflict
    let paths: Vec<PathBuf> = state.watched_paths.keys()
        .map(|p| PathBuf::from(p))
        .collect();

    if let Some(watcher) = state.watcher.as_mut() {
        for file_path in &paths {
            let _ = watcher.unwatch(file_path);
        }
    }

    state.watched_paths.clear();

    log::info!("Stopped watching all files");
    Ok(())
}

/// Get list of currently watched files
#[tauri::command]
pub fn get_watched_files(
    state: tauri::State<'_, FileWatcher>,
) -> Vec<String> {
    let state = state.lock();
    state.watched_paths.keys().cloned().collect()
}
