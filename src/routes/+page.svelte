<script lang="ts">
	import { onMount } from 'svelte';
	import Book from '../components/Book.svelte';
	import Toast from '../components/Toast.svelte';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	interface BookInterface {
		id: number;
		title: string;
		author: string;
		description: string;
		genre: string;
		keywords: string[];
		published_date: string;
		coverImage: string;
	}

	let books: BookInterface[] = $state([]);
	let searchTerm = $state('');
	let addingToList = $state(false);
	let bookToAdd: BookInterface = $state({
		id: 0,
		title: '',
		author: '',
		description: '',
		genre: '',
		keywords: [],
		published_date: '',
		coverImage: ''
	});
	let userid = 0;
	if (browser) {
		let loggedInTo = localStorage.getItem('loginId');
		console.log('Logged in to:', loggedInTo);
		userid = loggedInTo ? parseInt(loggedInTo, 10) : 0;
		console.log('User ID:', userid);
	}
	let readingLists: ReadingList[] = $state([]);
	interface ReadingList {
		id: number;
		name: string;
		books: object[];
	}

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

	async function handleAddingToReadingList(book: BookInterface) {
		toggleAddingToList();
		bookToAdd = book;
		console.log('Book to add:', bookToAdd.title);

		const response = await fetch('http://127.0.0.1:8000/api/reading-lists/?user=' + userid);
		const resData = await response.json();
		readingLists = resData;
		console.log('Reading lists:', $state.snapshot(readingLists));
	}
	function toggleAddingToList() {
		addingToList = !addingToList;
	}
	async function addToReadingList(index: number) {
		const readingListId = readingLists[index].id;
		console.log(`Adding ${bookToAdd.title} to reading list ${readingListId}`);

		fetch('http://127.0.0.1:8000/api/reading-list-books/', {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				reading_list: readingListId,
				book_id: bookToAdd.id
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log('Book added to reading list:', data);
				toggleAddingToList();
			})
			.catch((error) => {
				console.error('Error adding book to reading list:', error);
			});
	}
</script>

<div>
	<label class="input input-bordered flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
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
		<Book {book} {handleAddingToReadingList} />
	{/each}
</div>

{#if addingToList}
	<div
		class="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-black"
		style="--tw-bg-opacity: 0.6!important;"
	>
		<div class="relative flex h-52 w-1/3 flex-col items-center justify-center bg-white p-4">
			<button class="absolute right-0 top-0 p-2" onclick={toggleAddingToList}>
				<Icon icon="material-symbols:close" width="24" height="24" />
			</button>
			<div class="join join-vertical gap-2">
				{#each readingLists as readingList, i}
					<button class="btn btn-primary" onclick={() => addToReadingList(i)}
						>{readingList.name}</button
					>
				{/each}
				<!-- <button class="btn btn-primary" onsubmit={addToReadingList}>Login</button> -->
			</div>
		</div>
	</div>
{/if}
