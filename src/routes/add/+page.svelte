<script lang="ts">
	import Input from '../../components/Input.svelte';
	import { onMount } from 'svelte';
	import Toast from '../../components/Toast.svelte';
	import { showToast } from '../../stores/toasts';

	interface BookInterface {
		title: string;
		author: string;
		description: string;
		genre: string;
		keywords: string[];
		published_date: string;
		coverImage: string;
	}

	let book: BookInterface = {} as BookInterface;

	let genres: string[] = [
		'Fiction',
		'Non-Fiction',
		'Science Fiction',
		'Fantasy',
		'Mystery',
		'Biography'
	];

	let keyWordString = '';

	function submit(event: any) {
		event.preventDefault();

		book.keywords = keyWordString.split(',').map((keyword) => keyword.trim());

		fetch('http://127.0.0.1:8000/api/books/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(book)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: BookInterface) => {
				console.log(data);
				showToast({ message: 'Operation successful!', type: 'success', duration: 3000 });
			})
			.catch((error) => {
				console.error('Error fetching books:', error);
				showToast({ message: error, type: 'error', duration: 3000 });
			});
	}
</script>

<div class="add-book-container flex min-w-96 flex-col items-center">
	<form class="flex w-full flex-col gap-2" action="">
		<div class="flex gap-2">
			<label class="input input-bordered flex w-3/5 items-center gap-2">
				<input type="text" class="grow" placeholder="title" bind:value={book.title} />
			</label>
			<!-- <label class="input input-bordered flex items-center gap-2 w-2/5">
        <input defaultValue="genre" type="text" class="grow" placeholder="Genre" bind:value={book.genre}/>
      </label> -->
			<select class="select select-bordered w-full max-w-xs" bind:value={book.genre}>
				<option disabled selected>Genre</option>
				{#each genres as genre}
					<option value={genre}>{genre}</option>
				{/each}
			</select>
		</div>

		<label class="input input-bordered flex items-center gap-2">
			<input type="text" class="grow" placeholder="author" bind:value={book.author} />
		</label>
		<textarea
			class="textarea textarea-bordered"
			placeholder="description"
			bind:value={book.description}
		></textarea>

		<label class="input input-bordered flex items-center gap-2">
			<input
				type="text"
				class="grow"
				placeholder="Comma Separated Keywords"
				bind:value={keyWordString}
			/>
		</label>
		<label class="input input-bordered flex items-center gap-2">
			<input
				type="date"
				class="grow"
				placeholder="Published Date"
				bind:value={book.published_date}
			/>
		</label>
		<label class="input input-bordered flex items-center gap-2">
			<input type="text" class="grow" placeholder="Cover Image" bind:value={book.coverImage} />
		</label>
		<button class="rounded-lg" onclick={(e) => submit(e)}>Add Book</button>
	</form>
</div>

<style>
</style>
