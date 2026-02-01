/**
 * Set up Window menu (macOS only)
 * Note: The actual setAsWindowsMenuForNSApp call is done on the Rust side
 * This function is reserved for logging and possible future extensions
 */
export async function setupWindowMenu(): Promise<void> {
  try {
    // Platform check: execute only on macOS
    const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    if (!isMacOS) {
      console.log('[WindowMenu] Not running on macOS, skipping');
      return;
    }

    // Window menu and setAsWindowsMenuForNSApp are already set on the Rust side
    // See create_menu function in src-tauri/src/lib.rs
    console.log('[WindowMenu] Window menu configured from Rust backend');
  } catch (error) {
    console.error('[WindowMenu] Error:', error);
  }
}
