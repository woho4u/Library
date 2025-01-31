<script>
    let { book } = $props();
</script>

<div class="card p-4 card-side card-sm bg-base-100 shadow-xl h-52 w-full">
    <figure>
      <img
        src={book.coverImage}
        alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{book.title}</h2>
      <p>{book.description}</p>
      <p>Written by {book.author}</p>
      <div class="card-actions justify-end">
      </div>
    </div>
  </div>
        

<style>

</style>