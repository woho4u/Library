import { writable } from 'svelte/store';

// Array of toast objects: [{ id, message, type, duration }, ...]
interface Toast {
	id: number;
	message: string;
	type: string;
	duration: number;
}

export const toasts = writable<Toast[]>([]);

// Keep track of a unique ID for each toast
let toastId = 0;

/**
 * Show a new toast.
 * @param {Object} options
 * @param {string} options.message - The toast message
 * @param {string} [options.type='info'] - 'info' | 'success' | 'warning' | 'error' (or your own categories)
 * @param {number} [options.duration=3000] - How long before auto-dismiss, in ms
 */
interface ToastOptions {
	message: string;
	type?: string;
	duration?: number;
}

export function showToast({ message, type = 'info', duration = 3000 }: ToastOptions) {
	// Create a unique ID for this toast
	const id = ++toastId;

	// Push the toast object into the array
	toasts.update((all) => [...all, { id, message, type, duration }]);

	// Auto-dismiss after `duration` ms
	setTimeout(() => {
		dismissToast(id);
	}, duration);
}

/**
 * Dismiss a toast by ID (useful for close buttons or the auto-dismiss).
 * @param {number} id - The toast ID to remove
 */
export function dismissToast(id: number): void {
	toasts.update((all: Toast[]) => all.filter((toast: Toast) => toast.id !== id));
}
