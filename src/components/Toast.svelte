<script>
	import { dismissToast } from '../stores/toasts';

	/** @type {string} */
	export let id;
	export let message;
	export let type = 'info'; // info | success | warning | error | etc.

	function handleClose() {
		dismissToast(Number(id)); // remove this toast from the list
	}
</script>

<div
	class="alert shadow-lg"
	class:alert-info={type === 'info'}
	class:alert-success={type === 'success'}
	class:alert-warning={type === 'warning'}
	class:alert-error={type === 'error'}
>
	<span>{message}</span>
	<!-- Manual close button -->
	<button on:click={handleClose} class="ml-2 font-bold">×</button>
</div>
