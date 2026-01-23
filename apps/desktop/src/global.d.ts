// Global type declarations

// VirtualKeyboard API (experimental browser feature)
interface VirtualKeyboardEventMap {
  geometrychange: Event;
}

interface VirtualKeyboard extends EventTarget {
  show(): void;
  hide(): void;
  readonly boundingRect: DOMRect;
  overlaysContent: boolean;
  addEventListener<K extends keyof VirtualKeyboardEventMap>(
    type: K,
    listener: (this: VirtualKeyboard, ev: VirtualKeyboardEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof VirtualKeyboardEventMap>(
    type: K,
    listener: (this: VirtualKeyboard, ev: VirtualKeyboardEventMap[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

interface Navigator {
  virtualKeyboard?: VirtualKeyboard;
}

// Node.js globals
declare const global: typeof globalThis;
