export async function load({ fetch, params }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>; params: any; }) {
   const id = params.id;

   const response = await fetch ('http://127.0.0.1:8000/api/books/?id_in=1,2')
}
