<script lang="ts">
	import Header from '../components/Header.svelte';
	import { toasts } from '../stores/toasts';
	import Toast from '../components/Toast.svelte';
	import '../app.css';
</script>

<Header />
<div class="flex h-screen flex-col items-center px-14 py-8">
	<slot />
</div>

<div class="toast toast-end">
	<!-- Loop through each toast object, keyed by ID -->
	{#each $toasts as toastObj (toastObj.id)}
		<Toast id={toastObj.id.toString()} message={toastObj.message} type={toastObj.type} />
	{/each}
</div>
