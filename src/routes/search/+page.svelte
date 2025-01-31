<script lang="ts">
  import Book from '../../components/Book.svelte';
  interface BookInterface {
    title : string;
    author : string;
    description: string;
    genre : string;
    keywords : string;
    published_date : string; 
  }
    let books : BookInterface[] = $state([]);
    let searchTerm = $state('');

    function search(event : any) {
      searchTerm = event.target.value;

      fetch('http://127.0.0.1:8000/api/books/?search='+encodeURIComponent(searchTerm))
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

    

</script>
  <div>
    <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
        <input type="text" class="grow" placeholder="Search" oninput={search} />
    </label>
  </div>
  <div class="container">
    {#each books as book}
      <Book {book}/>
    {/each}
  </div>
  
