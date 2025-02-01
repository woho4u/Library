<script lang="ts">
	import Header from '../components/Header.svelte';
	import Toast from '../components/Toast.svelte';
	import { showToast, toast } from '../stores/toast';
	import '../app.css';
</script>

<Header />
<div class="flex h-screen flex-col items-center px-14 py-8">
	<slot />
</div>

<div class="toast toast-end">
	{#if $toast}
		<Toast message={$toast.message} type={$toast.type} />
	{/if}
</div>
