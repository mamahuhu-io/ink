import type { Container } from '@ink/stone-global/di';
import { createIdentifier } from '@ink/stone-global/di';
import { type BlockStdScope, StdIdentifier } from '@ink/stone-std';
import { Extension } from '@ink/stone-store';
import mermaid from 'mermaid';

export const MermaidBlockServiceIdentifier = createIdentifier<MermaidBlockService>(
  'MermaidBlockService'
);

export class MermaidBlockService extends Extension {
  private _initialized = false;
  private _renderCount = 0;

  constructor(private readonly std: BlockStdScope) {
    super();
  }

  static override setup(di: Container) {
    di.addImpl(MermaidBlockServiceIdentifier, this, [StdIdentifier]);
  }

  /**
   * Initialize Mermaid with theme configuration
   */
  async initialize(): Promise<void> {
    if (this._initialized) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#1e96eb',
        primaryTextColor: '#1e2024',
        primaryBorderColor: '#e3e2e4',
        lineColor: '#84818a',
        secondaryColor: '#f4f4f5',
        tertiaryColor: '#fafafa',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#f4f4f5',
        labelBackground: '#ffffff',
        labelColor: '#1e2024',
        nodeBorder: '#e3e2e4',
        clusterBkg: '#f4f4f5',
        clusterBorder: '#e3e2e4',
        defaultLinkColor: '#84818a',
        titleColor: '#1e2024',
        edgeLabelBackground: '#ffffff',
        actorBorder: '#e3e2e4',
        actorBkg: '#ffffff',
        actorTextColor: '#1e2024',
        actorLineColor: '#84818a',
        signalColor: '#1e2024',
        signalTextColor: '#1e2024',
        labelBoxBkgColor: '#f4f4f5',
        labelBoxBorderColor: '#e3e2e4',
        labelTextColor: '#1e2024',
        loopTextColor: '#1e2024',
        noteBorderColor: '#e3e2e4',
        noteBkgColor: '#fef7dd',
        noteTextColor: '#1e2024',
        activationBorderColor: '#e3e2e4',
        activationBkgColor: '#f4f4f5',
        sequenceNumberColor: '#ffffff',
        sectionBkgColor: '#f4f4f5',
        altSectionBkgColor: '#ffffff',
        sectionBkgColor2: '#fef7dd',
        excludeBkgColor: '#eeeeee',
        taskBorderColor: '#e3e2e4',
        taskBkgColor: '#1e96eb',
        taskTextColor: '#1e2024',
        taskTextLightColor: '#ffffff',
        taskTextOutsideColor: '#1e2024',
        taskTextClickableColor: '#1e96eb',
        activeTaskBorderColor: '#e3e2e4',
        activeTaskBkgColor: '#f4f4f5',
        gridColor: '#e3e2e4',
        doneTaskBkgColor: '#84818a',
        doneTaskBorderColor: '#84818a',
        critBorderColor: '#ff4d4f',
        critBkgColor: '#ff4d4f',
        todayLineColor: '#ff4d4f',
        personBorder: '#e3e2e4',
        personBkg: '#ffffff',
        labelColor: '#1e2024',
        errorBkgColor: '#ff4d4f',
        errorTextColor: '#ffffff',
      },
      securityLevel: 'strict',
      fontFamily: 'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      fontSize: 14,
    });

    this._initialized = true;
  }

  /**
   * Render Mermaid diagram to SVG
   */
  async render(code: string, theme: 'auto' | 'light' | 'dark' = 'auto'): Promise<string> {
    await this.initialize();

    if (!code.trim()) {
      throw new Error('Empty diagram code');
    }

    try {
      // Update theme if needed
      this._updateTheme(theme);

      // Generate unique ID for this render
      const id = `mermaid-${Date.now()}-${this._renderCount++}`;

      // Render the diagram
      const { svg } = await mermaid.render(id, code);

      return svg;
    } catch (error) {
      console.error('Mermaid render error:', error);
      throw error;
    }
  }

  /**
   * Detect diagram type from code
   */
  detectDiagramType(code: string): string | null {
    if (!code.trim()) return null;

    const firstLine = code.trim().split('\n')[0].trim().toLowerCase();

    // Map of diagram type keywords to display names
    const typeMap: Record<string, string> = {
      'flowchart': 'Flowchart',
      'graph': 'Flowchart',
      'sequencediagram': 'Sequence',
      'classdiagram': 'Class',
      'statediagram': 'State',
      'statediagram-v2': 'State',
      'erdiagram': 'ER',
      'journey': 'Journey',
      'gantt': 'Gantt',
      'pie': 'Pie',
      'quadrantchart': 'Quadrant',
      'requirementdiagram': 'Requirement',
      'gitgraph': 'Git',
      'mindmap': 'Mindmap',
      'timeline': 'Timeline',
      'c4context': 'C4',
      'c4container': 'C4',
      'c4component': 'C4',
      'c4dynamic': 'C4',
      'c4deployment': 'C4',
      'sankey': 'Sankey',
      'xychart': 'XY Chart',
      'block-beta': 'Block',
      'packet-beta': 'Packet',
      'architecture-beta': 'Architecture',
    };

    for (const [keyword, displayName] of Object.entries(typeMap)) {
      if (firstLine.startsWith(keyword)) {
        return displayName;
      }
    }

    return 'Diagram';
  }

  /**
   * Get Mermaid theme configuration from CSS variables
   */
  private _getMermaidThemeFromCSS(): { theme: string; themeVariables: Record<string, string> } | null {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    // Check if Mermaid theme variables are defined
    const themeType = computedStyle.getPropertyValue('--mermaid-theme').trim();
    if (!themeType) {
      return null; // Not defined, use default configuration
    }

    // Read all Mermaid variables
    const themeVariables: Record<string, string> = {};

    // Variable mapping (CSS variable name -> Mermaid themeVariables key)
    const variableMap: Record<string, string> = {
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

    // Read all defined variables
    for (const [cssVar, themeKey] of Object.entries(variableMap)) {
      const value = computedStyle.getPropertyValue(cssVar).trim();
      if (value) {
        themeVariables[themeKey] = value;
      }
    }

    return {
      theme: themeType,
      themeVariables,
    };
  }

  /**
   * Update Mermaid theme based on editor theme
   */
  private _updateTheme(theme: 'auto' | 'light' | 'dark'): void {
    let actualTheme = theme;

    if (theme === 'auto') {
      // Detect system theme
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = isDark ? 'dark' : 'light';
    }

    // Try to get custom theme from CSS variables
    const customTheme = this._getMermaidThemeFromCSS();

    if (customTheme) {
      // Use custom Mermaid theme from CSS
      mermaid.initialize({
        ...customTheme,
        securityLevel: 'strict',
        fontFamily: 'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        fontSize: 14,
      });
    } else {
      // Use default light/dark theme
      if (actualTheme === 'dark') {
        mermaid.initialize({
          theme: 'dark',
          themeVariables: {
            primaryColor: '#1e96eb',
            primaryTextColor: '#e3e2e4',
            primaryBorderColor: '#424149',
            lineColor: '#84818a',
            secondaryColor: '#2c2c2e',
            tertiaryColor: '#1e1e20',
            background: '#1e1e20',
            mainBkg: '#1e1e20',
            secondBkg: '#2c2c2e',
            labelBackground: '#1e1e20',
            labelColor: '#e3e2e4',
            nodeBorder: '#424149',
            clusterBkg: '#2c2c2e',
            clusterBorder: '#424149',
            defaultLinkColor: '#84818a',
            titleColor: '#e3e2e4',
            edgeLabelBackground: '#1e1e20',
            actorBorder: '#424149',
            actorBkg: '#1e1e20',
            actorTextColor: '#e3e2e4',
            actorLineColor: '#84818a',
            signalColor: '#e3e2e4',
            signalTextColor: '#e3e2e4',
            labelBoxBkgColor: '#2c2c2e',
            labelBoxBorderColor: '#424149',
            labelTextColor: '#e3e2e4',
            loopTextColor: '#e3e2e4',
            noteBorderColor: '#424149',
            noteBkgColor: '#3d3d00',
            noteTextColor: '#e3e2e4',
            activationBorderColor: '#424149',
            activationBkgColor: '#2c2c2e',
            sequenceNumberColor: '#1e1e20',
            sectionBkgColor: '#2c2c2e',
            altSectionBkgColor: '#1e1e20',
            sectionBkgColor2: '#3d3d00',
            excludeBkgColor: '#424149',
            taskBorderColor: '#424149',
            taskBkgColor: '#1e96eb',
            taskTextColor: '#e3e2e4',
            taskTextLightColor: '#1e1e20',
            taskTextOutsideColor: '#e3e2e4',
            taskTextClickableColor: '#1e96eb',
            activeTaskBorderColor: '#424149',
            activeTaskBkgColor: '#2c2c2e',
            gridColor: '#424149',
            doneTaskBkgColor: '#84818a',
            doneTaskBorderColor: '#84818a',
            critBorderColor: '#ff4d4f',
            critBkgColor: '#ff4d4f',
            todayLineColor: '#ff4d4f',
            personBorder: '#424149',
            personBkg: '#1e1e20',
            labelColor: '#e3e2e4',
            errorBkgColor: '#ff4d4f',
            errorTextColor: '#1e1e20',
          },
          securityLevel: 'strict',
          fontFamily: 'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
          fontSize: 14,
        });
      } else {
        // Light theme (use initialize() default configuration)
        mermaid.initialize({
          theme: 'base',
          themeVariables: {
            primaryColor: '#1e96eb',
            primaryTextColor: '#1e2024',
            primaryBorderColor: '#e3e2e4',
            lineColor: '#84818a',
            secondaryColor: '#f4f4f5',
            tertiaryColor: '#fafafa',
            background: '#ffffff',
            mainBkg: '#ffffff',
            secondBkg: '#f4f4f5',
            labelBackground: '#ffffff',
            labelColor: '#1e2024',
            nodeBorder: '#e3e2e4',
            clusterBkg: '#f4f4f5',
            clusterBorder: '#e3e2e4',
            defaultLinkColor: '#84818a',
            titleColor: '#1e2024',
            edgeLabelBackground: '#ffffff',
            actorBorder: '#e3e2e4',
            actorBkg: '#ffffff',
            actorTextColor: '#1e2024',
            actorLineColor: '#84818a',
            signalColor: '#1e2024',
            signalTextColor: '#1e2024',
            labelBoxBkgColor: '#f4f4f5',
            labelBoxBorderColor: '#e3e2e4',
            labelTextColor: '#1e2024',
            loopTextColor: '#1e2024',
            noteBorderColor: '#e3e2e4',
            noteBkgColor: '#fef7dd',
            noteTextColor: '#1e2024',
            activationBorderColor: '#e3e2e4',
            activationBkgColor: '#f4f4f5',
            sequenceNumberColor: '#ffffff',
            sectionBkgColor: '#f4f4f5',
            altSectionBkgColor: '#ffffff',
            sectionBkgColor2: '#fef7dd',
            excludeBkgColor: '#eeeeee',
            taskBorderColor: '#e3e2e4',
            taskBkgColor: '#1e96eb',
            taskTextColor: '#1e2024',
            taskTextLightColor: '#ffffff',
            taskTextOutsideColor: '#1e2024',
            taskTextClickableColor: '#1e96eb',
            activeTaskBorderColor: '#e3e2e4',
            activeTaskBkgColor: '#f4f4f5',
            gridColor: '#e3e2e4',
            doneTaskBkgColor: '#84818a',
            doneTaskBorderColor: '#84818a',
            critBorderColor: '#ff4d4f',
            critBkgColor: '#ff4d4f',
            todayLineColor: '#ff4d4f',
            personBorder: '#e3e2e4',
            personBkg: '#ffffff',
            labelColor: '#1e2024',
            errorBkgColor: '#ff4d4f',
            errorTextColor: '#ffffff',
          },
          securityLevel: 'strict',
          fontFamily: 'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
          fontSize: 14,
        });
      }
    }
  }
}
