<script lang="ts">
  import Book from '../components/Book.svelte';
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
    <h3>Search</h3>
    <input type="text" oninput={search} /> <!-- change to "onchange" for -->
  </div>
  <div class="container">
    {#each books as book}
      <Book {book}/>
    {/each}
  </div>
  
