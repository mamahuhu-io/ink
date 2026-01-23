import { useState, useEffect, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { isTauri } from '../services'
import { useThemeStore, type ResolvedTheme } from '../stores/theme'

export interface ThemeInfo {
  id: string
  name: string
  isBuiltin: boolean
  path: string
}

// Style element IDs for theme CSS
const BASE_THEME_STYLE_ID = 'base-theme-css'
const CUSTOM_THEME_STYLE_ID = 'custom-theme-css'

// CSS cache to avoid re-fetching and re-processing theme CSS
// Key: themeId, Value: { raw: string, processed: string }
interface CachedCSS {
  raw: string           // Original CSS from backend
  processed: string     // Processed CSS (with increased specificity)
}
const cssCache = new Map<string, CachedCSS>()

/**
 * Detect color-scheme from CSS content.
 * Looks for `color-scheme: dark` or `color-scheme: light` in the CSS.
 * Defaults to 'dark' if not found or not 'light'.
 */
function detectColorScheme(css: string): 'light' | 'dark' {
  // Match color-scheme property value
  const match = css.match(/color-scheme\s*:\s*(light|dark)/i)
  if (match) {
    return match[1].toLowerCase() as 'light' | 'dark'
  }
  // Default to dark if not specified
  return 'dark'
}

/**
 * Process theme CSS to increase selector specificity.
 * Transforms CSS selectors so custom themes override all built-in themes.
 *
 * Handles two cases:
 * 1. `:root {` - themes from src-tauri/resources/themes/
 * 2. `:root[data-theme="..."] {` - themes copied from src/styles/themes/
 *
 * CSS specificity:
 * - Built-in themes use `:root[data-theme="light"]` = 0-2-0
 * - Custom themes use `:root:root:root` = 0-3-0 (HIGHER)
 */
function processThemeCSS(css: string): string {
  // Replace both patterns in one pass to avoid double-replacement issues
  // Pattern 1: `:root[data-theme="..."] {` - from src/styles/themes/
  // Pattern 2: `:root {` - from src-tauri/resources/themes/
  return css.replace(/:root(\[data-theme=["'][^"']*["']\])?\s*\{/g, ':root:root:root {')
}

/**
 * Hook for managing application themes
 * Supports both Tauri (with dynamic CSS loading) and web (with data-theme attribute)
 * Theme switching is handled via the application menu
 */
export function useTheme() {
  const [themes, setThemes] = useState<ThemeInfo[]>([])
  const [currentTheme, setCurrentTheme] = useState<string>('light')
  const [isLoading, setIsLoading] = useState(true)

  const { resolvedTheme, setResolvedTheme } = useThemeStore()

  // Apply theme CSS to the document
  const applyThemeCSS = useCallback(async (themeId: string) => {
    if (!isTauri()) {
      // For web, just use the built-in themes via data-theme attribute
      const resolved = themeId === 'light' ? 'light' : 'dark'
      setResolvedTheme(resolved as ResolvedTheme)
      document.documentElement.setAttribute('data-theme', themeId)
      return
    }

    try {
      console.log('[Perf] Applying theme:', themeId)
      const startTime = performance.now()

      // Get theme CSS from cache or backend
      let customCSS: string
      let cachedData = cssCache.get(themeId)

      if (cachedData) {
        console.log('[Perf] Using cached CSS for theme:', themeId)
        customCSS = cachedData.raw
      } else {
        console.log('[Perf] Fetching CSS for theme:', themeId)
        customCSS = await invoke<string>('get_theme_css', { themeId })
        // Will cache after processing
      }

      // Debug: log the original CSS
      console.log('[Theme] Loading theme:', themeId)
      console.log('[Theme] Custom CSS length:', customCSS.length)

      // Detect color-scheme from custom theme to determine base theme
      const colorScheme = detectColorScheme(customCSS)
      console.log('[Theme] Detected color-scheme:', colorScheme)

      // Update resolved theme in store based on detected color-scheme
      setResolvedTheme(colorScheme as ResolvedTheme)

      // For built-in themes (dark/light), we don't need base theme inheritance
      const isBuiltinTheme = themeId === 'dark' || themeId === 'light'

      // Step 1: Apply base theme CSS (provides missing variables)
      // Only apply base theme for custom themes, not for built-in themes
      let baseStyleEl = document.getElementById(BASE_THEME_STYLE_ID) as HTMLStyleElement | null
      if (!baseStyleEl) {
        baseStyleEl = document.createElement('style')
        baseStyleEl.id = BASE_THEME_STYLE_ID
      }

      if (!isBuiltinTheme) {
        // Get base theme CSS (dark or light) based on color-scheme
        const baseThemeId = colorScheme

        // Check cache for base theme
        let baseCSS: string
        let baseCachedData = cssCache.get(baseThemeId)

        if (baseCachedData) {
          console.log('[Perf] Using cached CSS for base theme:', baseThemeId)
          baseCSS = baseCachedData.raw
        } else {
          console.log('[Perf] Fetching CSS for base theme:', baseThemeId)
          baseCSS = await invoke<string>('get_theme_css', { themeId: baseThemeId })
        }

        console.log('[Theme] Loaded base theme:', baseThemeId, 'CSS length:', baseCSS.length)

        // Base theme uses :root:root (specificity 0-2-0)
        // This is higher than built-in :root[data-theme] (0-2-0) but equal
        // We place it before custom theme so custom wins via source order
        const processedBaseCSS = baseCSS.replace(/:root(\[data-theme=["'][^"']*["']\])?\s*\{/g, ':root:root {')
        baseStyleEl.textContent = processedBaseCSS

        // Cache base theme if not already cached
        if (!baseCachedData) {
          cssCache.set(baseThemeId, { raw: baseCSS, processed: processedBaseCSS })
        }

        // Insert base theme style element
        document.head.appendChild(baseStyleEl)
      } else {
        // Clear base theme for built-in themes
        baseStyleEl.textContent = ''
        if (baseStyleEl.parentNode) {
          baseStyleEl.parentNode.removeChild(baseStyleEl)
        }
      }

      // Step 2: Apply custom theme CSS (overrides base theme)
      let customStyleEl = document.getElementById(CUSTOM_THEME_STYLE_ID) as HTMLStyleElement | null
      if (!customStyleEl) {
        customStyleEl = document.createElement('style')
        customStyleEl.id = CUSTOM_THEME_STYLE_ID
      }

      // Custom theme uses :root:root:root (specificity 0-3-0)
      // This is higher than base theme :root:root (0-2-0)
      let processedCustomCSS: string

      if (cachedData) {
        // Use cached processed CSS
        processedCustomCSS = cachedData.processed
      } else {
        // Process and cache
        processedCustomCSS = processThemeCSS(customCSS)
        cssCache.set(themeId, { raw: customCSS, processed: processedCustomCSS })
      }

      customStyleEl.textContent = processedCustomCSS

      // Always ensure custom theme style element is at the END of head
      // This is important because Vite may inject CSS dynamically
      document.head.appendChild(customStyleEl)

      console.log('[Theme] Applied base theme + custom theme')

      // Update macOS window appearance (traffic light buttons)
      try {
        await invoke('update_window_appearance', { isDark: colorScheme === 'dark' })
        console.log('[Theme] Updated window appearance:', colorScheme)
      } catch (e) {
        // Ignore errors on non-macOS platforms
        console.log('[Theme] update_window_appearance not available (non-macOS)')
      }

      // Debug: verify the CSS variable is set
      setTimeout(() => {
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--ink-background-primary-color').trim()
        console.log('[Theme] --ink-background-primary-color:', bgColor || '(empty)')

        const toolbarShadow = getComputedStyle(document.documentElement).getPropertyValue('--ink-toolbar-shadow').trim()
        console.log('[Theme] --ink-toolbar-shadow:', toolbarShadow || '(empty - missing!)')

        // Also check body background
        const bodyBg = getComputedStyle(document.body).backgroundColor
        console.log('[Theme] body backgroundColor:', bodyBg)
      }, 100)

      // Also set data-theme for any fallback styles
      document.documentElement.setAttribute('data-theme', colorScheme)

      // Save resolvedTheme to localStorage for next startup (prevents flash)
      localStorage.setItem('resolvedTheme', colorScheme)

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        // For dark themes, use dark background color
        const isDark = colorScheme === 'dark'
        metaThemeColor.setAttribute('content', isDark ? '#141414' : '#ffffff')
      }

      // Log performance metrics
      const duration = performance.now() - startTime
      console.log(`[Perf] Theme application completed in ${duration.toFixed(2)}ms`)
    } catch (error) {
      console.error('Failed to apply theme CSS:', error)
      // Fallback to data-theme attribute
      document.documentElement.setAttribute('data-theme', themeId)
    }
  }, [setResolvedTheme])

  // Load themes and current theme on mount
  useEffect(() => {
    const loadThemes = async () => {
      if (!isTauri()) {
        // For web, use default themes
        setThemes([
          { id: 'light', name: 'Light', isBuiltin: true, path: '' },
          { id: 'dark', name: 'Dark', isBuiltin: true, path: '' },
        ])
        setCurrentTheme('light')
        document.documentElement.setAttribute('data-theme', 'light')
        setIsLoading(false)
        return
      }

      try {
        // Get available themes
        const themeList = await invoke<ThemeInfo[]>('get_themes')
        setThemes(themeList)

        // Get current theme from backend
        const current = await invoke<string>('get_current_theme')
        setCurrentTheme(current)

        // Apply the theme
        await applyThemeCSS(current)

        // Show window after theme is applied to prevent white flash
        try {
          await invoke('show_window')
        } catch (e) {
          console.log('[Theme] show_window failed (window may already be visible):', e)
        }
      } catch (error) {
        console.error('Failed to load themes:', error)
        // Fallback to light theme
        setCurrentTheme('light')
        document.documentElement.setAttribute('data-theme', 'light')
        // Still try to show window on error
        try {
          await invoke('show_window')
        } catch (e) {
          console.log('[Theme] show_window failed:', e)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadThemes()
  }, [applyThemeCSS])

  // Listen for theme changes from menu
  useEffect(() => {
    if (!isTauri()) return

    const unlisten = listen<string>('theme-changed', async (event) => {
      const themeId = event.payload
      setCurrentTheme(themeId)
      await applyThemeCSS(themeId)
    })

    return () => {
      unlisten.then(fn => fn())
    }
  }, [applyThemeCSS])

  // Listen for theme refresh events
  useEffect(() => {
    if (!isTauri()) return

    const unlisten = listen('themes-refreshed', async () => {
      try {
        // Clear CSS cache to ensure fresh CSS is loaded
        cssCache.clear()
        console.log('[Theme] CSS cache cleared on themes-refreshed event')

        const themeList = await invoke<ThemeInfo[]>('get_themes')
        setThemes(themeList)

        // Re-apply current theme to pick up any CSS changes
        await applyThemeCSS(currentTheme)
      } catch (error) {
        console.error('Failed to refresh themes:', error)
      }
    })

    return () => {
      unlisten.then(fn => fn())
    }
  }, [applyThemeCSS, currentTheme])

  // Set theme by ID (for Tauri/dynamic themes)
  const setThemeById = useCallback(async (themeId: string) => {
    if (!isTauri()) {
      setCurrentTheme(themeId)
      document.documentElement.setAttribute('data-theme', themeId)
      const resolved = themeId === 'light' ? 'light' : 'dark'
      localStorage.setItem('resolvedTheme', resolved)
      return
    }

    try {
      await invoke('set_theme', { themeId })
      // State will be updated via the theme-changed event
      // resolvedTheme will be saved in applyThemeCSS
    } catch (error) {
      console.error('Failed to set theme:', error)
    }
  }, [])

  // Toggle between light and dark
  const toggleTheme = useCallback(async () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    await setThemeById(newTheme)
  }, [currentTheme, setThemeById])

  // Refresh themes list
  const refreshThemes = useCallback(async () => {
    if (!isTauri()) return

    try {
      const themeList = await invoke<ThemeInfo[]>('refresh_themes')
      setThemes(themeList)
    } catch (error) {
      console.error('Failed to refresh themes:', error)
    }
  }, [])

  // Open themes directory
  const openThemesDirectory = useCallback(async () => {
    if (!isTauri()) return

    try {
      await invoke('open_themes_directory')
    } catch (error) {
      console.error('Failed to open themes directory:', error)
    }
  }, [])

  return {
    themes,
    currentTheme,
    isLoading,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    setThemeById,
    toggleTheme,
    refreshThemes,
    openThemesDirectory,
  }
}
