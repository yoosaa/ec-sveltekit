<script lang="ts">
	import sveltelogo from '$lib/images/svelte-logo.svg';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	interface NavLinkProps {
		href: String;
	}

	const session = $page.data.session;
	const user = session?.user;
</script>

<header class="bg-gray-100 shadow-lg">
	<nav class="flex items-center justify-between p-4">
		<a href="/" class="flex items-center text-xl font-bold text-black">
			<span class="ml-2 font-serif">猫缶.com</span>
		</a>

		<div class="mx-4 max-w-md flex-grow">
			<input
				type="text"
				placeholder="人気の猫缶を検索...."
				class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="flex items-center gap-1">
			<a href="/">
				<span class="ml-0.5 transition-transform duration-300 group-hover:translate-x-1"
					>ホーム</span
				>
			</a>
			<a href={user ? '/profile' : '#'} on:click={() => !user && signIn()}>
				<span class="ml-0.5 transition-transform duration-300 group-hover:translate-x-1"
					>{user ? 'プロフィール' : 'ログイン'}</span
				>
			</a>
			{#if user}
				<button on:click={() => signOut()}>
					<span class="ml-0.5 transition-transform duration-300 group-hover:translate-x-1"
						>ログアウト</span
					>
				</button>
				<a href="/profile" class="overflow-hidden rounded-full border border-gray-300">
					<img
						src={user?.image || sveltelogo}
						alt="profile_icon"
						width="40"
						height="40"
						class="rounded-full"
					/>
				</a>
			{:else}
				<img src={sveltelogo} alt="profile_icon" width="40" height="40" class="rounded-full" />
			{/if}
		</div>
	</nav>
</header>
