<script lang="ts">
	interface NavLinkProps {
		href: String;
	}
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
	</nav>
</header>
