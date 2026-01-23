/**
 * Toast notification service
 * Provides a simple way to show success/error notifications
 */

import { create } from 'zustand'

// ============================================
// Types
// ============================================

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

interface ToastStore {
  toasts: ToastMessage[]
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
}

// ============================================
// Toast Store
// ============================================

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }))
    // Auto-remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, 3000)
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))

// ============================================
// Helper Functions
// ============================================

/**
 * Show a success toast notification
 */
export function showSuccessToast(message: string): void {
  useToastStore.getState().addToast('success', message)
}

/**
 * Show an error toast notification
 */
export function showErrorToast(message: string): void {
  useToastStore.getState().addToast('error', message)
}

/**
 * Show an info toast notification
 */
export function showInfoToast(message: string): void {
  useToastStore.getState().addToast('info', message)
}
