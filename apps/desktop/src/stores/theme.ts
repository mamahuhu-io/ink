import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ResolvedTheme = 'light' | 'dark';

// Custom theme interface for future extensibility
export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    // Primary colors
    brandColor: string;
    primaryColor: string;
    secondaryColor: string;

    // Background colors
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    backgroundCodeBlock: string;
    backgroundOverlay: string;
    hoverColor: string;
    hoverColorFilled: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textEmphasis: string;
    textDisable: string;
    linkColor: string;
    placeholderColor: string;
    quoteColor: string;
    iconColor: string;

    // Border & divider
    borderColor: string;
    dividerColor: string;
  };
}

interface ThemeState {
  // Resolved theme (what's actually applied: light or dark)
  resolvedTheme: ResolvedTheme;
  // Custom themes registry (for future use)
  customThemes: CustomTheme[];
  // Active custom theme ID (null means using built-in themes)
  activeCustomThemeId: string | null;

  // Actions
  setResolvedTheme: (theme: ResolvedTheme) => void;
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (id: string) => void;
  setActiveCustomTheme: (id: string | null) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      resolvedTheme: 'light',
      customThemes: [],
      activeCustomThemeId: null,

      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
      addCustomTheme: (theme) =>
        set((state) => ({
          customThemes: [...state.customThemes, theme],
        })),
      removeCustomTheme: (id) =>
        set((state) => ({
          customThemes: state.customThemes.filter((t) => t.id !== id),
          activeCustomThemeId: state.activeCustomThemeId === id ? null : state.activeCustomThemeId,
        })),
      setActiveCustomTheme: (id) => set({ activeCustomThemeId: id }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        customThemes: state.customThemes,
        activeCustomThemeId: state.activeCustomThemeId,
      }),
    },
  ),
);
