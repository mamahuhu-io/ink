/**
 * Menu service - handles menu events from Tauri
 */

import { isTauri } from './platform';

export type MenuAction =
  | 'new_window'
  | 'new_tab'
  | 'open'
  | 'save'
  | 'save_as'
  | 'close_tab'
  | 'toggle_sidebar'
  | 'toggle_source_mode'
  | 'zoom_in'
  | 'zoom_out'
  | 'zoom_reset'
  | 'about'
  | 'preferences'
  | 'import'
  | 'export_html'
  | 'export_pdf'
  | 'export_docx'
  | 'export_image'
  | 'global_search'
  | 'find'
  | 'find_replace'
  | 'undo'
  | 'redo';

export type MenuEventHandler = (action: MenuAction) => void;

let unlistenFn: (() => void) | null = null;
let isSubscribing = false;
let currentHandler: MenuEventHandler | null = null;

/**
 * Subscribe to menu events from Tauri
 */
export async function subscribeToMenuEvents(handler: MenuEventHandler): Promise<void> {
  if (!isTauri()) {
    console.log('Menu events only available in Tauri environment');
    return;
  }

  // Store the current handler for reference
  currentHandler = handler;

  // If already subscribed, just update the handler (already done above)
  if (unlistenFn) {
    return;
  }

  // Prevent concurrent subscription attempts
  if (isSubscribing) {
    return;
  }

  isSubscribing = true;

  try {
    const { listen } = await import('@tauri-apps/api/event');

    // Only set up listener if not already set (could have been set by concurrent call)
    if (!unlistenFn) {
      unlistenFn = await listen<string>('menu-event', (event) => {
        if (currentHandler) {
          currentHandler(event.payload as MenuAction);
        }
      });
    }
  } finally {
    isSubscribing = false;
  }
}

/**
 * Unsubscribe from menu events
 */
export function unsubscribeFromMenuEvents(): void {
  currentHandler = null;
  if (unlistenFn) {
    unlistenFn();
    unlistenFn = null;
  }
}

/**
 * Update the current handler without re-subscribing
 */
export function updateMenuHandler(handler: MenuEventHandler): void {
  currentHandler = handler;
}

/**
 * Setup keyboard shortcuts for browser environment
 */
export function setupBrowserShortcuts(handler: MenuEventHandler): () => void {
  const handleKeydown = (e: KeyboardEvent) => {
    const isMod = e.metaKey || e.ctrlKey;

    if (isMod && e.key === 'n') {
      e.preventDefault();
      handler('new_window');
    } else if (isMod && e.key === 't') {
      e.preventDefault();
      handler('new_tab');
    } else if (isMod && e.key === 'o') {
      e.preventDefault();
      handler('open');
    } else if (isMod && e.key === 's') {
      e.preventDefault();
      if (e.shiftKey) {
        handler('save_as');
      } else {
        handler('save');
      }
    } else if (isMod && e.key === 'w') {
      e.preventDefault();
      handler('close_tab');
    } else if (isMod && e.key === '\\') {
      e.preventDefault();
      handler('toggle_sidebar');
    } else if (isMod && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      handler('zoom_in');
    } else if (isMod && e.key === '-') {
      e.preventDefault();
      handler('zoom_out');
    } else if (isMod && e.key === '0') {
      e.preventDefault();
      handler('zoom_reset');
    } else if (isMod && e.key === ',') {
      e.preventDefault();
      handler('preferences');
    } else if (isMod && e.key === 'k') {
      e.preventDefault();
      handler('global_search');
    } else if (isMod && e.key === 'f') {
      e.preventDefault();
      handler('find');
    } else if (isMod && e.key === 'h') {
      e.preventDefault();
      handler('find_replace');
    } else if (isMod && e.key === '/') {
      e.preventDefault();
      handler('toggle_source_mode');
    }
  };

  window.addEventListener('keydown', handleKeydown);

  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
}
