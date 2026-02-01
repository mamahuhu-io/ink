/**
 * Editor mode store - manages the editor view mode (preview/source)
 * and source mode content for proper save handling
 */
import { create } from 'zustand';

import { normalizeMarkdown } from './editor';

export type EditorViewMode = 'preview' | 'source';

interface SourceContent {
  current: string; // Current edited content
  original: string; // Original content when entering source mode
}

interface EditorModeState {
  // Current view mode for each document (keyed by docId)
  modes: Record<string, EditorViewMode>;

  // Source content for each document (keyed by docId)
  sourceContents: Record<string, SourceContent>;

  // Get mode for a specific document
  getMode: (docId: string) => EditorViewMode;

  // Set mode for a specific document
  setMode: (docId: string, mode: EditorViewMode) => void;

  // Toggle mode for a specific document
  toggleMode: (docId: string) => EditorViewMode;

  // Clear mode for a document (when closed)
  clearMode: (docId: string) => void;

  // Set source content when entering source mode
  setSourceContent: (docId: string, content: string, isOriginal?: boolean) => void;

  // Get source content for a document
  getSourceContent: (docId: string) => SourceContent | undefined;

  // Mark source content as saved (update original to match current)
  markSourceContentSaved: (docId: string) => void;

  // Check if source content has changed
  hasSourceContentChanged: (docId: string) => boolean;

  // Clear source content for a document
  clearSourceContent: (docId: string) => void;
}

export const useEditorModeStore = create<EditorModeState>((set, get) => ({
  modes: {},
  sourceContents: {},

  getMode: (docId: string) => {
    return get().modes[docId] ?? 'preview';
  },

  setMode: (docId: string, mode: EditorViewMode) => {
    set((state) => ({
      modes: {
        ...state.modes,
        [docId]: mode,
      },
    }));
  },

  toggleMode: (docId: string) => {
    const currentMode = get().getMode(docId);
    const newMode: EditorViewMode = currentMode === 'preview' ? 'source' : 'preview';
    get().setMode(docId, newMode);
    return newMode;
  },

  clearMode: (docId: string) => {
    set((state) => {
      const { [docId]: _, ...rest } = state.modes;
      return { modes: rest };
    });
  },

  setSourceContent: (docId: string, content: string, isOriginal = false) => {
    set((state) => {
      const existing = state.sourceContents[docId];
      return {
        sourceContents: {
          ...state.sourceContents,
          [docId]: {
            current: content,
            original: isOriginal ? content : (existing?.original ?? content),
          },
        },
      };
    });
  },

  getSourceContent: (docId: string) => {
    return get().sourceContents[docId];
  },

  markSourceContentSaved: (docId: string) => {
    set((state) => {
      const existing = state.sourceContents[docId];
      if (!existing) return state;
      return {
        sourceContents: {
          ...state.sourceContents,
          [docId]: {
            ...existing,
            original: existing.current, // Original now matches current
          },
        },
      };
    });
  },

  hasSourceContentChanged: (docId: string) => {
    const content = get().sourceContents[docId];
    if (!content) return false;

    // Normalize both contents before comparison to reduce false positives
    const normalizedOriginal = normalizeMarkdown(content.original);
    const normalizedCurrent = normalizeMarkdown(content.current);
    return normalizedCurrent !== normalizedOriginal;
  },

  clearSourceContent: (docId: string) => {
    set((state) => {
      const { [docId]: _, ...rest } = state.sourceContents;
      return { sourceContents: rest };
    });
  },
}));
