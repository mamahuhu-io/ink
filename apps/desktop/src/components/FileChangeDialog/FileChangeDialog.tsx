import { useEffect, useState, useCallback } from 'react'
import { AlertTriangle } from 'lucide-react'
import { setFileChangeDialogCallback } from '../../hooks/useFileWatcher'
import './FileChangeDialog.css'

interface FileChangeInfo {
  filePath: string
  fileName: string
  isModified: boolean
  onReload: () => void
  onKeepLocal: () => void
}

export function FileChangeDialog() {
  const [pendingChanges, setPendingChanges] = useState<FileChangeInfo[]>([])

  // Register the dialog callback
  useEffect(() => {
    setFileChangeDialogCallback((options) => {
      setPendingChanges((prev) => {
        // Avoid duplicates
        if (prev.some((p) => p.filePath === options.filePath)) {
          return prev
        }
        return [...prev, options]
      })
    })

    return () => {
      setFileChangeDialogCallback(() => {})
    }
  }, [])

  const handleReload = useCallback((change: FileChangeInfo) => {
    change.onReload()
    setPendingChanges((prev) => prev.filter((p) => p.filePath !== change.filePath))
  }, [])

  const handleKeepLocal = useCallback((change: FileChangeInfo) => {
    change.onKeepLocal()
    setPendingChanges((prev) => prev.filter((p) => p.filePath !== change.filePath))
  }, [])

  const handleReloadAll = useCallback(() => {
    pendingChanges.forEach((change) => change.onReload())
    setPendingChanges([])
  }, [pendingChanges])

  const handleKeepAllLocal = useCallback(() => {
    pendingChanges.forEach((change) => change.onKeepLocal())
    setPendingChanges([])
  }, [pendingChanges])

  if (pendingChanges.length === 0) {
    return null
  }

  return (
    <div className="file-change-dialog-overlay">
      <div className="file-change-dialog">
        <div className="file-change-dialog-header">
          <AlertTriangle className="file-change-icon" size={24} />
          <h3>File Changed Externally</h3>
        </div>

        <div className="file-change-dialog-content">
          {pendingChanges.length === 1 ? (
            <p>
              The file <strong>{pendingChanges[0].fileName}</strong> has been modified by another program.
              <br />
              You have unsaved changes. What would you like to do?
            </p>
          ) : (
            <p>
              {pendingChanges.length} files have been modified by another program.
              <br />
              You have unsaved changes in these files. What would you like to do?
            </p>
          )}

          {pendingChanges.length > 1 && (
            <ul className="file-change-list">
              {pendingChanges.map((change) => (
                <li key={change.filePath}>
                  <span className="file-name">{change.fileName}</span>
                  <div className="file-actions">
                    <button
                      className="btn-small btn-reload"
                      onClick={() => handleReload(change)}
                    >
                      Reload
                    </button>
                    <button
                      className="btn-small btn-keep"
                      onClick={() => handleKeepLocal(change)}
                    >
                      Keep
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="file-change-dialog-actions">
          {pendingChanges.length === 1 ? (
            <>
              <button
                className="btn-secondary"
                onClick={() => handleKeepLocal(pendingChanges[0])}
              >
                Keep My Changes
              </button>
              <button
                className="btn-primary"
                onClick={() => handleReload(pendingChanges[0])}
              >
                Reload from Disk
              </button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={handleKeepAllLocal}>
                Keep All My Changes
              </button>
              <button className="btn-primary" onClick={handleReloadAll}>
                Reload All from Disk
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
