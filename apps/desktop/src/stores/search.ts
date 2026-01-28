import { create } from 'zustand';

import { searchFiles, SearchResult } from '../services/search';
import { useFileTreeStore } from './fileTree';

interface SearchStore {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  selectedIndex: number;

  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  selectNext: () => void;
  selectPrev: () => void;
  getSelectedResult: () => SearchResult | null;
  reset: () => void;
}

export const useSearchStore = create<SearchStore>()((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  selectedIndex: 0,

  setQuery: (query: string) => {
    set({ query });
  },

  search: async (query: string) => {
    try {
      const { rootPath } = useFileTreeStore.getState();

      if (!rootPath || !query.trim()) {
        set({ results: [], isSearching: false, selectedIndex: 0 });
        return;
      }

      set({ isSearching: true });

      const results = await searchFiles(rootPath, query);
      set({ results: results || [], selectedIndex: 0 });
    } catch (error) {
      console.error('Search error:', error);
      set({ results: [] });
    } finally {
      set({ isSearching: false });
    }
  },

  selectNext: () => {
    const { results, selectedIndex } = get();
    if (results.length === 0) return;

    const nextIndex = (selectedIndex + 1) % results.length;
    set({ selectedIndex: nextIndex });
  },

  selectPrev: () => {
    const { results, selectedIndex } = get();
    if (results.length === 0) return;

    const prevIndex = selectedIndex === 0 ? results.length - 1 : selectedIndex - 1;
    set({ selectedIndex: prevIndex });
  },

  getSelectedResult: () => {
    const { results, selectedIndex } = get();
    return results[selectedIndex] || null;
  },

  reset: () => {
    set({
      query: '',
      results: [],
      isSearching: false,
      selectedIndex: 0,
    });
  },
}));
