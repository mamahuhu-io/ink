import { useState, useEffect } from 'react'
import { Minus, Square, X, Copy } from 'lucide-react'

export function WindowControls() {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // Check initial maximized state
    const checkMaximized = async () => {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window')
        const win = getCurrentWindow()
        setIsMaximized(await win.isMaximized())

        // Listen for resize events to track maximize state
        const unlisten = await win.onResized(async () => {
          setIsMaximized(await win.isMaximized())
        })

        return unlisten
      } catch (error) {
        console.error('Failed to check maximized state:', error)
      }
    }

    const unlistenPromise = checkMaximized()
    return () => {
      unlistenPromise?.then(unlisten => unlisten?.())
    }
  }, [])

  const handleMinimize = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      await getCurrentWindow().minimize()
    } catch (error) {
      console.error('Failed to minimize:', error)
    }
  }

  const handleMaximize = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      const win = getCurrentWindow()
      if (await win.isMaximized()) {
        await win.unmaximize()
      } else {
        await win.maximize()
      }
    } catch (error) {
      console.error('Failed to toggle maximize:', error)
    }
  }

  const handleClose = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      await getCurrentWindow().close()
    } catch (error) {
      console.error('Failed to close:', error)
    }
  }

  return (
    <div className="window-controls">
      <button
        className="window-control-btn minimize"
        onClick={handleMinimize}
        aria-label="Minimize"
      >
        <Minus size={16} />
      </button>
      <button
        className="window-control-btn maximize"
        onClick={handleMaximize}
        aria-label={isMaximized ? 'Restore' : 'Maximize'}
      >
        {isMaximized ? <Copy size={14} /> : <Square size={14} />}
      </button>
      <button
        className="window-control-btn close"
        onClick={handleClose}
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  )
}
