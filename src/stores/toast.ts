import { writable } from 'svelte/store';

// We'll store an object like { message: "...", type: "..." }
// or null if there's no active toast
interface Toast {
	message: string;
	type: string;
}
export const toast = writable<Toast | null>(null);

let toastTimer: number | null = null;
// (optional) some helper methods
export function showToast({ message, type = 'info' }: { message: string; type?: string }) {
	if (toastTimer) {
		clearTimeout(toastTimer);
	}
	toast.set({ message, type });

	toastTimer = setTimeout(() => {
		clearToast();
	}, 3000);
}

export function clearToast() {
	toast.set(null);
}
