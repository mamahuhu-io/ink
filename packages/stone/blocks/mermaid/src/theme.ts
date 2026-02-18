/**
 * Mermaid Theme System
 *
 * This module provides a simplified theme configuration system that allows users
 * to configure only 5-7 core variables, while automatically deriving the full
 * 50+ themeVariables required by Mermaid.
 *
 * Core Variables:
 * - bg: Background color
 * - fg: Foreground/text color
 * - accent: Primary accent color (buttons, highlights)
 * - muted: Secondary/muted text color
 * - border: Border color
 * - surface: Surface/fill color for nodes
 * - line: Line/connector color
 *
 * The derivation ratios are inspired by beautiful-mermaid's color-mix system.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Core theme variables that users need to configure.
 * All other Mermaid themeVariables are derived from these.
 */
export interface MermaidCoreTheme {
  /** Background color */
  bg: string;
  /** Foreground/text color */
  fg: string;
  /** Primary accent color */
  accent: string;
  /** Secondary/muted text color (optional, derived from fg+bg if not set) */
  muted?: string;
  /** Border color (optional, derived from fg+bg if not set) */
  border?: string;
  /** Surface/fill color (optional, derived from fg+bg if not set) */
  surface?: string;
  /** Line/connector color (optional, derived from fg+bg if not set) */
  line?: string;
}

/**
 * Full Mermaid themeVariables type
 */
export interface MermaidThemeVariables {
  // Core
  primaryColor: string;
  primaryTextColor: string;
  primaryBorderColor: string;
  lineColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  background: string;

  // Flowchart
  mainBkg: string;
  secondBkg: string;
  nodeBorder: string;
  clusterBkg: string;
  clusterBorder: string;

  // Labels
  labelBackground: string;
  labelColor: string;
  defaultLinkColor: string;
  titleColor: string;
  edgeLabelBackground: string;

  // Sequence Diagram
  actorBorder: string;
  actorBkg: string;
  actorTextColor: string;
  actorLineColor: string;
  signalColor: string;
  signalTextColor: string;
  labelBoxBkgColor: string;
  labelBoxBorderColor: string;
  labelTextColor: string;
  loopTextColor: string;
  noteBorderColor: string;
  noteBkgColor: string;
  noteTextColor: string;
  activationBorderColor: string;
  activationBkgColor: string;
  sequenceNumberColor: string;

  // Gantt
  sectionBkgColor: string;
  altSectionBkgColor: string;
  sectionBkgColor2: string;
  excludeBkgColor: string;
  taskBorderColor: string;
  taskBkgColor: string;
  taskTextColor: string;
  taskTextLightColor: string;
  taskTextOutsideColor: string;
  taskTextClickableColor: string;
  activeTaskBorderColor: string;
  activeTaskBkgColor: string;
  gridColor: string;
  doneTaskBkgColor: string;
  doneTaskBorderColor: string;
  critBorderColor: string;
  critBkgColor: string;
  todayLineColor: string;

  // Other
  personBorder: string;
  personBkg: string;
  errorBkgColor: string;
  errorTextColor: string;
}

// ============================================================================
// Color Mixing Utilities
// ============================================================================

/**
 * Parse a hex color string to RGB components
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');

  // Handle 3-digit hex
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return null;

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Convert RGB components to hex color string
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Mix two colors together at a given ratio.
 * Simulates CSS color-mix(in srgb, color1 ratio%, color2)
 *
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @param ratio - Percentage of color1 (0-100)
 * @returns Mixed color as hex string
 */
export function mixColor(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    // Fallback to color1 if parsing fails
    return color1;
  }

  const r = ratio / 100;
  const mixedR = rgb1.r * r + rgb2.r * (1 - r);
  const mixedG = rgb1.g * r + rgb2.g * (1 - r);
  const mixedB = rgb1.b * r + rgb2.b * (1 - r);

  return rgbToHex(mixedR, mixedG, mixedB);
}

// ============================================================================
// Color Mix Ratios (inspired by beautiful-mermaid)
// ============================================================================

/**
 * Color mixing ratios for deriving theme variables from core colors.
 * These ratios determine how much of the foreground color is mixed
 * into the background color to create derived colors.
 *
 * These values are carefully tuned to match beautiful-mermaid's aesthetic:
 * - Very subtle node fills (3%) for a clean, modern look
 * - Soft borders (15%) that don't overpower the content
 * - Muted secondary text (40-60%) for visual hierarchy
 * - Gentle line colors (25%) for non-intrusive connectors
 */
export const MIX_RATIOS = {
  // Text hierarchy (matching beautiful-mermaid)
  /** Secondary text (group headers): 60% fg */
  textSecondary: 60,
  /** Muted text (edge labels): 40% fg */
  textMuted: 40,
  /** Faint text: 25% fg */
  textFaint: 25,

  // Structural elements (key to beautiful-mermaid's look)
  /** Line/connector color: 25% fg - softer than before */
  line: 25,
  /** Arrow head fill: 40% fg - visible but not harsh */
  arrow: 40,
  /** Node fill tint: 3% fg - very subtle, almost transparent */
  nodeFill: 3,
  /** Node/group stroke: 15% fg - soft, elegant borders */
  nodeStroke: 15,
  /** Group header band: 5% fg */
  groupHeader: 5,
  /** Inner divider strokes: 10% fg */
  innerStroke: 10,

  // Surfaces
  /** Surface/fill: 4% fg - slightly more visible than node fill */
  surface: 4,
  /** Secondary surface: 6% fg */
  surfaceAlt: 6,
  /** Cluster/subgraph background: 3% fg */
  cluster: 3,

  // States
  /** Exclude/disabled: 8% fg */
  exclude: 8,
  /** Done/completed: 40% fg */
  done: 40,
  /** Active/hover: 6% fg */
  active: 6,
} as const;

// ============================================================================
// Preset Themes
// ============================================================================

/**
 * Preset core themes for light and dark modes
 */
export const PRESET_THEMES: Record<'light' | 'dark', MermaidCoreTheme> = {
  light: {
    bg: '#ffffff',
    fg: '#1e2024',
    accent: '#1e96eb',
    muted: '#84818a',
    border: '#e3e2e4',
    surface: '#f4f4f5',
    line: '#84818a',
  },
  dark: {
    bg: '#1e1e20',
    fg: '#e3e2e4',
    accent: '#1e96eb',
    muted: '#84818a',
    border: '#424149',
    surface: '#2c2c2e',
    line: '#84818a',
  },
};

/**
 * Special colors that don't derive from core theme
 */
const SPECIAL_COLORS = {
  /** Note background - warm yellow for visibility */
  noteBkg: {
    light: '#fef7dd',
    dark: '#3d3d00',
  },
  /** Critical/error color */
  critical: '#ff4d4f',
};

// ============================================================================
// Theme Derivation
// ============================================================================

/**
 * Derive full Mermaid themeVariables from core theme.
 *
 * @param core - Core theme variables (5-7 values)
 * @param isDark - Whether this is a dark theme
 * @returns Full Mermaid themeVariables (50+ values)
 */
export function deriveThemeVariables(
  core: MermaidCoreTheme,
  isDark: boolean = false,
): MermaidThemeVariables {
  const { bg, fg, accent } = core;

  // Derive optional colors if not provided (using beautiful-mermaid ratios)
  const muted = core.muted || mixColor(fg, bg, MIX_RATIOS.textMuted);
  const border = core.border || mixColor(fg, bg, MIX_RATIOS.nodeStroke);
  const surface = core.surface || mixColor(fg, bg, MIX_RATIOS.surface);
  const line = core.line || mixColor(fg, bg, MIX_RATIOS.line);

  // Additional derived colors for beautiful-mermaid-like appearance
  const nodeFill = mixColor(fg, bg, MIX_RATIOS.nodeFill); // Very subtle node background
  const clusterFill = mixColor(fg, bg, MIX_RATIOS.cluster); // Subtle cluster background
  const surfaceAlt = mixColor(fg, bg, MIX_RATIOS.surfaceAlt);
  const exclude = mixColor(fg, bg, MIX_RATIOS.exclude);
  const done = mixColor(fg, bg, MIX_RATIOS.done);
  const active = mixColor(fg, bg, MIX_RATIOS.active);
  const innerStroke = mixColor(fg, bg, MIX_RATIOS.innerStroke);
  const arrow = mixColor(fg, bg, MIX_RATIOS.arrow);

  // Special colors
  const noteBkg = isDark ? SPECIAL_COLORS.noteBkg.dark : SPECIAL_COLORS.noteBkg.light;
  const critical = SPECIAL_COLORS.critical;

  return {
    // ========== Core ==========
    primaryColor: accent,
    primaryTextColor: fg,
    primaryBorderColor: border,
    lineColor: line,
    secondaryColor: surface,
    tertiaryColor: bg,
    background: bg,

    // ========== Flowchart ==========
    // Use very subtle node fill like beautiful-mermaid
    mainBkg: nodeFill,
    secondBkg: surface,
    nodeBorder: border,
    clusterBkg: clusterFill,
    clusterBorder: border,

    // ========== Labels ==========
    labelBackground: bg,
    labelColor: fg,
    defaultLinkColor: line,
    titleColor: fg,
    edgeLabelBackground: bg,

    // ========== Sequence Diagram ==========
    actorBorder: border,
    actorBkg: nodeFill, // Subtle fill like beautiful-mermaid
    actorTextColor: fg,
    actorLineColor: line,
    signalColor: arrow, // Use arrow color for signal lines
    signalTextColor: fg,
    labelBoxBkgColor: surface,
    labelBoxBorderColor: innerStroke,
    labelTextColor: fg,
    loopTextColor: muted,
    noteBorderColor: border,
    noteBkgColor: noteBkg,
    noteTextColor: fg,
    activationBorderColor: innerStroke,
    activationBkgColor: surface,
    sequenceNumberColor: isDark ? bg : '#ffffff',

    // ========== Gantt ==========
    sectionBkgColor: surface,
    altSectionBkgColor: bg,
    sectionBkgColor2: noteBkg,
    excludeBkgColor: exclude,
    taskBorderColor: border,
    taskBkgColor: accent,
    taskTextColor: fg,
    taskTextLightColor: isDark ? bg : '#ffffff',
    taskTextOutsideColor: fg,
    taskTextClickableColor: accent,
    activeTaskBorderColor: border,
    activeTaskBkgColor: active,
    gridColor: innerStroke, // Softer grid lines
    doneTaskBkgColor: done,
    doneTaskBorderColor: done,
    critBorderColor: critical,
    critBkgColor: critical,
    todayLineColor: critical,

    // ========== Other ==========
    personBorder: border,
    personBkg: nodeFill,
    errorBkgColor: critical,
    errorTextColor: isDark ? bg : '#ffffff',
  };
}

// ============================================================================
// CSS Variable Reading
// ============================================================================

/**
 * CSS variable names for core theme (new simplified system)
 */
const CORE_CSS_VARIABLES = {
  '--mermaid-bg': 'bg',
  '--mermaid-fg': 'fg',
  '--mermaid-accent': 'accent',
  '--mermaid-muted': 'muted',
  '--mermaid-border': 'border',
  '--mermaid-surface': 'surface',
  '--mermaid-line': 'line',
} as const;

/**
 * CSS variable names for detailed overrides (legacy compatibility)
 */
const DETAIL_CSS_VARIABLES: Record<string, keyof MermaidThemeVariables> = {
  '--mermaid-primary-color': 'primaryColor',
  '--mermaid-primary-text-color': 'primaryTextColor',
  '--mermaid-primary-border-color': 'primaryBorderColor',
  '--mermaid-line-color': 'lineColor',
  '--mermaid-secondary-color': 'secondaryColor',
  '--mermaid-tertiary-color': 'tertiaryColor',
  '--mermaid-background': 'background',
  '--mermaid-main-bkg': 'mainBkg',
  '--mermaid-second-bkg': 'secondBkg',
  '--mermaid-label-background': 'labelBackground',
  '--mermaid-label-color': 'labelColor',
  '--mermaid-node-border': 'nodeBorder',
  '--mermaid-cluster-bkg': 'clusterBkg',
  '--mermaid-cluster-border': 'clusterBorder',
  '--mermaid-default-link-color': 'defaultLinkColor',
  '--mermaid-title-color': 'titleColor',
  '--mermaid-edge-label-background': 'edgeLabelBackground',
  '--mermaid-actor-border': 'actorBorder',
  '--mermaid-actor-bkg': 'actorBkg',
  '--mermaid-actor-text-color': 'actorTextColor',
  '--mermaid-actor-line-color': 'actorLineColor',
  '--mermaid-signal-color': 'signalColor',
  '--mermaid-signal-text-color': 'signalTextColor',
  '--mermaid-label-box-bkg-color': 'labelBoxBkgColor',
  '--mermaid-label-box-border-color': 'labelBoxBorderColor',
  '--mermaid-label-text-color': 'labelTextColor',
  '--mermaid-loop-text-color': 'loopTextColor',
  '--mermaid-note-border-color': 'noteBorderColor',
  '--mermaid-note-bkg-color': 'noteBkgColor',
  '--mermaid-note-text-color': 'noteTextColor',
  '--mermaid-activation-border-color': 'activationBorderColor',
  '--mermaid-activation-bkg-color': 'activationBkgColor',
  '--mermaid-sequence-number-color': 'sequenceNumberColor',
  '--mermaid-section-bkg-color': 'sectionBkgColor',
  '--mermaid-alt-section-bkg-color': 'altSectionBkgColor',
  '--mermaid-section-bkg-color2': 'sectionBkgColor2',
  '--mermaid-exclude-bkg-color': 'excludeBkgColor',
  '--mermaid-task-border-color': 'taskBorderColor',
  '--mermaid-task-bkg-color': 'taskBkgColor',
  '--mermaid-task-text-color': 'taskTextColor',
  '--mermaid-task-text-light-color': 'taskTextLightColor',
  '--mermaid-task-text-outside-color': 'taskTextOutsideColor',
  '--mermaid-task-text-clickable-color': 'taskTextClickableColor',
  '--mermaid-active-task-border-color': 'activeTaskBorderColor',
  '--mermaid-active-task-bkg-color': 'activeTaskBkgColor',
  '--mermaid-grid-color': 'gridColor',
  '--mermaid-done-task-bkg-color': 'doneTaskBkgColor',
  '--mermaid-done-task-border-color': 'doneTaskBorderColor',
  '--mermaid-crit-border-color': 'critBorderColor',
  '--mermaid-crit-bkg-color': 'critBkgColor',
  '--mermaid-today-line-color': 'todayLineColor',
  '--mermaid-person-border': 'personBorder',
  '--mermaid-person-bkg': 'personBkg',
  '--mermaid-error-bkg-color': 'errorBkgColor',
  '--mermaid-error-text-color': 'errorTextColor',
};

/**
 * Read core theme variables from CSS custom properties.
 *
 * @returns Core theme if any core variables are defined, null otherwise
 */
export function readCoreThemeFromCSS(): MermaidCoreTheme | null {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  // Check if any core variables are defined
  const bg = computedStyle.getPropertyValue('--mermaid-bg').trim();
  const fg = computedStyle.getPropertyValue('--mermaid-fg').trim();

  // If neither bg nor fg is defined, no core theme is set
  if (!bg && !fg) {
    return null;
  }

  // Build core theme from CSS variables
  const core: MermaidCoreTheme = {
    bg: bg || '#ffffff',
    fg: fg || '#1e2024',
    accent: computedStyle.getPropertyValue('--mermaid-accent').trim() || '#1e96eb',
  };

  // Read optional core variables
  const muted = computedStyle.getPropertyValue('--mermaid-muted').trim();
  const border = computedStyle.getPropertyValue('--mermaid-border').trim();
  const surface = computedStyle.getPropertyValue('--mermaid-surface').trim();
  const line = computedStyle.getPropertyValue('--mermaid-line').trim();

  if (muted) core.muted = muted;
  if (border) core.border = border;
  if (surface) core.surface = surface;
  if (line) core.line = line;

  return core;
}

/**
 * Read detailed theme variable overrides from CSS custom properties.
 * These override the derived values for fine-grained control.
 *
 * @returns Object with any defined override variables
 */
export function readDetailOverridesFromCSS(): Partial<MermaidThemeVariables> {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const overrides: Partial<MermaidThemeVariables> = {};

  for (const [cssVar, themeKey] of Object.entries(DETAIL_CSS_VARIABLES)) {
    const value = computedStyle.getPropertyValue(cssVar).trim();
    if (value) {
      overrides[themeKey] = value;
    }
  }

  return overrides;
}

/**
 * Check if legacy theme system is being used (--mermaid-theme is defined)
 */
export function isLegacyThemeMode(): boolean {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  return !!computedStyle.getPropertyValue('--mermaid-theme').trim();
}

/**
 * Build complete Mermaid theme configuration.
 *
 * Priority order:
 * 1. Detail CSS variable overrides (highest)
 * 2. Derived from core CSS variables
 * 3. Preset theme based on light/dark mode (lowest)
 *
 * @param isDark - Whether to use dark mode preset as base
 * @returns Complete theme configuration for mermaid.initialize()
 */
export function buildMermaidTheme(isDark: boolean): {
  theme: string;
  themeVariables: MermaidThemeVariables;
} {
  // Start with preset theme
  const preset = isDark ? PRESET_THEMES.dark : PRESET_THEMES.light;

  // Check for core theme from CSS
  const coreFromCSS = readCoreThemeFromCSS();
  const core = coreFromCSS || preset;

  // Derive full theme variables
  const derived = deriveThemeVariables(core, isDark);

  // Apply detail overrides
  const overrides = readDetailOverridesFromCSS();
  const themeVariables = { ...derived, ...overrides };

  return {
    theme: isDark ? 'dark' : 'base',
    themeVariables,
  };
}
