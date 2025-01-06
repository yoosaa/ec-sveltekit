<script lang="ts">
	import type { ProductType } from '$lib/types/types';

	export let data;

	let product: ProductType;
	let loading: boolean = true;
	let showModal: boolean = false;

	const layoutData = data.session;
	const user = layoutData?.user;

	const fetchedProductDetail = async () => {
		try {
			console.log(data);
			const fetchedProduct = await fetch(`/products/detail/${data.id}`);
			product = await fetchedProduct.json();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	$: fetchedProductDetail();
</script>

{#await fetchedProductDetail()}
	<p>loading...</p>
{:then}
	<div class="container mx-auto mb-8 mt-8 p-4">
		<div class="overflow-hidden rounded-lg bg-white shadow-lg">
			<img src={product.image.url} alt={product.title} class="h-80 w-full object-cover" />
			<div class="p-4"></div>
		</div>
	</div>
{/await}
