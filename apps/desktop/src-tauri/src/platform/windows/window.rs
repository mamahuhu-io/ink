//! Windows window configuration for custom title bar and dark mode support.
//! Uses Windows DWM (Desktop Window Manager) API for window styling.

use std::{ffi::c_void, mem::size_of, ptr};
use tauri::{App, Listener, Manager};

use windows::Win32::{
    Foundation::{COLORREF, HWND},
    Graphics::Dwm::{
        DwmSetWindowAttribute, DWMWA_CAPTION_COLOR, DWMWA_USE_IMMERSIVE_DARK_MODE,
    },
    UI::Controls::{
        SetWindowThemeAttribute, WTA_NONCLIENT, WTNCA_NODRAWCAPTION, WTNCA_NODRAWICON,
        WTNCA_NOMIRRORHELP, WTNCA_NOSYSMENU,
    },
};

/// Wrapper to make HWND pointer Send-safe for cross-thread operations
/// We store the raw pointer value and reconstruct HWND when needed
#[derive(Clone, Copy)]
struct SendableHWND(*mut c_void);
unsafe impl Send for SendableHWND {}
unsafe impl Sync for SendableHWND {}

impl SendableHWND {
    fn new(hwnd: HWND) -> Self {
        SendableHWND(hwnd.0)
    }

    fn as_hwnd(&self) -> HWND {
        HWND(self.0)
    }
}

/// Windows theme attribute structure for SetWindowThemeAttribute
#[repr(C)]
struct WinThemeAttribute {
    flag: u32,
    mask: u32,
}

/// Convert RGB values to Windows COLORREF format
fn rgb_to_colorref(r: u8, g: u8, b: u8) -> COLORREF {
    COLORREF((r as u32) | ((g as u32) << 8) | ((b as u32) << 16))
}

/// Check if running on Windows 11 or later
/// Windows 11 is identified as Windows 10.0.22000+
fn is_windows_11() -> bool {
    // Simple check: Windows 11 supports DWMWA_CAPTION_COLOR
    // More robust version detection would require winver crate
    // For now, we'll try to set the attribute and ignore errors on Win10
    true // We'll try the API and it will gracefully fail on Win10
}

/// Update window theme with dark mode and optional custom colors
fn update_window_theme(hwnd: HWND, is_dark: bool, bg_color: Option<(u8, u8, u8)>) {
    unsafe {
        // 1. Set immersive dark mode (Windows 10 1809+)
        // Windows BOOL is i32: TRUE = 1, FALSE = 0
        let use_dark: i32 = if is_dark { 1 } else { 0 };
        let _ = DwmSetWindowAttribute(
            hwnd,
            DWMWA_USE_IMMERSIVE_DARK_MODE,
            ptr::addr_of!(use_dark) as *const c_void,
            size_of::<i32>() as u32,
        );

        // 2. Set custom caption color (Windows 11 only)
        if let Some((r, g, b)) = bg_color {
            if is_windows_11() {
                let color = rgb_to_colorref(r, g, b);
                // This will silently fail on Windows 10, which is fine
                let _ = DwmSetWindowAttribute(
                    hwnd,
                    DWMWA_CAPTION_COLOR,
                    ptr::addr_of!(color) as *const c_void,
                    size_of::<COLORREF>() as u32,
                );
            }
        }

        // 3. Customize non-client area (hide system icons and menu)
        let flags = WTNCA_NODRAWCAPTION | WTNCA_NODRAWICON;
        let mask = WTNCA_NODRAWCAPTION
            | WTNCA_NODRAWICON
            | WTNCA_NOSYSMENU
            | WTNCA_NOMIRRORHELP;
        let options = WinThemeAttribute {
            flag: flags,
            mask: mask,
        };

        let _ = SetWindowThemeAttribute(
            hwnd,
            WTA_NONCLIENT,
            ptr::addr_of!(options) as *const c_void,
            size_of::<WinThemeAttribute>() as u32,
        );
    }
}

/// Setup Windows window with custom styling
#[cfg(target_os = "windows")]
pub fn setup_win_window(app: &mut App) {
    let window = match app.get_webview_window("main") {
        Some(w) => w,
        None => {
            #[cfg(debug_assertions)]
            eprintln!("Warning: Failed to get main window for Windows customization");
            return;
        }
    };

    // Disable native window decorations - we use a custom web-based title bar
    if let Err(e) = window.set_decorations(false) {
        #[cfg(debug_assertions)]
        eprintln!("Warning: Failed to disable window decorations: {}", e);
        let _ = e;
    }

    let raw_hwnd = match window.hwnd() {
        Ok(h) => h,
        Err(e) => {
            #[cfg(debug_assertions)]
            eprintln!("Warning: Failed to get HWND: {}", e);
            let _ = e;
            return;
        }
    };

    // Convert tauri's HWND to windows crate's HWND
    let hwnd = HWND(raw_hwnd.0);

    // Initialize with dark theme by default
    update_window_theme(hwnd, true, Some((30, 30, 30)));

    // Listen for theme changes from frontend
    let hwnd_for_listener = SendableHWND::new(hwnd);
    app.listen("theme-changed", move |event| {
        let theme_id = event.payload();
        let is_dark = theme_id.contains("dark");
        let bg_color = if is_dark {
            Some((30, 30, 30)) // Dark background
        } else {
            Some((245, 245, 245)) // Light background
        };
        update_window_theme(hwnd_for_listener.as_hwnd(), is_dark, bg_color);
    });

    #[cfg(debug_assertions)]
    println!("Windows window customization initialized");
}
