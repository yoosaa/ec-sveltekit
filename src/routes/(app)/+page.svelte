<script lang="ts">
	import Loading from '../../components/Loading.svelte';
	import Product from '../../components/Product.svelte';

	export let data;

	const session = data.session;
	const user = session?.user;

	const getAllProducts = async () => {
		const res = await fetch('/products/all');
		const data = await res.json();
		console.log(data);
		return data;
	};

	const getPurchaseIds = async () => {
		let purchasesData = [];

		const res = await fetch(`/purchases/${user?.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		purchasesData = await res.json();
		console.log(purchasesData);
		return purchasesData.map((purchase) => purchase.productId);
	};
</script>

<div class="relative h-64 w-full md:h-96">
	<img src="#" alt="Header Image" class="h-full w-full object-cover" />
	<div class="absolute left-0 top-1/2 -translate-y-1/2 transform p-4">
		<h1 class="from-bold text-4xl text-white md:text-5xl">- 全ての肉球に届け -</h1>
	</div>
</div>

<main class="mt-10 flex flex-wrap items-center justify-center md:mt-16">
	<h2 class="mb-2 w-full text-center text-3xl font-bold">猫缶一覧</h2>
	{#await getAllProducts()}
		<Loading />
	{:then products}
		{#await getPurchaseIds()}
			<Loading />
		{:then purchasedIds}
			{#each products as product}
				{#if purchasedIds.length > 0}
					<Product {product} isPurchased={purchasedIds.includes(product.id)} />
				{:else}
					<Product {product} />
				{/if}
			{/each}
		{/await}
	{/await}
</main>
