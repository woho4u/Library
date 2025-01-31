<script lang="ts">
	import Header from '../components/Header.svelte'; 
	import '../app.css';
</script>

<Header />
<div class="flex flex-col items-center h-screen px-14 py-8">
	<slot />
</div>