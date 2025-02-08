<script>
	import Icon from '@iconify/svelte';

	let loggingIn = false;
	let username = '';

	function login() {
		localStorage.setItem('loginId', '1');
		activateLogin();
		location.reload();
	}
	function activateLogin() {
		loggingIn = !loggingIn;
	}
</script>

<div class="drawer z-40">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar w-full bg-base-300">
			<div class="flex-none sm:hidden">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
			</div>
			<div class="mx-2 flex-1 px-2"><a href="/">Bibiliotiliotek</a></div>
			<div class="hidden flex-none sm:block">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					<li><a href="/search" class="hover:underline">Search</a></li>
					<li><a href="/add" class="hover:underline">Add Book</a></li>
					<li><a href="/reading-lists" class="hover:underline">Reading Lists</a></li>
					<li><button class="hover:underline" onclick={activateLogin}>Login</button></li>
				</ul>
			</div>
		</div>
		<!-- Page content here -->
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-80 bg-base-200 p-4">
			<!-- Sidebar content here -->
			<li><a href="/search" class="hover:underline">Search</a></li>
			<li><a href="/add" class="hover:underline">Add Book</a></li>
			<li><a href="/reading-lists" class="hover:underline">Reading Lists</a></li>
			<li><button class="hover:underline" onclick={activateLogin}>Login</button></li>
		</ul>
	</div>
</div>

{#if loggingIn}
	<div
		class="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-black opacity-60"
	>
		<div class="relative flex h-52 w-1/3 flex-col items-center justify-center bg-white p-4">
			<button class="absolute right-0 top-0 p-2" onclick={activateLogin}>
				<Icon icon="material-symbols:close" width="24" height="24" />
			</button>
			<form class="join" action="#" onsubmit={login}>
				<input
					type="text"
					placeholder="Username"
					class="input input-primary"
					bind:value={username}
				/>
				<button class="btn btn-primary" onsubmit={login}>Login</button>
			</form>
		</div>
	</div>
{/if}
