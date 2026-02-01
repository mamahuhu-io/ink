//! macOS window configuration for traffic light buttons.
//! Uses objc2 crates for safe Objective-C interop.

use std::cell::RefCell;

use objc2::rc::Retained;
use objc2::runtime::Bool as ObjcBool;
use objc2::runtime::ProtocolObject;
use objc2::{class, define_class, msg_send, sel, DefinedClass, MainThreadOnly};
use objc2_app_kit::{
    NSAppearance, NSAppearanceCustomization, NSAppearanceNameVibrantDark,
    NSAppearanceNameVibrantLight, NSWindow, NSWindowDelegate,
};
use objc2_foundation::{MainThreadMarker, NSNotification, NSObject, NSObjectProtocol};
use tauri::Emitter;
use tauri::WebviewWindow;
use tauri::{App, Manager};

/// Wrapper to make raw pointer Send-safe for cross-thread operations
struct UnsafeWindowHandle(isize);
unsafe impl Send for UnsafeWindowHandle {}
unsafe impl Sync for UnsafeWindowHandle {}

/// Update window appearance (light/dark theme)
pub fn update_window_theme(window: &WebviewWindow, use_dark: bool) {
    let ns_window_ptr = match window.ns_window() {
        Ok(ptr) => ptr,
        Err(_) => return,
    };

    let handle = UnsafeWindowHandle(ns_window_ptr as isize);

    let _ = window.run_on_main_thread(move || {
        let ns_window: &NSWindow = unsafe { &*(handle.0 as *const NSWindow) };
        let appearance = if use_dark {
            unsafe { NSAppearance::appearanceNamed(NSAppearanceNameVibrantDark) }
        } else {
            unsafe { NSAppearance::appearanceNamed(NSAppearanceNameVibrantLight) }
        };
        if let Some(app) = appearance {
            ns_window.setAppearance(Some(&app));
        }
    });
}

/// Instance variables for our custom window delegate
struct DelegateIvars {
    window: RefCell<Option<WebviewWindow>>,
    super_delegate: RefCell<Option<Retained<ProtocolObject<dyn NSWindowDelegate>>>>,
}

define_class!(
    // SAFETY: NSObject has no special subclassing requirements.
    #[unsafe(super(NSObject))]
    #[thread_kind = MainThreadOnly]
    #[name = "ATypistWindowDelegate"]
    #[ivars = DelegateIvars]
    struct ATypistWindowDelegate;

    unsafe impl NSObjectProtocol for ATypistWindowDelegate {}

    unsafe impl NSWindowDelegate for ATypistWindowDelegate {
        #[unsafe(method(windowShouldClose:))]
        fn window_should_close(&self, sender: &NSWindow) -> ObjcBool {
            #[cfg(debug_assertions)]
            println!("[MacDelegate] windowShouldClose called");
            // Forward to super delegate first
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let result: ObjcBool = unsafe { msg_send![super_del, windowShouldClose: sender] };
                #[cfg(debug_assertions)]
                println!("[MacDelegate] Super delegate returned: {:?}", result);
                return result;
            }
            // Default: allow close
            ObjcBool::YES
        }

        #[unsafe(method(windowDidResize:))]
        fn window_did_resize(&self, notification: &NSNotification) {
            // Forward to super delegate
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let _: () = unsafe { msg_send![super_del, windowDidResize: notification] };
            }
        }

        #[unsafe(method(windowWillEnterFullScreen:))]
        fn window_will_enter_fullscreen(&self, notification: &NSNotification) {
            if let Some(ref webview_window) = *self.ivars().window.borrow() {
                let _: Result<(), _> = webview_window.emit("will-enter-fullscreen", ());
            }
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let _: () = unsafe { msg_send![super_del, windowWillEnterFullScreen: notification] };
            }
        }

        #[unsafe(method(windowDidEnterFullScreen:))]
        fn window_did_enter_fullscreen(&self, notification: &NSNotification) {
            if let Some(ref webview_window) = *self.ivars().window.borrow() {
                let _: Result<(), _> = webview_window.emit("did-enter-fullscreen", ());
            }
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let _: () = unsafe { msg_send![super_del, windowDidEnterFullScreen: notification] };
            }
        }

        #[unsafe(method(windowWillExitFullScreen:))]
        fn window_will_exit_fullscreen(&self, notification: &NSNotification) {
            if let Some(ref webview_window) = *self.ivars().window.borrow() {
                let _: Result<(), _> = webview_window.emit("will-exit-fullscreen", ());
            }
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let _: () = unsafe { msg_send![super_del, windowWillExitFullScreen: notification] };
            }
        }

        #[unsafe(method(windowDidExitFullScreen:))]
        fn window_did_exit_fullscreen(&self, notification: &NSNotification) {
            if let Some(ref webview_window) = *self.ivars().window.borrow() {
                let _: Result<(), _> = webview_window.emit("did-exit-fullscreen", ());
            }
            if let Some(ref super_del) = *self.ivars().super_delegate.borrow() {
                let _: () = unsafe { msg_send![super_del, windowDidExitFullScreen: notification] };
            }
        }
    }
);

impl ATypistWindowDelegate {
    fn new(
        mtm: MainThreadMarker,
        webview_window: WebviewWindow,
        super_delegate: Option<Retained<ProtocolObject<dyn NSWindowDelegate>>>,
    ) -> Retained<Self> {
        let this = mtm.alloc::<Self>().set_ivars(DelegateIvars {
            window: RefCell::new(Some(webview_window)),
            super_delegate: RefCell::new(super_delegate),
        });
        unsafe { msg_send![super(this), init] }
    }
}

#[cfg(target_os = "macos")]
pub fn configure_window(window: &WebviewWindow) {
    // Get main thread marker - required for MainThreadOnly types
    let mtm = match MainThreadMarker::new() {
        Some(m) => m,
        None => {
            #[cfg(debug_assertions)]
            eprintln!("Warning: configure_window must be called from main thread");
            return;
        }
    };

    let ns_window_ptr = match window.ns_window() {
        Ok(ptr) => ptr,
        Err(_) => return,
    };

    let ns_window: &NSWindow = unsafe { &*(ns_window_ptr as *const NSWindow) };

    // Get the current delegate
    let current_delegate = ns_window.delegate();

    // Create our custom delegate
    let delegate = ATypistWindowDelegate::new(mtm, window.clone(), current_delegate);

    // Set our delegate
    ns_window.setDelegate(Some(ProtocolObject::from_ref(&*delegate)));

    // Keep delegate alive by leaking it (it will live for the app's lifetime)
    std::mem::forget(delegate);

    // Initialize with light theme
    update_window_theme(&window, false);

    // Add an empty NSToolbar to increase titlebar height and lower traffic lights
    unsafe {
        let toolbar: Retained<NSObject> = msg_send![class!(NSToolbar), new];
        let _: () = msg_send![&*toolbar, setDisplayMode: 1isize]; // NSToolbarDisplayModeIconOnly
        let _: () = msg_send![ns_window, setToolbar: &*toolbar];
        
        // NSWindowToolbarStyleUnified = 3 (macOS 11.0+)
        if msg_send![ns_window, respondsToSelector: sel!(setToolbarStyle:)] {
            let _: () = msg_send![ns_window, setToolbarStyle: 4isize];
        }
        
        // NSTitlebarSeparatorStyleNone = 1
        if msg_send![ns_window, respondsToSelector: sel!(setTitlebarSeparatorStyle:)] {
            let _: () = msg_send![ns_window, setTitlebarSeparatorStyle: 1isize];
        }
    }
}

#[cfg(target_os = "macos")]
pub fn setup_mac_window(app: &mut App) {
    let window = app.get_webview_window("main").unwrap();
    configure_window(&window);
}
