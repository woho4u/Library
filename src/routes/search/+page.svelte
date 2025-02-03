<script lang="ts">
	import { onMount } from 'svelte';
	import Book from '../../components/Book.svelte';
	import Toast from '../../components/Toast.svelte';
	interface BookInterface {
		title: string;
		author: string;
		description: string;
		genre: string;
		keywords: string;
		published_date: string;
	}
	let books: BookInterface[] = $state([]);
	let searchTerm = $state('');

	console.log('fetching books');

	function search(event: any = null, search: string = '') {
		searchTerm = !search ? event.target.value : search;

		fetch('http://127.0.0.1:8000/api/books/?search=' + encodeURIComponent(searchTerm))
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: BookInterface[]) => {
				console.log(data);
				books = data;
			})
			.catch((error) => {
				console.error('Error fetching books:', error);
			});
	}

	onMount(() => {
		search(null, 'en');
	});
</script>

<div>
	<label class="input input-bordered flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70"
		>
			<path
				fill-rule="evenodd"
				d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
				clip-rule="evenodd"
			/>
		</svg>
		<input type="text" class="grow" placeholder="Search" oninput={search} />
	</label>
</div>

<div class="container flex flex-wrap">
	{#each books as book}
		<Book {book} />
	{/each}
</div>

<div class="flex flex-col gap-6">
	<!-- PRIMARY -->
	<div>
		<h2 class="mb-2 font-bold">Primary</h2>
		<div class="flex gap-2">
			<!-- --p, --pf, --pc -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--p));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--pf));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--pc));"></div>
		</div>
	</div>

	<!-- SECONDARY -->
	<div>
		<h2 class="mb-2 font-bold">Secondary</h2>
		<div class="flex gap-2">
			<!-- --s, --sf, --sc -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--s));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--sf));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--sc));"></div>
		</div>
	</div>

	<!-- ACCENT -->
	<div>
		<h2 class="mb-2 font-bold">Accent</h2>
		<div class="flex gap-2">
			<!-- --a, --af, --ac -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--a));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--af));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--ac));"></div>
		</div>
	</div>

	<!-- NEUTRAL -->
	<div>
		<h2 class="mb-2 font-bold">Neutral</h2>
		<div class="flex gap-2">
			<!-- --n, --nf, --nc -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--n));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--nf));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--nc));"></div>
		</div>
	</div>

	<!-- BASE (100, 200, 300, content) -->
	<div>
		<h2 class="mb-2 font-bold">Base</h2>
		<div class="flex gap-2">
			<!-- --b1, --b2, --b3, --bc -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--b1));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--b2));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--b3));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--bc));"></div>
		</div>
	</div>

	<!-- INFO -->
	<div>
		<h2 class="mb-2 font-bold">Info</h2>
		<div class="flex gap-2">
			<!-- --in, --inf, --inc -->
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--in));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--inf));"></div>
			<div class="h-[15px] w-[15px]" style="background-color: rgb(var(--inc));"></div>
		</div>
	</div>
</div>
