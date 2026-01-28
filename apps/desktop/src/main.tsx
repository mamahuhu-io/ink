// Initialize window ID BEFORE stores are loaded
// This ensures each window has its own isolated state
(function initializeWindowId() {
  // Check if we're in Tauri environment
  if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
    try {
      const tauriWindow = (window as any).__TAURI_INTERNALS__?.metadata?.currentWindow;
      if (tauriWindow?.label) {
        console.log('[Init] Setting window ID from Tauri label:', tauriWindow.label);
        sessionStorage.setItem('window-id', tauriWindow.label);
      } else {
        console.warn('[Init] Tauri window label not found in __TAURI_INTERNALS__');
      }
    } catch (e) {
      console.error('[Init] Failed to initialize window ID:', e);
    }
  }
})();

// Initialize i18n FIRST
import './i18n';
import './stores/language'; // Initialize language from persisted state

// IMPORTANT: Initialize Ink Stone effects AFTER i18n is ready
import { effects } from './editor/effects';
effects();

import './styles/index.css';

import ReactDOM from 'react-dom/client';

import App from './App';

console.log('Ink Stone effects initialized, rendering app...');

// Remove StrictMode to avoid double rendering which conflicts with Lit Web Components
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
