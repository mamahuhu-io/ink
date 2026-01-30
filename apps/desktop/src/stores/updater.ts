import type { Update } from '@tauri-apps/plugin-updater';
import { create } from 'zustand';

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'ready' | 'error';

interface UpdaterState {
  status: UpdateStatus;
  updateInfo: Update | null;
  error: string | null;
  // Download progress tracking
  downloadProgress: number;
  downloadTotal: number | null;

  // Computed helpers
  isChecking: boolean;
  isDownloading: boolean;
  isAvailable: boolean;
  isReady: boolean;
  downloadPercent: number;

  // Actions
  setStatus: (status: UpdateStatus) => void;
  setUpdateInfo: (info: Update | null) => void;
  setError: (error: string | null) => void;
  setDownloadTotal: (total: number | null) => void;
  addDownloadProgress: (bytes: number) => void;
  reset: () => void;
}

export const useUpdaterStore = create<UpdaterState>((set, get) => ({
  status: 'idle',
  updateInfo: null,
  error: null,
  downloadProgress: 0,
  downloadTotal: null,
  downloadPercent: 0,

  get isChecking() {
    return get().status === 'checking';
  },
  get isDownloading() {
    return get().status === 'downloading';
  },
  get isAvailable() {
    return get().status === 'available';
  },
  get isReady() {
    return get().status === 'ready';
  },

  setStatus: (status) => set({ status }),
  setUpdateInfo: (updateInfo) => set({ updateInfo }),
  setError: (error) => set({ error, status: 'error' }),
  setDownloadTotal: (downloadTotal) =>
    set({ downloadTotal, downloadProgress: 0, downloadPercent: 0 }),
  addDownloadProgress: (bytes) =>
    set((state) => {
      const newProgress = state.downloadProgress + bytes;
      const percent =
        state.downloadTotal && state.downloadTotal > 0
          ? Math.min(100, Math.round((newProgress / state.downloadTotal) * 100))
          : 0;
      return { downloadProgress: newProgress, downloadPercent: percent };
    }),
  reset: () =>
    set({
      status: 'idle',
      updateInfo: null,
      error: null,
      downloadProgress: 0,
      downloadTotal: null,
      downloadPercent: 0,
    }),
}));
