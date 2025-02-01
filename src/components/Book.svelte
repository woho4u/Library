<script>
	let { book } = $props();
</script>

<div class="w-1/3 p-4">
	<div class="card-sm card card-side h-52 w-full bg-base-100 p-4 shadow-xl">
		<figure>
			<img src={book.coverImage} alt="Movie" class="h-full w-auto" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">{book.title}</h2>
			<p>{book.description}</p>
			<p>Written by {book.author}</p>
			<div class="card-actions justify-end"></div>
		</div>
	</div>
</div>

<style>
</style>
