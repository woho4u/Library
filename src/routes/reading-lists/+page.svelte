<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Book from '../../components/Book.svelte';

	type BookInterface = {
		id: number;
		title: string;
		author: string;
		description: string;
		genre: string;
		keywords: string[];
		published_date: string;
		coverImage: string;
	};

	type ReadingListBook = {
		id: number;
		added_at: number;
		completed: boolean;
		book: BookInterface;
	};

	type ReadingListInterface = {
		id: number;
		name: string;
		reading_list_books: ReadingListBook[];
	};

	let readingLists: ReadingListInterface[] = $state([]);
	let userId = 0;

	let newReadingListName = $state('');

	if (browser) {
		let loggedInTo = localStorage.getItem('loginId');
		console.log('Logged in to:', loggedInTo);
		userId = loggedInTo ? parseInt(loggedInTo, 10) : 0;
		console.log('User ID:', userId);
	}

	async function getReadingLists() {
		const response = await fetch('http://127.0.0.1:8000/api/reading-lists/?user=' + userId);
		const resData = await response.json();
		readingLists = resData;
		console.log($state.snapshot(readingLists));
	}
	onMount(() => {
		getReadingLists();
	});

	function createNewList() {
		fetch('http://127.0.0.1:8000/api/reading-lists/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: userId, name: newReadingListName })
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: BookInterface) => {
				console.log(data);
			})
			.catch((error) => {
				console.error('Error fetching books:', error);
			});
	}
</script>

<div>
	<div class="flex gap-4">
		<h1 class=" text-lg font-medium">Reading Lists</h1>
		<button
			class="btn"
			onclick={() => {
				const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
				if (modal) modal.showModal();
			}}>Create new reading list</button
		>
	</div>
	{#if readingLists.length > 0}
		{#each readingLists as readingList}
			<h2 class=" mt-4 text-xl font-medium">{readingList.name}</h2>
			<div class="">
				<div class="">
					{#each readingList.reading_list_books as bookentry}
						<!-- <div class="flex h-64 gap-3 rounded-lg border-2 border-solid border-primary p-2">
							<div>
								<img class="h-full w-auto" src={bookentry.book.coverImage} alt="" />
							</div>
							<div>
								<h2>{bookentry.book.title}</h2>
								<p>{bookentry.book.author}</p>
							</div>
						</div> -->
						<div class="w-full p-4">
							<div class="card-sm border-1 border-gray50 card card-side h-52 w-full border p-4">
								<!-- <button
                           class="btn btn-ghost btn-sm absolute right-0 top-0"
                           onclick={() => handleAddingToReadingList(book)}
                        >
                           <Icon icon="material-symbols:format-list-bulleted-add" width="28" height="28" />
                        </button> -->
								<figure>
									<a href={'/' + bookentry.book.id}>
										<img src={bookentry.book.coverImage} alt="Movie" class="h-full w-auto" />
									</a>
								</figure>
								<div class="grow-1 card-body px-4 py-0">
									<div>
										<h2 class="card-title">{bookentry.book.title}</h2>
										<p class="text-secondary" style="">{bookentry.book.author}</p>
									</div>

									<p>{bookentry.book.genre}</p>
									<div class="flex gap-2">
										{#each bookentry.book.keywords as keyword}
											<span class="badge">{keyword}</span>
										{/each}
									</div>

									<div class="card-actions justify-end"></div>
									<div class="card-actions">
										<button class="btn btn-primary btn-sm">Read</button>
										<button class="btn btn-outline btn-primary btn-sm">Edit</button>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Create New Reading List!</h3>
		<div class="join w-full">
			<form class="w-full" action="">
				<label class="">
					<div class="label">
						<span class="label-text">The name of the reading list</span>
					</div>
					<label class="input input-bordered flex w-full w-full items-center gap-2">
						<input type="text" class="grow" placeholder="title" bind:value={newReadingListName} />
					</label>
				</label>
				<button onclick={createNewList}>Create List</button>
			</form>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
