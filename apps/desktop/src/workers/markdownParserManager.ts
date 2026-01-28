/**
 * Markdown Parser Worker Manager
 * Manages the Web Worker for parsing markdown content
 */

import type { BlockDef, ParseMarkdownMessage, ParseMarkdownResult } from './markdownParser.worker';

// Re-export BlockDef type for use in other modules
export type { BlockDef };

let worker: Worker | null = null;
let requestId = 0;
const pendingRequests = new Map<
  string,
  {
    resolve: (blockDefs: BlockDef[]) => void;
    reject: (error: Error) => void;
  }
>();

/**
 * Get or create the markdown parser worker
 */
function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./markdownParser.worker.ts', import.meta.url), { type: 'module' });

    worker.onmessage = (event: MessageEvent<ParseMarkdownResult>) => {
      const { type, id, blockDefs } = event.data;

      if (type === 'result') {
        const pending = pendingRequests.get(id);
        if (pending) {
          pending.resolve(blockDefs);
          pendingRequests.delete(id);
        }
      }
    };

    worker.onerror = (error) => {
      console.error('Markdown parser worker error:', error);
      // Reject all pending requests
      for (const [id, pending] of pendingRequests) {
        pending.reject(new Error('Worker error'));
        pendingRequests.delete(id);
      }
    };
  }

  return worker;
}

/**
 * Parse markdown content using Web Worker
 * Falls back to synchronous parsing if Worker is not available
 */
export async function parseMarkdownInWorker(markdown: string): Promise<BlockDef[]> {
  return new Promise((resolve, reject) => {
    try {
      const w = getWorker();
      const id = `parse-${++requestId}`;

      pendingRequests.set(id, { resolve, reject });

      const message: ParseMarkdownMessage = {
        type: 'parse',
        id,
        markdown,
      };

      w.postMessage(message);

      // Timeout after 30 seconds
      setTimeout(() => {
        if (pendingRequests.has(id)) {
          pendingRequests.delete(id);
          reject(new Error('Worker timeout'));
        }
      }, 30000);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Terminate the worker (call when no longer needed)
 */
export function terminateMarkdownWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
    pendingRequests.clear();
  }
}
