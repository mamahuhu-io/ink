import { useEffect, useRef } from "react";
import { useTabStore } from "../stores/tabs";
import { isTauri } from "../services";

/**
 * Hook to sync window title with active tab title
 * Updates the native window title and triggers menu rebuild
 */
export function useWindowTitle() {
  const tabs = useTabStore((state) => state.tabs);
  const activeTabId = useTabStore((state) => state.activeTabId);
  const lastTitleRef = useRef<string>("");

  useEffect(() => {
    const updateWindowTitle = async () => {
      if (!isTauri()) return;

      // Find active tab
      const activeTab = tabs.find((t) => t.id === activeTabId);

      // Determine the title to use
      let title = "Ink";
      if (activeTab) {
        title = activeTab.title || "Untitled";
      }

      // Skip if title hasn't changed
      if (title === lastTitleRef.current) {
        return;
      }
      lastTitleRef.current = title;

      try {
        // Update window title
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const currentWindow = getCurrentWindow();
        await currentWindow.setTitle(title);
        console.log("[WindowTitle] Updated to:", title);

        // Rebuild menu to update Window menu list
        const { invoke } = await import("@tauri-apps/api/core");
        await invoke("rebuild_menu");
      } catch (error) {
        console.error("[WindowTitle] Failed to update:", error);
      }
    };

    updateWindowTitle();
  }, [tabs, activeTabId]);
}
