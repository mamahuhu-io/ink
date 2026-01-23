import type { ExtensionType } from '@ink/stone-store';

import {
  type IconData,
  IconPickerServiceIdentifier,
  type IconPickerService,
  IconType,
} from './index.js';
import type { UniComponent } from '../../types/uni-component.js';
import { searchEmojisByKeyword } from '../../utils/emoji-search.js';

export interface EmojiIconPickerProps {
  onSelect?: (iconData?: IconData) => void;
  onClose?: () => void;
}

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for icon picker translations
 */
export function setIconPickerI18nGetter(
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
    id: 'smileys',
    name: 'Smileys & Emotion',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚',
      '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
      '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄',
      '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
      '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳',
      '🥸', '😎', '🤓', '🧐',
    ],
  },
  {
    id: 'gestures',
    name: 'People & Body',
    emojis: [
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞',
      '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍',
      '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
      '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂',
    ],
  },
  {
    id: 'animals',
    name: 'Animals & Nature',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨',
      '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊',
      '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉',
      '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌',
    ],
  },
  {
    id: 'food',
    name: 'Food & Drink',
    emojis: [
      '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏',
      '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🥑',
      '🍆', '🥔', '🥕', '🌽', '🌶️', '🫑', '🥒', '🥬', '🥦', '🧄',
      '🧅', '🍄', '🥜', '🫘', '🌰', '🍞', '🥐', '🥖', '🫓', '🥨',
    ],
  },
  {
    id: 'objects',
    name: 'Objects',
    emojis: [
      '💡', '🔦', '🕯️', '📱', '💻', '⌨️', '🖥️', '🖨️', '📷', '📸',
      '📹', '🎥', '📞', '☎️', '📺', '📻', '🎙️', '⏰', '⏱️', '⏲️',
      '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💰', '💳', '💎', '⚖️',
      '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '📦', '📫',
    ],
  },
  {
    id: 'symbols',
    name: 'Symbols',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
      '✅', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️',
      '🔅', '🔆', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✳️', '❇️',
    ],
  },
  {
    id: 'flags',
    name: 'Flags',
    emojis: [
      '🏳️', '🏴', '🏴‍☠️', '🏁', '🚩', '🎌', '🏳️‍🌈', '🏳️‍⚧️', '🇺🇳', '🇨🇳',
      '🇺🇸', '🇬🇧', '🇯🇵', '🇰🇷', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇷🇺', '🇧🇷',
      '🇮🇳', '🇦🇺', '🇨🇦', '🇲🇽',
    ],
  },
];

// Local storage key for recent emojis
const RECENT_EMOJIS_KEY = 'ink-recent-emojis';
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

// Category icons for tabs
const CATEGORY_ICONS: Record<string, string> = {
  recent: '🕐',
  smileys: '😀',
  gestures: '👋',
  animals: '🐱',
  food: '🍔',
  objects: '💡',
  symbols: '❤️',
  flags: '🏳️',
};

/**
 * Create EmojiIconPicker UniComponent for IconPickerService
 * This component is used by Callout block to select emoji icons
 */
export function createEmojiIconPickerComponent(): UniComponent<EmojiIconPickerProps> {
  return (container: HTMLElement, props: EmojiIconPickerProps) => {
    let currentProps = props;
    let searchQuery = '';
    let activeCategory = 'smileys';
    let focusedIndex = 0;
    let keyboardNavActive = false;

    // Create component structure
    const wrapper = document.createElement('div');
    wrapper.className = 'emoji-icon-picker';
    wrapper.innerHTML = `
      <style>
        .emoji-icon-picker {
          display: flex;
          flex-direction: column;
          width: 320px;
          max-height: 360px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
          font-size: 14px;
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
          font-size: 12px;
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
          font-size: 14px;
        }
        .remove-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          border-bottom: 1px solid var(--ink-border-color, #e3e2e4);
          background: transparent;
          color: var(--ink-text-secondary-color, #8e8d91);
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }
        .remove-icon-btn:hover {
          background: var(--ink-hover-color, rgba(0, 0, 0, 0.04));
          color: var(--ink-error-color, #eb4335);
        }
      </style>
      <button class="remove-icon-btn" data-action="remove">
        <span>🗑️</span>
        <span>${t('removeIcon', 'Remove Icon')}</span>
      </button>
      <div class="emoji-search">
        <input type="text" placeholder="${t('searchEmoji', 'Search emoji...')}" />
      </div>
      <div class="emoji-categories"></div>
      <div class="emoji-content"></div>
    `;

    container.appendChild(wrapper);

    const searchInput = wrapper.querySelector('.emoji-search input') as HTMLInputElement;
    const categoriesContainer = wrapper.querySelector('.emoji-categories') as HTMLDivElement;
    const contentContainer = wrapper.querySelector('.emoji-content') as HTMLDivElement;
    const removeBtn = wrapper.querySelector('.remove-icon-btn') as HTMLButtonElement;

    // Handle remove icon
    removeBtn.addEventListener('click', () => {
      currentProps.onSelect?.(undefined);
    });

    // Get filtered categories based on search
    function getFilteredCategories(): EmojiCategory[] {
      const query = searchQuery.toLowerCase().trim();
      if (!query) {
        const recentEmojis = getRecentEmojis();
        const categories: EmojiCategory[] = [];
        if (recentEmojis.length > 0) {
          categories.push({
            id: 'recent',
            name: t('recent', 'Recent'),
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
          id: 'search-results',
          name: t('searchResults', 'Search Results'),
          emojis: filteredEmojis,
        },
      ];
    }

    function getFlatEmojis(): string[] {
      return getFilteredCategories().flatMap(category => category.emojis);
    }

    // Handle emoji selection
    function handleEmojiSelect(emoji: string) {
      addRecentEmoji(emoji);
      const iconData: IconData = {
        type: IconType.Emoji,
        unicode: emoji,
      };
      currentProps.onSelect?.(iconData);
    }

    // Render categories tabs
    function renderCategoryTabs() {
      const allCategoryIds = ['recent', ...EMOJI_CATEGORIES.map(c => c.id)];
      const recentEmojis = getRecentEmojis();

      categoriesContainer.innerHTML = allCategoryIds
        .filter(id => id !== 'recent' || recentEmojis.length > 0)
        .map(id => {
          const icon = CATEGORY_ICONS[id] || '📁';
          const isActive = activeCategory === id;
          return `<div class="category-tab ${isActive ? 'active' : ''}" data-category="${id}" title="${id}">${icon}</div>`;
        })
        .join('');
    }

    // Render emoji content
    function renderContent() {
      const categories = getFilteredCategories();

      if (categories.length === 0) {
        contentContainer.innerHTML = `<div class="no-results">${t('noEmojisFound', 'No emojis found')}</div>`;
        return;
      }

      let globalIndex = 0;
      contentContainer.innerHTML = categories
        .map(category => {
          const emojiItems = category.emojis
            .map(emoji => {
              const currentIndex = globalIndex++;
              const isFocused = keyboardNavActive && currentIndex === focusedIndex;
              return `<div class="emoji-item ${isFocused ? 'focused' : ''}" data-emoji="${emoji}" data-index="${currentIndex}">${emoji}</div>`;
            })
            .join('');
          return `
            <div class="category-section" data-category="${category.id}">
              <div class="category-title">${category.name}</div>
              <div class="emoji-grid">${emojiItems}</div>
            </div>
          `;
        })
        .join('');
    }

    // Full render
    function render() {
      if (!searchQuery) {
        renderCategoryTabs();
        categoriesContainer.style.display = '';
      } else {
        categoriesContainer.style.display = 'none';
      }
      renderContent();
    }

    // Initial render
    render();
    searchInput.focus();

    // Event listeners
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      focusedIndex = 0;
      keyboardNavActive = false;
      render();
    });

    categoriesContainer.addEventListener('click', (e) => {
      const tab = (e.target as HTMLElement).closest('.category-tab') as HTMLElement;
      if (tab) {
        activeCategory = tab.dataset.category || 'smileys';
        searchQuery = '';
        searchInput.value = '';
        focusedIndex = 0;
        keyboardNavActive = false;
        render();

        const section = contentContainer.querySelector(`[data-category="${activeCategory}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    contentContainer.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('.emoji-item') as HTMLElement;
      if (item && item.dataset.emoji) {
        handleEmojiSelect(item.dataset.emoji);
      }
    });

    contentContainer.addEventListener('mouseenter', (e) => {
      const item = (e.target as HTMLElement).closest('.emoji-item') as HTMLElement;
      if (item && item.dataset.index) {
        focusedIndex = parseInt(item.dataset.index, 10);
        keyboardNavActive = true;
        renderContent();
      }
    }, true);

    // Keyboard navigation
    function handleKeydown(e: KeyboardEvent) {
      if (e.isComposing) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        currentProps.onClose?.();
        return;
      }

      const flatEmojis = getFlatEmojis();
      if (flatEmojis.length === 0) return;

      const cols = 8;
      const totalEmojis = flatEmojis.length;
      let newIndex = focusedIndex;
      let handled = false;

      switch (e.key) {
        case 'ArrowLeft':
          if (newIndex > 0) {
            newIndex--;
            handled = true;
          }
          break;
        case 'ArrowRight':
          if (newIndex < totalEmojis - 1) {
            newIndex++;
            handled = true;
          }
          break;
        case 'ArrowUp':
          if (newIndex >= cols) {
            newIndex -= cols;
            handled = true;
          }
          break;
        case 'ArrowDown':
          if (newIndex + cols < totalEmojis) {
            newIndex += cols;
            handled = true;
          } else if (newIndex < totalEmojis - 1) {
            newIndex = totalEmojis - 1;
            handled = true;
          }
          break;
        case 'Enter':
          if (keyboardNavActive && flatEmojis[focusedIndex]) {
            handleEmojiSelect(flatEmojis[focusedIndex]);
            handled = true;
          }
          break;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key !== 'Enter') {
          focusedIndex = newIndex;
          keyboardNavActive = true;
          renderContent();
          requestAnimationFrame(() => {
            const focused = contentContainer.querySelector('.emoji-item.focused');
            if (focused) {
              focused.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          });
        }
      }
    }

    wrapper.addEventListener('keydown', handleKeydown);

    return {
      update: (newProps: EmojiIconPickerProps) => {
        currentProps = newProps;
      },
      unmount: () => {
        wrapper.remove();
      },
    };
  };
}

/**
 * Default IconPickerService implementation using emoji picker
 */
export const defaultIconPickerService: IconPickerService = {
  iconPickerComponent: createEmojiIconPickerComponent(),
};

/**
 * Extension to register IconPickerService
 */
export function IconPickerServiceExtension(
  service: IconPickerService = defaultIconPickerService
): ExtensionType {
  return {
    setup: di => {
      di.override(IconPickerServiceIdentifier, () => service);
    },
  };
}
