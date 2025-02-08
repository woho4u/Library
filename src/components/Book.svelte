<script>
	import Icon from '@iconify/svelte';

	let { book, handleAddingToReadingList } = $props();
</script>

<div class="w-1/3 p-4">
	<div class="card-sm border-1 border-gray50 card card-side h-52 w-full border p-4">
		<button
			class="btn btn-ghost btn-sm absolute right-0 top-0"
			onclick={() => handleAddingToReadingList(book)}
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
				<button class="btn btn-error btn-sm">
					<Icon icon="ic:baseline-delete-forever" width="24" height="24" />
				</button>
				<button class="btn btn-outline btn-primary btn-sm">Edit</button>
			</div>
		</div>
	</div>
</div>

<style>
</style>
