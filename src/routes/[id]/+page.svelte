<script>
	export let data;
	let book = data.book;
</script>

<div class="book-container flex flex-col items-center">
	<h1>{book.title}</h1>
	<h2>{book.author}</h2>
	<p>{book.description}</p>
	<p>{book.genre}</p>
	<p>{book.keywords}</p>
	<p>{book.published_date}</p>
	<img src={book.coverImage} alt={book.title} />
</div>
