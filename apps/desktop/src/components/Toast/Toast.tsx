/**
 * Toast notification component
 */

import './Toast.css';

import { useToastStore } from '../../services/toast';

export function Toast() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} role="alert">
          <button
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
            aria-label={`Dismiss ${toast.type} message: ${toast.message}`}
          >
            <span className="toast-icon">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✕'}
              {toast.type === 'info' && 'ℹ'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
