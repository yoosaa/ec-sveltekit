<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ProductType } from '$lib/types/types';
	import { Button, Modal } from 'flowbite-svelte';

	export let data;

	let product = {} as ProductType;
	let loading: boolean = true;
	let isOpenModal = false;

	const layoutData = data.session;
	const user = layoutData?.user;

	const fetchedProductDetail = async (productId: string) => {
		try {
			console.log(data);
			const fetchedProduct = await fetch(`/products/detail/${productId}`);
			product = await fetchedProduct.json();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	$: fetchedProductDetail(data.id);

	const formattedPrice = (price: number) => {
		return new Intl.NumberFormat('ja-JP', {
			style: 'currency',
			currency: 'JPY'
		}).format(product.price);
	};

	const formatContent = (content: string) => {
		return content.replace(/\n/g, '<br>');
	};

	const handlePurchaseConfirmation = () => {
		if (!user) {
			isOpenModal = false;
			goto('/login');
		} else {
			handleCheckout();
		}
	};

	// stripe checkout
	const handleCheckout = async () => {
		try {
			const res = await fetch('/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: product.title,
					productId: product.id,
					price: product.price,
					userId: user?.id
				})
			});

			const responseData = await res.json();
			console.log(responseData);

			if (responseData && responseData.checkout_url) {
				sessionStorage.setItem('stripeSessionId', responseData.sessionId);

				// リダイレクト
				window.location = responseData.checkout_url;
			} else {
				console.error('Failed to fetch checkout URL');
			}
		} catch (error) {
			console.error('Error fetching checkout URL:', error);
		}
	};
</script>

{#await fetchedProductDetail(data.id)}
	<p>loading...</p>
{:then}
	<div class="container mx-auto mb-8 mt-8 p-4">
		<div class="overflow-hidden rounded-lg bg-white shadow-lg">
			<img
				src={product.image.url}
				alt={product.title}
				width="700"
				height="700"
				class="h-80 w-full object-cover"
			/>
			<div class="p-4">
				<div class="mt-2 flex items-center justify-between">
					<span class="to-gray-500 text-sm">
						公開日：{new Date(product.createdAt).toLocaleDateString()}
					</span>
					<span class="to-gray-500 text-sm">
						更新日：{new Date(product.updatedAt).toLocaleDateString()}
					</span>
				</div>

				<h2 class="mt-5 text-3xl font-bold">
					{product.title}
				</h2>

				<div class="mb-20 mt-10 text-gray-700">
					{@html formatContent(product.content)}
				</div>

				<div class="flex items-center justify-center space-x-2">
					<p class="text-3xl text-red-600">{formattedPrice(product.price)}</p>
					<p class="text-gray-400">送料500円</p>
				</div>

				<div class="mb-14 mt-14 flex items-center justify-center">
					<button
						onclick={() => console.log('back')}
						class="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
					>
						戻る
					</button>
					<button
						onclick={() => (isOpenModal = true)}
						class="rounded bg-yellow-400 px-4 py-2 font-bold text-white hover:bg-yellow-500"
					>
						購入する
					</button>
					<Modal bind:open={isOpenModal} autoclose>
						<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							この猫缶を購入しますか？
						</p>
						<Button on:click={() => handlePurchaseConfirmation()}>購入する</Button>
						<Button color="alternative">キャンセル</Button>
					</Modal>
				</div>
			</div>
		</div>
	</div>
{/await}
