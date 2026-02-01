/**
 * Platform detection utilities
 */

// Check if running in Tauri environment
export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window;
}

// Check if running in browser
export function isBrowser(): boolean {
  return !isTauri();
}

// Check if running on macOS
export function isMacOS(): boolean {
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

// Check if running on Windows
export function isWindows(): boolean {
  return navigator.platform.toUpperCase().indexOf('WIN') >= 0;
}

// Check if running on Linux
export function isLinux(): boolean {
  return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}

// Check if spell checking is supported on this platform (macOS/Windows only)
export function isSpellCheckSupported(): boolean {
  return isMacOS() || isWindows();
}

// Get platform type
export type Platform = 'tauri' | 'browser';

export function getPlatform(): Platform {
  return isTauri() ? 'tauri' : 'browser';
}
