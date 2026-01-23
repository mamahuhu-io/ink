// Re-export the SlashMenuEmojiPicker from the emoji inline package
// This file provides the emoji picker component for the slash menu

import { stopPropagation } from "@ink/stone-shared/utils";
import { unsafeCSSVarV2, unsafeCSSVar } from "@ink/stone-shared/theme";
import { baseTheme } from "@ink/stone-theme";
import { WithDisposable } from "@ink/stone-global/lit";
import { ShadowlessElement } from "@ink/stone-std";
import { searchEmojisByKeyword } from "@ink/stone-shared/utils";
import { css, html, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for emoji picker translations
 */
export function setSlashMenuEmojiPickerI18nGetter(
  getter: (key: string, fallback: string) => string
) {
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    return i18nGetter(key, fallback);
  }
  return fallback;
}

interface EmojiCategory {
  id: string;
  name: string;
  emojis: string[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: "smileys",
    name: "Smileys & Emotion",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😗",
      "☺️",
      "😚",
      "😙",
      "🥲",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🤧",
      "🥵",
      "🥶",
      "🥴",
      "😵",
      "🤯",
      "🤠",
      "🥳",
      "🥸",
      "😎",
      "🤓",
      "🧐",
      "😕",
      "😟",
      "🙁",
      "☹️",
      "😮",
      "😯",
      "😲",
      "😳",
      "🥺",
      "😦",
      "😧",
      "😨",
      "😰",
      "😥",
      "😢",
      "😭",
      "😱",
      "😖",
      "😣",
      "😞",
      "😓",
      "😩",
      "😫",
      "🥱",
      "😤",
      "😡",
      "😠",
      "🤬",
      "😈",
      "👿",
      "💀",
      "☠️",
      "💩",
      "🤡",
      "👹",
      "👺",
    ],
  },
  {
    id: "gestures",
    name: "People & Body",
    emojis: [
      "👋",
      "🤚",
      "🖐️",
      "✋",
      "🖖",
      "👌",
      "🤌",
      "🤏",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝️",
      "👍",
      "👎",
      "✊",
      "👊",
      "🤛",
      "🤜",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤝",
      "🙏",
      "✍️",
      "💅",
      "🤳",
      "💪",
      "🦾",
      "🦿",
      "🦵",
      "🦶",
      "👂",
      "🦻",
      "👃",
      "🧠",
      "🫀",
      "🫁",
      "🦷",
      "🦴",
      "👀",
      "👁️",
      "👅",
      "👄",
      "👶",
      "🧒",
      "👦",
      "👧",
      "🧑",
      "👱",
      "👨",
      "🧔",
      "👩",
      "🧓",
      "👴",
      "👵",
      "🙍",
      "🙎",
      "🙅",
      "🙆",
      "💁",
      "🙋",
      "🧏",
      "🙇",
      "🤦",
      "🤷",
      "👮",
      "🕵️",
      "💂",
      "🥷",
      "👷",
      "🤴",
      "👸",
    ],
  },
  {
    id: "animals",
    name: "Animals & Nature",
    emojis: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐻‍❄️",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐽",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐒",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🐣",
      "🐥",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🐗",
      "🐴",
      "🦄",
      "🐝",
      "🪱",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐜",
      "🪰",
      "🪲",
      "🪳",
      "🦟",
      "🦗",
      "🕷️",
      "🕸️",
      "🦂",
      "🐢",
      "🐍",
      "🦎",
      "🦖",
      "🦕",
      "🐙",
      "🦑",
      "🦐",
      "🦞",
      "🦀",
      "🐡",
      "🐠",
      "🐟",
      "🐬",
      "🐳",
      "🐋",
      "🦈",
      "🐊",
      "🐅",
      "🐆",
      "🦓",
      "🦍",
      "🦧",
      "🦣",
      "🐘",
      "🦛",
      "🦏",
      "🐪",
      "🐫",
      "🦒",
    ],
  },
  {
    id: "food",
    name: "Food & Drink",
    emojis: [
      "🍇",
      "🍈",
      "🍉",
      "🍊",
      "🍋",
      "🍌",
      "🍍",
      "🥭",
      "🍎",
      "🍏",
      "🍐",
      "🍑",
      "🍒",
      "🍓",
      "🫐",
      "🥝",
      "🍅",
      "🫒",
      "🥥",
      "🥑",
      "🍆",
      "🥔",
      "🥕",
      "🌽",
      "🌶️",
      "🫑",
      "🥒",
      "🥬",
      "🥦",
      "🧄",
      "🧅",
      "🍄",
      "🥜",
      "🫘",
      "🌰",
      "🍞",
      "🥐",
      "🥖",
      "🫓",
      "🥨",
      "🥯",
      "🥞",
      "🧇",
      "🧀",
      "🍖",
      "🍗",
      "🥩",
      "🥓",
      "🍔",
      "🍟",
      "🍕",
      "🌭",
      "🥪",
      "🌮",
      "🌯",
      "🫔",
      "🥙",
      "🧆",
      "🥚",
      "🍳",
      "🥘",
      "🍲",
      "🫕",
      "🥣",
      "🥗",
      "🍿",
      "🧈",
      "🧂",
      "🥫",
      "🍱",
      "🍘",
      "🍙",
      "🍚",
      "🍛",
      "🍜",
      "🍝",
      "🍠",
      "🍢",
      "🍣",
      "🍤",
    ],
  },
  {
    id: "activities",
    name: "Activities",
    emojis: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🥎",
      "🎾",
      "🏐",
      "🏉",
      "🥏",
      "🎱",
      "🪀",
      "🏓",
      "🏸",
      "🏒",
      "🏑",
      "🥍",
      "🏏",
      "🪃",
      "🥅",
      "⛳",
      "🪁",
      "🏹",
      "🎣",
      "🤿",
      "🥊",
      "🥋",
      "🎽",
      "🛹",
      "🛼",
      "🛷",
      "⛸️",
      "🥌",
      "🎿",
      "⛷️",
      "🏂",
      "🪂",
      "🏋️",
      "🤼",
      "🤸",
      "🤺",
      "⛹️",
      "🤾",
      "🏌️",
      "🏇",
      "🧘",
      "🏄",
      "🏊",
      "🤽",
      "🚣",
      "🧗",
      "🚵",
      "🚴",
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🏅",
      "🎖️",
      "🏵️",
      "🎗️",
      "🎫",
      "🎟️",
      "🎪",
      "🤹",
      "🎭",
      "🩰",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎹",
      "🥁",
      "🪘",
      "🎷",
      "🎺",
      "🪗",
      "🎸",
      "🪕",
      "🎻",
    ],
  },
  {
    id: "objects",
    name: "Objects",
    emojis: [
      "⌚",
      "📱",
      "📲",
      "💻",
      "⌨️",
      "🖥️",
      "🖨️",
      "🖱️",
      "🖲️",
      "🕹️",
      "🗜️",
      "💽",
      "💾",
      "💿",
      "📀",
      "📼",
      "📷",
      "📸",
      "📹",
      "🎥",
      "📽️",
      "🎞️",
      "📞",
      "☎️",
      "📟",
      "📠",
      "📺",
      "📻",
      "🎙️",
      "🎚️",
      "🎛️",
      "🧭",
      "⏱️",
      "⏲️",
      "⏰",
      "🕰️",
      "⌛",
      "⏳",
      "📡",
      "🔋",
      "🔌",
      "💡",
      "🔦",
      "🕯️",
      "🪔",
      "🧯",
      "🛢️",
      "💸",
      "💵",
      "💴",
      "💶",
      "💷",
      "🪙",
      "💰",
      "💳",
      "💎",
      "⚖️",
      "🪜",
      "🧰",
      "🪛",
      "🔧",
      "🔨",
      "⚒️",
      "🛠️",
      "⛏️",
      "🪚",
      "🔩",
      "⚙️",
      "🪤",
      "🧱",
      "⛓️",
      "🧲",
      "🔫",
      "💣",
      "🧨",
      "🪓",
      "🔪",
      "🗡️",
      "⚔️",
      "🛡️",
    ],
  },
  {
    id: "symbols",
    name: "Symbols",
    emojis: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "☮️",
      "✝️",
      "☪️",
      "🕉️",
      "☸️",
      "✡️",
      "🔯",
      "🕎",
      "☯️",
      "☦️",
      "🛐",
      "⛎",
      "♈",
      "♉",
      "♊",
      "♋",
      "♌",
      "♍",
      "♎",
      "♏",
      "♐",
      "♑",
      "♒",
      "♓",
      "🆔",
      "⚛️",
      "🉑",
      "☢️",
      "☣️",
      "📴",
      "📳",
      "✅",
      "❌",
      "⭕",
      "🛑",
      "⛔",
      "📛",
      "🚫",
      "💯",
      "💢",
      "♨️",
      "🔅",
      "🔆",
      "⚠️",
      "🚸",
      "🔱",
      "⚜️",
      "🔰",
      "♻️",
      "✳️",
      "❇️",
      "🔴",
      "🟠",
      "🟡",
      "🟢",
      "🔵",
      "🟣",
      "⚫",
      "⚪",
      "🟤",
      "🔺",
    ],
  },
  {
    id: "flags",
    name: "Flags",
    emojis: [
      "🏳️",
      "🏴",
      "🏴‍☠️",
      "🏁",
      "🚩",
      "🎌",
      "🏳️‍🌈",
      "🏳️‍⚧️",
      "🇺🇳",
      "🇨🇳",
      "🇺🇸",
      "🇬🇧",
      "🇯🇵",
      "🇰🇷",
      "🇫🇷",
      "🇩🇪",
      "🇮🇹",
      "🇪🇸",
      "🇷🇺",
      "🇧🇷",
      "🇮🇳",
      "🇦🇺",
      "🇨🇦",
      "🇲🇽",
    ],
  },
];

// Local storage key for recent emojis
const RECENT_EMOJIS_KEY = "ink-recent-emojis";
const MAX_RECENT_EMOJIS = 32;

function getRecentEmojis(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_EMOJIS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore errors
  }
  return [];
}

function addRecentEmoji(emoji: string): void {
  try {
    const recent = getRecentEmojis();
    const index = recent.indexOf(emoji);
    if (index > -1) {
      recent.splice(index, 1);
    }
    recent.unshift(emoji);
    if (recent.length > MAX_RECENT_EMOJIS) {
      recent.length = MAX_RECENT_EMOJIS;
    }
    localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(recent));
  } catch {
    // ignore errors
  }
}

const styles = css`
  :host {
    box-sizing: border-box;
  }

  .overlay-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--ink-z-index-popover);
  }

  .overlay-mask {
    pointer-events: auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .popover-container {
    position: absolute;
    z-index: var(--ink-z-index-popover);
    animation: ink-popover-fade-in 0.2s ease;

    background: ${unsafeCSSVarV2("layer/background/overlayPanel")};
    box-shadow: ${unsafeCSSVar("overlayPanelShadow")};
    border-radius: 8px;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
  }

  @keyframes ink-popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .emoji-picker {
    display: flex;
    flex-direction: column;
    width: 320px;
    max-height: 360px;
    box-sizing: border-box;
  }

  .emoji-search {
    padding: 8px 12px;
    border-bottom: 1px solid var(--ink-border-color, #e3e2e4);
  }

  .emoji-search input {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 6px 10px;
    border: 1px solid var(--ink-border-color, #e3e2e4);
    border-radius: 4px;
    background: transparent;
    color: var(--ink-text-primary-color);
    font-size: var(--ink-font-sm);
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .emoji-search input::placeholder {
    color: var(--ink-placeholder-color, #8e8d91);
  }

  .emoji-search input:focus {
    border-color: var(--ink-blue-700, #1e96eb);
    box-shadow: 0 0 0 2px rgba(30, 150, 235, 0.2);
  }

  .emoji-categories {
    display: flex;
    gap: 2px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--ink-border-color, #e3e2e4);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .emoji-categories::-webkit-scrollbar {
    display: none;
  }

  .category-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.15s;
    flex-shrink: 0;
  }

  .category-tab:hover {
    background: var(--ink-hover-color, rgba(0, 0, 0, 0.04));
  }

  .category-tab.active {
    background: var(--ink-hover-color-filled, rgba(0, 0, 0, 0.08));
  }

  .emoji-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .category-section {
    margin-bottom: 8px;
  }

  .category-title {
    font-size: var(--ink-font-xs);
    font-weight: 500;
    color: var(--ink-text-secondary-color, #8e8d91);
    margin-bottom: 6px;
    padding: 0 4px;
  }

  .emoji-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
  }

  .emoji-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.15s, transform 0.1s;
    user-select: none;
  }

  .emoji-item:hover {
    background: var(--ink-hover-color, rgba(0, 0, 0, 0.04));
    transform: scale(1.1);
  }

  .emoji-item:active {
    transform: scale(0.95);
  }

  .emoji-item.focused {
    background: var(--ink-blue-100, rgba(30, 150, 235, 0.1));
    outline: 2px solid var(--ink-blue-500, #1e96eb);
    outline-offset: -2px;
    transform: scale(1.1);
  }

  .no-results {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: var(--ink-text-secondary-color, #8e8d91);
    font-size: var(--ink-font-sm);
  }
`;

// Category icons for tabs
const CATEGORY_ICONS: Record<string, string> = {
  recent: "🕐",
  smileys: "😀",
  gestures: "👋",
  animals: "🐱",
  food: "🍔",
  activities: "⚽",
  objects: "💡",
  symbols: "❤️",
  flags: "🏳️",
};

export class SlashMenuEmojiPicker extends WithDisposable(ShadowlessElement) {
  static override styles = styles;

  private _bodyOverflowStyle = "";

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor position: { x: number; y: number } = { x: 0, y: 0 };

  @property({ attribute: false })
  accessor onSelect: ((emoji: string) => void) | null = null;

  @state()
  accessor _searchQuery: string = "";

  @state()
  accessor _activeCategory: string = "smileys";

  @state()
  accessor _focusedIndex: number = 0;

  @state()
  accessor _keyboardNavActive: boolean = false;

  @query(".popover-container")
  accessor popoverContainer!: HTMLDivElement;

  @query(".emoji-content")
  accessor emojiContent!: HTMLDivElement;

  @query("#emoji-search-input")
  accessor searchInput!: HTMLInputElement;

  private get _filteredCategories(): EmojiCategory[] {
    const query = this._searchQuery.toLowerCase().trim();
    if (!query) {
      const recentEmojis = getRecentEmojis();
      const categories: EmojiCategory[] = [];

      if (recentEmojis.length > 0) {
        categories.push({
          id: "recent",
          name: t("recent", "Recent"),
          emojis: recentEmojis,
        });
      }

      return [...categories, ...EMOJI_CATEGORIES];
    }

    // Search emojis by keyword
    const filteredEmojis = searchEmojisByKeyword(query);

    if (filteredEmojis.length === 0) {
      return [];
    }

    return [
      {
        id: "search-results",
        name: t("searchResults", "Search Results"),
        emojis: filteredEmojis,
      },
    ];
  }

  /**
   * Get a flat list of all emojis from filtered categories
   */
  private get _flatEmojis(): string[] {
    return this._filteredCategories.flatMap((category) => category.emojis);
  }

  /**
   * Scroll the focused emoji item into view
   */
  private _scrollToFocusedEmoji(): void {
    requestAnimationFrame(() => {
      const focusedElement = this.emojiContent?.querySelector(
        ".emoji-item.focused"
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyboardNav(e: KeyboardEvent): boolean {
    const flatEmojis = this._flatEmojis;
    if (flatEmojis.length === 0) return false;

    const cols = 8; // Grid has 8 columns
    const totalEmojis = flatEmojis.length;
    let newIndex = this._focusedIndex;
    let handled = false;

    switch (e.key) {
      case "ArrowLeft":
        if (newIndex > 0) {
          newIndex--;
          handled = true;
        }
        break;
      case "ArrowRight":
        if (newIndex < totalEmojis - 1) {
          newIndex++;
          handled = true;
        }
        break;
      case "ArrowUp":
        if (newIndex >= cols) {
          newIndex -= cols;
          handled = true;
        }
        break;
      case "ArrowDown":
        if (newIndex + cols < totalEmojis) {
          newIndex += cols;
          handled = true;
        } else if (newIndex < totalEmojis - 1) {
          // Move to last item if can't go full row down
          newIndex = totalEmojis - 1;
          handled = true;
        }
        break;
      case "Enter":
        if (this._keyboardNavActive && flatEmojis[this._focusedIndex]) {
          this._onEmojiClick(flatEmojis[this._focusedIndex]);
          handled = true;
        }
        break;
    }

    if (handled && e.key !== "Enter") {
      this._focusedIndex = newIndex;
      this._keyboardNavActive = true;
      this._scrollToFocusedEmoji();
    }

    return handled;
  }

  private readonly _onMaskClick = (e: Event) => {
    e.stopPropagation();
    this.abortController.abort();
  };

  private readonly _onSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
    // Reset focus when search changes
    this._focusedIndex = 0;
    this._keyboardNavActive = false;
  };

  private readonly _onCategoryClick = (categoryId: string) => {
    this._activeCategory = categoryId;
    this._searchQuery = "";
    // Reset focus when category changes
    this._focusedIndex = 0;
    this._keyboardNavActive = false;

    // Scroll to category
    const categorySection = this.emojiContent?.querySelector(
      `[data-category="${categoryId}"]`
    );
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  private readonly _onEmojiClick = (emoji: string) => {
    addRecentEmoji(emoji);
    if (this.onSelect) {
      this.onSelect(emoji);
    }
    this.abortController.abort();
  };

  override connectedCallback() {
    super.connectedCallback();

    // disable body scroll
    this._bodyOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    this.disposables.add({
      dispose: () => {
        document.body.style.overflow = this._bodyOverflowStyle;
      },
    });
  }

  override firstUpdated() {
    // Listen on document to catch all keyboard events
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.isComposing) return;

      // Handle Escape
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this.abortController.abort();
        return;
      }

      // Handle keyboard navigation (arrow keys and Enter)
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(
          e.key
        )
      ) {
        const handled = this._handleKeyboardNav(e);
        if (handled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("keydown", handleKeydown, true);
    this.disposables.add({
      dispose: () =>
        document.removeEventListener("keydown", handleKeydown, true),
    });

    this.disposables.addFromEvent(this, "copy", stopPropagation);
    this.disposables.addFromEvent(this, "cut", stopPropagation);
    this.disposables.addFromEvent(this, "paste", stopPropagation);

    // Position the popover
    if (this.popoverContainer) {
      // Adjust position to keep popover in viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = 320;
      const popoverHeight = 360;

      let x = this.position.x;
      let y = this.position.y;

      if (x + popoverWidth > viewportWidth - 16) {
        x = viewportWidth - popoverWidth - 16;
      }
      if (y + popoverHeight > viewportHeight - 16) {
        y = viewportHeight - popoverHeight - 16;
      }

      this.popoverContainer.style.left = `${Math.max(16, x)}px`;
      this.popoverContainer.style.top = `${Math.max(16, y)}px`;
    }

    // Focus the search input
    this.updateComplete
      .then(() => {
        this.searchInput?.focus();
      })
      .catch(() => {});
  }

  private _renderCategoryTabs() {
    const allCategoryIds = ["recent", ...EMOJI_CATEGORIES.map((c) => c.id)];
    const recentEmojis = getRecentEmojis();

    return html`
      <div class="emoji-categories">
        ${repeat(
          allCategoryIds,
          (id) => id,
          (id) => {
            // Hide recent tab if no recent emojis
            if (id === "recent" && recentEmojis.length === 0) {
              return null;
            }

            const icon = CATEGORY_ICONS[id] || "📁";
            const classes = classMap({
              "category-tab": true,
              active: this._activeCategory === id,
            });
            return html`
              <div
                class=${classes}
                @click=${() => this._onCategoryClick(id)}
                title=${EMOJI_CATEGORIES.find((c) => c.id === id)?.name ||
                t("recent", "Recent")}
              >
                ${icon}
              </div>
            `;
          }
        )}
      </div>
    `;
  }

  private _renderEmojiContent() {
    const categories = this._filteredCategories;

    if (categories.length === 0) {
      return html`
        <div class="no-results">${t("noEmojisFound", "No emojis found")}</div>
      `;
    }

    // Track global index across all categories for keyboard navigation
    let globalIndex = 0;

    return html`
      ${repeat(
        categories,
        (category) => category.id,
        (category) => {
          const categoryStartIndex = globalIndex;
          const emojiElements = category.emojis.map((emoji, localIndex) => {
            const currentGlobalIndex = categoryStartIndex + localIndex;
            const isFocused =
              this._keyboardNavActive &&
              currentGlobalIndex === this._focusedIndex;
            const classes = classMap({
              "emoji-item": true,
              focused: isFocused,
            });
            return html`
              <div
                class=${classes}
                @click=${() => this._onEmojiClick(emoji)}
                @mouseenter=${() => {
                  // Update focus on hover for visual consistency
                  this._focusedIndex = currentGlobalIndex;
                  this._keyboardNavActive = true;
                }}
              >
                ${emoji}
              </div>
            `;
          });
          globalIndex += category.emojis.length;
          return html`
            <div class="category-section" data-category=${category.id}>
              <div class="category-title">${category.name}</div>
              <div class="emoji-grid">${emojiElements}</div>
            </div>
          `;
        }
      )}
    `;
  }

  override render() {
    return html`
      <div class="overlay-root">
        <div class="overlay-mask" @click=${this._onMaskClick}></div>
        <div class="popover-container">
          <div class="emoji-picker">
            <div class="emoji-search">
              <input
                id="emoji-search-input"
                type="text"
                placeholder="${t("searchEmoji", "Search emoji...")}"
                @input=${this._onSearchInput}
                .value=${this._searchQuery}
              />
            </div>
            ${this._searchQuery ? null : this._renderCategoryTabs()}
            <div class="emoji-content">${this._renderEmojiContent()}</div>
          </div>
        </div>
      </div>
    `;
  }
}

// Register the custom element
if (!customElements.get("slash-menu-emoji-picker")) {
  customElements.define("slash-menu-emoji-picker", SlashMenuEmojiPicker);
}

declare global {
  interface HTMLElementTagNameMap {
    "slash-menu-emoji-picker": SlashMenuEmojiPicker;
  }
}
