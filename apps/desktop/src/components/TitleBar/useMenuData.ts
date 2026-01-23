import { useMemo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { invoke } from "@tauri-apps/api/core";
import { emit, listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-shell";
import type { MenuItemData, MenuData } from "./types";
import { useSidebarStore } from "../../stores/sidebar";
import { useTheme } from "../../hooks/useTheme";
import { getShortcut, formatShortcut } from "../../constants/shortcuts";

// Emit menu event in the format expected by useAppCommands
// Use global emit() to match the global listen() in menu.ts
async function emitMenuEvent(action: string): Promise<void> {
  await emit("menu-event", action);
}

interface RecentItems {
  files: string[];
  folders: string[];
}

export function useMenuData(): MenuData[] {
  const { t } = useTranslation();
  const { isVisible: sidebarVisible, toggleVisible: toggleSidebar } =
    useSidebarStore();
  const { themes, currentTheme, setThemeById } = useTheme();
  const [recentItems, setRecentItems] = useState<RecentItems>({
    files: [],
    folders: [],
  });

  // Fetch recent items
  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const items = await invoke<RecentItems>("get_recent_items");
        setRecentItems(items);
      } catch (error) {
        console.error("Failed to fetch recent items:", error);
      }
    };

    fetchRecentItems();

    // Listen for updates
    const unlistenPromise = listen("recent-items-changed", () => {
      fetchRecentItems();
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  // Menu action handlers - emit events in the same format as native menus
  const handleNewWindow = useCallback(async () => {
    await emitMenuEvent("new_window");
  }, []);

  const handleNewTab = useCallback(async () => {
    await emitMenuEvent("new_tab");
  }, []);

  const handleOpen = useCallback(async () => {
    await emitMenuEvent("open");
  }, []);

  const handleOpenRecentFile = useCallback(async (path: string) => {
    await emit("open-recent-file", path);
  }, []);

  const handleClearRecent = useCallback(async () => {
    try {
      await invoke("clear_recent_items");
    } catch (error) {
      console.error("Failed to clear recent items:", error);
    }
  }, []);

  const handleSave = useCallback(async () => {
    await emitMenuEvent("save");
  }, []);

  const handleSaveAs = useCallback(async () => {
    await emitMenuEvent("save_as");
  }, []);

  const handleCloseTab = useCallback(async () => {
    await emitMenuEvent("close_tab");
  }, []);

  const handleQuit = useCallback(async () => {
    try {
      await invoke("force_quit_app");
    } catch (error) {
      console.error("Failed to quit:", error);
    }
  }, []);

  const handleUndo = useCallback(async () => {
    await emitMenuEvent("undo");
  }, []);

  const handleRedo = useCallback(async () => {
    await emitMenuEvent("redo");
  }, []);

  const handleFind = useCallback(async () => {
    await emitMenuEvent("find");
  }, []);

  const handleFindReplace = useCallback(async () => {
    await emitMenuEvent("find_replace");
  }, []);

  const handleGlobalSearch = useCallback(async () => {
    await emitMenuEvent("global_search");
  }, []);

  const handlePreferences = useCallback(async () => {
    await emitMenuEvent("preferences");
  }, []);

  const handleToggleSidebar = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const handleToggleSourceMode = useCallback(async () => {
    await emitMenuEvent("toggle_source_mode");
  }, []);

  const handleZoomIn = useCallback(async () => {
    await emitMenuEvent("zoom_in");
  }, []);

  const handleZoomOut = useCallback(async () => {
    await emitMenuEvent("zoom_out");
  }, []);

  const handleZoomReset = useCallback(async () => {
    await emitMenuEvent("zoom_reset");
  }, []);

  const handleFullscreen = useCallback(async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      const win = getCurrentWindow();
      const isFullscreen = await win.isFullscreen();
      await win.setFullscreen(!isFullscreen);
    } catch (error) {
      console.error("Failed to toggle fullscreen:", error);
    }
  }, []);

  const handleImport = useCallback(async () => {
    await emitMenuEvent("import");
  }, []);

  const handleExportHtml = useCallback(async () => {
    await emitMenuEvent("export_html");
  }, []);

  const handleExportPdf = useCallback(async () => {
    await emitMenuEvent("export_pdf");
  }, []);

  const handleExportDocx = useCallback(async () => {
    await emitMenuEvent("export_docx");
  }, []);

  const handleExportImage = useCallback(async () => {
    await emitMenuEvent("export_image");
  }, []);

  const handleOpenThemesFolder = useCallback(async () => {
    try {
      await invoke("open_themes_directory");
    } catch (error) {
      console.error("Failed to open themes folder:", error);
    }
  }, []);

  const handleRefreshThemes = useCallback(async () => {
    try {
      await invoke("refresh_themes");
    } catch (error) {
      console.error("Failed to refresh themes:", error);
    }
  }, []);

  const handleWebsite = useCallback(async () => {
    try {
      await open("https://ink.mamahuhu.io");
    } catch (error) {
      console.error("Failed to open website:", error);
    }
  }, []);

  const handleAbout = useCallback(async () => {
    await emitMenuEvent("about");
  }, []);

  // Build menu data
  const menus = useMemo<MenuData[]>(() => {
    // Export submenu
    const exportItems: MenuItemData[] = [
      {
        id: "export_html",
        label: t("menu.file.export.html"),
        action: handleExportHtml,
      },
      {
        id: "export_pdf",
        label: t("menu.file.export.pdf"),
        action: handleExportPdf,
      },
      {
        id: "export_docx",
        label: t("menu.file.export.docx"),
        action: handleExportDocx,
      },
      {
        id: "export_image",
        label: t("menu.file.export.image"),
        action: handleExportImage,
      },
    ];

    // Recent items submenu
    const recentSubmenuItems: MenuItemData[] = [];

    if (recentItems.files.length === 0 && recentItems.folders.length === 0) {
      recentSubmenuItems.push({
        id: "recent-empty",
        label: t("menu.file.no_recent"),
        disabled: true,
      });
    } else {
      // Add files
      recentItems.files.forEach((path, index) => {
        const fileName = path.split(/[/\\]/).pop() || path;
        recentSubmenuItems.push({
          id: `recent-file-${index}`,
          label: fileName,
          action: () => handleOpenRecentFile(path),
        });
      });

      // Add separator if both files and folders exist (though current UI only uses files mostly)
      if (recentItems.files.length > 0 && recentItems.folders.length > 0) {
        recentSubmenuItems.push({
          id: "recent-sep-1",
          type: "separator",
          label: "",
        });
      }

      // Add folders
      recentItems.folders.forEach((path, index) => {
        const folderName = path.split(/[/\\]/).pop() || path;
        recentSubmenuItems.push({
          id: `recent-folder-${index}`,
          label: `📁 ${folderName}`,
          // TODO: Implement open recent folder logic if needed, currently reusing file event or add new one
          action: () => console.log("Open folder:", path),
        });
      });

      // Add separator and clear option
      recentSubmenuItems.push(
        { id: "recent-sep-2", type: "separator", label: "" },
        {
          id: "recent-clear",
          label: t("menu.file.clear_recent"),
          action: handleClearRecent,
        },
      );
    }

    // Theme submenu items
    const themeItems: MenuItemData[] = [
      ...themes.map((theme) => ({
        id: `theme-${theme.id}`,
        label: theme.name,
        type: "checkbox" as const,
        checked: theme.id === currentTheme,
        action: () => setThemeById(theme.id),
      })),
      { id: "theme-sep", type: "separator" as const, label: "" },
      {
        id: "themes-open-folder",
        label: t("menu.themes.open_folder"),
        action: handleOpenThemesFolder,
      },
      {
        id: "themes-refresh",
        label: t("menu.themes.refresh"),
        action: handleRefreshThemes,
      },
    ];

    // File menu
    const fileMenu: MenuData = {
      id: "file",
      label: t("menu.file"),
      items: [
        {
          id: "new_window",
          label: t("menu.file.new_window"),
          shortcut: formatShortcut(getShortcut("new_window") || ""),
          action: handleNewWindow,
        },
        {
          id: "new_tab",
          label: t("menu.file.new_tab"),
          shortcut: formatShortcut(getShortcut("new_tab") || ""),
          action: handleNewTab,
        },
        {
          id: "open",
          label: t("menu.file.open"),
          shortcut: formatShortcut(getShortcut("open") || ""),
          action: handleOpen,
        },
        {
          id: "open_recent",
          label: t("menu.file.open_recent"),
          type: "submenu",
          submenu: recentSubmenuItems,
        },
        { id: "sep1", type: "separator", label: "" },
        {
          id: "save",
          label: t("menu.file.save"),
          shortcut: formatShortcut(getShortcut("save") || ""),
          action: handleSave,
        },
        {
          id: "save_as",
          label: t("menu.file.save_as"),
          shortcut: formatShortcut(getShortcut("save_as") || ""),
          action: handleSaveAs,
        },
        { id: "sep2", type: "separator", label: "" },
        { id: "import", label: t("menu.file.import"), action: handleImport },
        {
          id: "export",
          label: t("menu.file.export"),
          type: "submenu",
          submenu: exportItems,
        },
        { id: "sep3", type: "separator", label: "" },
        {
          id: "close_tab",
          label: t("menu.file.close_tab"),
          shortcut: formatShortcut(getShortcut("close_tab") || ""),
          action: handleCloseTab,
        },
        { id: "sep4", type: "separator", label: "" },
        {
          id: "quit",
          label: t("menu.file.quit"),
          shortcut: formatShortcut(getShortcut("quit") || ""),
          action: handleQuit,
        },
      ],
    };

    // Edit menu
    const editMenu: MenuData = {
      id: "edit",
      label: t("menu.edit"),
      items: [
        {
          id: "undo",
          label: t("menu.edit.undo"),
          shortcut: formatShortcut(getShortcut("undo") || ""),
          action: handleUndo,
        },
        {
          id: "redo",
          label: t("menu.edit.redo"),
          shortcut: formatShortcut(getShortcut("redo") || ""),
          action: handleRedo,
        },
        { id: "sep1", type: "separator", label: "" },
        {
          id: "find",
          label: t("menu.edit.find"),
          shortcut: formatShortcut(getShortcut("find") || ""),
          action: handleFind,
        },
        {
          id: "find_replace",
          label: t("menu.edit.find_replace"),
          shortcut: formatShortcut(getShortcut("find_replace") || ""),
          action: handleFindReplace,
        },
        {
          id: "global_search",
          label: t("menu.edit.search_files"),
          shortcut: formatShortcut(getShortcut("global_search") || ""),
          action: handleGlobalSearch,
        },
        { id: "sep2", type: "separator", label: "" },
        {
          id: "preferences",
          label: t("menu.edit.preferences"),
          shortcut: formatShortcut(getShortcut("preferences") || ""),
          action: handlePreferences,
        },
      ],
    };

    // View menu
    const viewMenu: MenuData = {
      id: "view",
      label: t("menu.view"),
      items: [
        {
          id: "toggle_sidebar",
          label: t("menu.view.toggle_sidebar"),
          shortcut: formatShortcut(getShortcut("toggle_sidebar") || ""),
          type: "checkbox",
          checked: sidebarVisible,
          action: handleToggleSidebar,
        },
        {
          id: "toggle_source_mode",
          label: t("menu.view.toggle_source"),
          shortcut: formatShortcut(getShortcut("toggle_source_mode") || ""),
          action: handleToggleSourceMode,
        },
        { id: "sep1", type: "separator", label: "" },
        {
          id: "zoom_in",
          label: t("menu.view.zoom_in"),
          shortcut: formatShortcut(getShortcut("zoom_in") || ""),
          action: handleZoomIn,
        },
        {
          id: "zoom_out",
          label: t("menu.view.zoom_out"),
          shortcut: formatShortcut(getShortcut("zoom_out") || ""),
          action: handleZoomOut,
        },
        {
          id: "zoom_reset",
          label: t("menu.view.actual_size"),
          shortcut: formatShortcut(getShortcut("zoom_reset") || ""),
          action: handleZoomReset,
        },
        { id: "sep2", type: "separator", label: "" },
        {
          id: "fullscreen",
          label: t("menu.view.fullscreen"),
          shortcut: formatShortcut(getShortcut("fullscreen") || ""),
          action: handleFullscreen,
        },
      ],
    };

    // Themes menu
    const themesMenu: MenuData = {
      id: "themes",
      label: t("menu.themes"),
      items: themeItems,
    };

    // Help menu
    const helpMenu: MenuData = {
      id: "help",
      label: t("menu.help"),
      items: [
        { id: "website", label: t("menu.help.website"), action: handleWebsite },
        { id: "about", label: t("menu.help.about"), action: handleAbout },
      ],
    };

    return [fileMenu, editMenu, viewMenu, themesMenu, helpMenu];
  }, [
    t,
    themes,
    currentTheme,
    sidebarVisible,
    recentItems,
    handleNewWindow,
    handleNewTab,
    handleOpen,
    handleSave,
    handleSaveAs,
    handleCloseTab,
    handleQuit,
    handleUndo,
    handleRedo,
    handleFind,
    handleFindReplace,
    handleGlobalSearch,
    handlePreferences,
    handleToggleSidebar,
    handleToggleSourceMode,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleFullscreen,
    handleImport,
    handleExportHtml,
    handleExportPdf,
    handleExportDocx,
    handleExportImage,
    handleOpenThemesFolder,
    handleRefreshThemes,
    setThemeById,
    handleAbout,
    handleOpenRecentFile,
    handleClearRecent,
    handleWebsite,
  ]);

  return menus;
}
