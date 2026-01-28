/**
 * Tests for keyboard shortcut formatting utilities
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { formatShortcut, formatShortcutHint, getModifierDisplay } from '../shortcuts';

// Store original navigator.platform
const originalPlatform = Object.getOwnPropertyDescriptor(Navigator.prototype, 'platform');

function mockMacOS() {
  Object.defineProperty(Navigator.prototype, 'platform', {
    get: () => 'MacIntel',
    configurable: true,
  });
}

function mockWindows() {
  Object.defineProperty(Navigator.prototype, 'platform', {
    get: () => 'Win32',
    configurable: true,
  });
}

function mockLinux() {
  Object.defineProperty(Navigator.prototype, 'platform', {
    get: () => 'Linux x86_64',
    configurable: true,
  });
}

function restorePlatform() {
  if (originalPlatform) {
    Object.defineProperty(Navigator.prototype, 'platform', originalPlatform);
  }
}

describe('formatShortcut', () => {
  afterEach(() => {
    restorePlatform();
  });

  describe('on macOS', () => {
    beforeEach(() => {
      mockMacOS();
    });

    it('should convert Alt to ⌥', () => {
      expect(formatShortcut('Alt+C')).toBe('⌥C');
      expect(formatShortcut('Alt+R')).toBe('⌥R');
    });

    it('should convert Ctrl to ⌃', () => {
      expect(formatShortcut('Ctrl+F')).toBe('⌃F');
      expect(formatShortcut('Ctrl+H')).toBe('⌃H');
    });

    it('should convert Cmd/Command to ⌘', () => {
      expect(formatShortcut('Cmd+S')).toBe('⌘S');
      expect(formatShortcut('Command+P')).toBe('⌘P');
    });

    it('should convert Shift to ⇧', () => {
      expect(formatShortcut('Shift+F')).toBe('⇧F');
    });

    it('should handle multiple modifiers', () => {
      expect(formatShortcut('Cmd+Shift+P')).toBe('⌘⇧P');
      expect(formatShortcut('Ctrl+Alt+Delete')).toBe('⌃⌥Delete');
    });

    it('should preserve letters and keys', () => {
      expect(formatShortcut('Alt+C')).toBe('⌥C');
      expect(formatShortcut('Cmd+Enter')).toBe('⌘Enter');
    });
  });

  describe('on Windows', () => {
    beforeEach(() => {
      mockWindows();
    });

    it('should keep shortcuts unchanged', () => {
      expect(formatShortcut('Alt+C')).toBe('Alt+C');
      expect(formatShortcut('Ctrl+F')).toBe('Ctrl+F');
      expect(formatShortcut('Ctrl+Shift+P')).toBe('Ctrl+Shift+P');
    });
  });

  describe('on Linux', () => {
    beforeEach(() => {
      mockLinux();
    });

    it('should keep shortcuts unchanged', () => {
      expect(formatShortcut('Alt+C')).toBe('Alt+C');
      expect(formatShortcut('Ctrl+F')).toBe('Ctrl+F');
      expect(formatShortcut('Ctrl+Shift+P')).toBe('Ctrl+Shift+P');
    });
  });
});

describe('formatShortcutHint', () => {
  afterEach(() => {
    restorePlatform();
  });

  describe('on macOS', () => {
    beforeEach(() => {
      mockMacOS();
    });

    it('should format shortcut in parentheses', () => {
      expect(formatShortcutHint('Match Case (Alt+C)')).toBe('Match Case (⌥C)');
      expect(formatShortcutHint('Use Regular Expression (Alt+R)')).toBe(
        'Use Regular Expression (⌥R)',
      );
    });

    it('should handle text without shortcuts', () => {
      expect(formatShortcutHint('No shortcut here')).toBe('No shortcut here');
    });

    it('should handle multiple modifiers', () => {
      expect(formatShortcutHint('Command Palette (Cmd+Shift+P)')).toBe('Command Palette (⌘⇧P)');
    });
  });

  describe('on Windows/Linux', () => {
    beforeEach(() => {
      mockWindows();
    });

    it('should keep text unchanged', () => {
      expect(formatShortcutHint('Match Case (Alt+C)')).toBe('Match Case (Alt+C)');
      expect(formatShortcutHint('Use Regular Expression (Alt+R)')).toBe(
        'Use Regular Expression (Alt+R)',
      );
    });
  });
});

describe('getModifierDisplay', () => {
  afterEach(() => {
    restorePlatform();
  });

  describe('on macOS', () => {
    beforeEach(() => {
      mockMacOS();
    });

    it('should return symbols for modifier keys', () => {
      expect(getModifierDisplay('Alt')).toBe('⌥');
      expect(getModifierDisplay('Cmd')).toBe('⌘');
      expect(getModifierDisplay('Ctrl')).toBe('⌃');
      expect(getModifierDisplay('Shift')).toBe('⇧');
    });
  });

  describe('on Windows/Linux', () => {
    beforeEach(() => {
      mockWindows();
    });

    it('should return text labels for modifier keys', () => {
      expect(getModifierDisplay('Alt')).toBe('Alt');
      expect(getModifierDisplay('Ctrl')).toBe('Ctrl');
      expect(getModifierDisplay('Shift')).toBe('Shift');
    });
  });
});
