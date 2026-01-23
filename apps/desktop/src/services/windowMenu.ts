/**
 * 设置 Window 菜单（仅在 macOS 下）
 * 注意：实际的 setAsWindowsMenuForNSApp 调用已在 Rust 端完成
 * 这个函数保留用于日志记录和将来可能的扩展
 */
export async function setupWindowMenu(): Promise<void> {
  try {
    // 检测平台：只在 macOS 下执行
    const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0

    if (!isMacOS) {
      console.log('[WindowMenu] Not running on macOS, skipping')
      return
    }

    // Window menu 和 setAsWindowsMenuForNSApp 已在 Rust 端设置
    // 参见 src-tauri/src/lib.rs 中的 create_menu 函数
    console.log('[WindowMenu] Window menu configured from Rust backend')
  } catch (error) {
    console.error('[WindowMenu] Error:', error)
  }
}
