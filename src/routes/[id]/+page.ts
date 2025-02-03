export async function load({
	fetch,
	params
}: {
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	params: any;
}) {
	const id = params.id;
	console.log(id);

	// const res = await fetch(`http://127.0.0.1:8000/api/books/?search=${id}`);
	await fetch('http://127.0.0.1:8000/api/books/?search=' + id)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.error('Error fetching books:', error);
		});

	// return book;
}
