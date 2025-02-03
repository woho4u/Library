export async function load({
	fetch,
	params
}: {
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	params: any;
}) {
	const id = params.id;

	const response = await fetch('http://127.0.0.1:8000/api/books/?search=' + id);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const data = await response.json();

	return { book: data[0] };
}
