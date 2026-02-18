import type { Container } from '@ink/stone-global/di';
import { createIdentifier } from '@ink/stone-global/di';
import { type BlockStdScope, StdIdentifier } from '@ink/stone-std';
import { Extension } from '@ink/stone-store';
import mermaid from 'mermaid';

import { buildMermaidTheme } from './theme.js';

export const MermaidBlockServiceIdentifier =
  createIdentifier<MermaidBlockService>('MermaidBlockService');

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

    // Build theme from core variables (with automatic derivation)
    const { theme, themeVariables } = buildMermaidTheme(false);

    mermaid.initialize({
      startOnLoad: false,
      theme,
      themeVariables,
      securityLevel: 'strict',
      fontFamily:
        'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
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

      // Apply post-processing to enhance visual appearance
      return this._enhanceSvg(svg);
    } catch (error) {
      console.error('Mermaid render error:', error);
      throw error;
    }
  }

  /**
   * Post-process SVG to enhance visual appearance.
   * Inspired by beautiful-mermaid's refined aesthetics.
   *
   * NOTE: We avoid modifying text properties (font-weight, font-size) as
   * mermaid calculates node sizes based on the original text metrics.
   * Changing these would cause text overflow issues.
   */
  private _enhanceSvg(svg: string): string {
    // Create a temporary container to parse and modify the SVG
    const container = document.createElement('div');
    container.innerHTML = svg;
    const svgElement = container.querySelector('svg');

    if (!svgElement) return svg;

    // 1. Soften stroke widths for a more elegant look
    // beautiful-mermaid uses 0.75px for connectors, 1px for outer boxes
    svgElement.querySelectorAll('path, line, polyline').forEach((el) => {
      const currentWidth = el.getAttribute('stroke-width');
      if (currentWidth) {
        const width = parseFloat(currentWidth);
        // Reduce thick strokes, keep thin ones
        if (width >= 2) {
          el.setAttribute('stroke-width', '1.5');
        } else if (width > 1) {
          el.setAttribute('stroke-width', '1');
        }
      }
    });

    // 2. Add subtle rounded corners to rectangles (flowchart nodes)
    // Only target specific node classes to avoid breaking other elements
    svgElement.querySelectorAll('.node rect, .actor').forEach((el) => {
      const rx = el.getAttribute('rx');
      // Only add if no rx is set or rx is 0
      if (!rx || rx === '0') {
        el.setAttribute('rx', '4');
        el.setAttribute('ry', '4');
      }
    });

    // 3. Soften marker (arrow) sizes for a more refined look
    svgElement.querySelectorAll('marker').forEach((marker) => {
      const markerWidth = marker.getAttribute('markerWidth');
      const markerHeight = marker.getAttribute('markerHeight');
      if (markerWidth && parseFloat(markerWidth) > 10) {
        marker.setAttribute('markerWidth', '8');
      }
      if (markerHeight && parseFloat(markerHeight) > 8) {
        marker.setAttribute('markerHeight', '6');
      }
    });

    // 4. Add subtle opacity to cluster/subgraph backgrounds
    svgElement.querySelectorAll('.cluster rect').forEach((el) => {
      const currentOpacity = el.getAttribute('fill-opacity');
      if (!currentOpacity) {
        el.setAttribute('fill-opacity', '0.6');
      }
    });

    return container.innerHTML;
  }

  /**
   * Detect diagram type from code
   */
  detectDiagramType(code: string): string | null {
    if (!code.trim()) return null;

    const firstLine = code.trim().split('\n')[0].trim().toLowerCase();

    // Map of diagram type keywords to display names
    const typeMap: Record<string, string> = {
      flowchart: 'Flowchart',
      graph: 'Flowchart',
      sequencediagram: 'Sequence',
      classdiagram: 'Class',
      statediagram: 'State',
      'statediagram-v2': 'State',
      erdiagram: 'ER',
      journey: 'Journey',
      gantt: 'Gantt',
      pie: 'Pie',
      quadrantchart: 'Quadrant',
      requirementdiagram: 'Requirement',
      gitgraph: 'Git',
      mindmap: 'Mindmap',
      timeline: 'Timeline',
      c4context: 'C4',
      c4container: 'C4',
      c4component: 'C4',
      c4dynamic: 'C4',
      c4deployment: 'C4',
      sankey: 'Sankey',
      xychart: 'XY Chart',
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
   * Update Mermaid theme based on editor theme.
   * Uses the new simplified theme system with automatic derivation.
   */
  private _updateTheme(theme: 'auto' | 'light' | 'dark'): void {
    let isDark = theme === 'dark';

    if (theme === 'auto') {
      // Detect system theme
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Build theme using the new system (core variables + derivation + overrides)
    const { theme: mermaidTheme, themeVariables } = buildMermaidTheme(isDark);

    mermaid.initialize({
      theme: mermaidTheme,
      themeVariables,
      securityLevel: 'strict',
      fontFamily:
        'var(--ink-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      fontSize: 14,
    });
  }
}
