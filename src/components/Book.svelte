<script>
	import Icon from '@iconify/svelte';

	let { book, handleAddingToReadingList } = $props();
</script>

<div class="w-1/3 p-4">
	<div class="card-sm border-1 border-gray50 card card-side h-52 w-full border p-4">
		<button
			class="btn btn-ghost btn-sm absolute right-0 top-0"
			onclick={() => handleAddingToReadingList(book.id)}
		>
			<Icon icon="material-symbols:format-list-bulleted-add" width="28" height="28" />
		</button>
		<figure>
			<a href={'/' + book.id}>
				<img src={book.coverImage} alt="Movie" class="h-full w-auto" />
			</a>
		</figure>
		<div class="grow-1 card-body px-4 py-0">
			<div>
				<h2 class="card-title">{book.title}</h2>
				<p class="text-secondary" style="">{book.author}</p>
			</div>

			<p>{book.genre}</p>
			<div class="flex gap-2">
				{#each book.keywords as keyword}
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

<style>
	.card:hover {
		transform: scale(1.05);
		--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
			0 8px 10px -6px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	.card:hover .card-actions {
		opacity: 1;
		display: flex;
	}
	.card-actions {
		opacity: 0;
		transition: 200ms;
		display: none;
	}
	.card {
		transition: 200ms;
		border-color: rgb(var(--));
	}
</style>
