/**
 * Factory function to create i18n module for block toolbars
 * This reduces code duplication across block packages
 */
export function createBlockI18n() {
  let i18nGetter: ((key: string, fallback: string) => string) | null = null;

  return {
    /**
     * Set a custom i18n getter function
     */
    setI18nGetter(getter: (key: string, fallback: string) => string) {
      i18nGetter = getter;
    },

    /**
     * Get translated text with fallback
     */
    t(key: string, fallback: string): string {
      if (i18nGetter) {
        return i18nGetter(key, fallback);
      }
      return fallback;
    },
  };
}

export type BlockI18n = ReturnType<typeof createBlockI18n>;
