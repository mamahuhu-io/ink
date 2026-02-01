/**
 * Spell checking service using system APIs
 * - macOS: NSSpellChecker
 * - Windows: ISpellChecker
 * - Linux: Not supported
 */

import { invoke } from '@tauri-apps/api/core';

import { isTauri } from './index';

export interface SpellingError {
  start: number;
  length: number;
  word: string;
  suggestions: string[];
}

let availabilityCache: boolean | null = null;

/**
 * Check if spell checking is available on this platform
 */
export async function isSpellCheckAvailable(): Promise<boolean> {
  if (!isTauri()) {
    return false;
  }

  if (availabilityCache !== null) {
    return availabilityCache;
  }

  try {
    availabilityCache = await invoke<boolean>('spellcheck_available');
    return availabilityCache;
  } catch (e) {
    console.error('[SpellCheck] Failed to check availability:', e);
    availabilityCache = false;
    return false;
  }
}

/**
 * Check spelling of the given text
 */
export async function checkSpelling(text: string): Promise<SpellingError[]> {
  if (!isTauri()) {
    return [];
  }

  try {
    return await invoke<SpellingError[]>('check_spelling', { text });
  } catch (e) {
    console.error('[SpellCheck] Failed to check spelling:', e);
    return [];
  }
}

/**
 * Get available languages for spell checking
 */
export async function getSpellLanguages(): Promise<string[]> {
  if (!isTauri()) {
    return [];
  }

  try {
    return await invoke<string[]>('get_spell_languages');
  } catch (e) {
    console.error('[SpellCheck] Failed to get languages:', e);
    return [];
  }
}

/**
 * Add a word to the user's dictionary
 */
export async function learnWord(word: string): Promise<void> {
  if (!isTauri()) {
    return;
  }

  try {
    await invoke('learn_spelling', { word });
  } catch (e) {
    console.error('[SpellCheck] Failed to learn word:', e);
  }
}

/**
 * Remove a word from the user's dictionary
 */
export async function unlearnWord(word: string): Promise<void> {
  if (!isTauri()) {
    return;
  }

  try {
    await invoke('unlearn_spelling', { word });
  } catch (e) {
    console.error('[SpellCheck] Failed to unlearn word:', e);
  }
}

/**
 * Ignore a word for this session
 */
export async function ignoreWord(word: string): Promise<void> {
  if (!isTauri()) {
    return;
  }

  try {
    await invoke('ignore_spelling', { word });
  } catch (e) {
    console.error('[SpellCheck] Failed to ignore word:', e);
  }
}
