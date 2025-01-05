<script lang="ts">
	import type { ProductType } from '$lib/types/types';

	export let product: ProductType;
	export let isPurchased: boolean = false;
	console.log(product);

	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	const formattedPrice = new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY'
	}).format(product.price);
</script>

<div class="m-4 flex w-96 flex-col items-center">
	<a
		href={`/product/${product.id}`}
		class="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-xl"
	>
		<div class="relative h-64 w-96">
			<img
				src={product.image.url}
				alt={product.title}
				class="h-full w-full rounded-t-md object-cover"
			/>
		</div>

		<div class="h-full rounded-b-md bg-slate-100 px-4 py-4">
			<h2 class="text-xl font-semibold">{product.title}</h2>
			{#if product.tag && product.tag.length > 0}
				<div class="mt-2">
					{#each product.tag as tag}
						<span class="inline-block rounded-full bg-yellow-400 from-black px-3 py-1 text-sm">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<p class="mt-2 text-lg text-slate-600">
				{truncateText(product.content, 50)}
			</p>

			<div class="mt-3 flex items-center justify-between">
				{#if isPurchased}
					<span class="rounded bg-green-500 px-2 py-1 text-xs text-white">過去に購入済み</span>
				{:else}
					<span class="flex-grow"></span>
				{/if}
				<p class="text-md text-right text-slate-700">
					{formattedPrice}
				</p>
			</div>
		</div>
	</a>
</div>

<style global>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.modal {
		animation: fadeIn 0.3s ease-out forwards;
	}
</style>
