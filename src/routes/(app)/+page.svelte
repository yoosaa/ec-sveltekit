<script lang="ts">
	import Product from '../../components/Product.svelte';

	interface ProductType {
		id: number;
		title: string;
		price: number;
		thumbnail: { url: string };
		content: string;
		created_at: string;
		updated_at: string;
		tag: string[];
	}

	// 疑似データ
	const product = [
		{
			id: 1,
			title: '猫缶01',
			thumbnail: { url: '/thumbnails/01.png' },
			price: 2980,
			content: '猫缶01の詳細情報です',
			tag: ['ジャンボ缶', '多頭飼', '魚介類', 'まとめ買い', '全猫種用', 'お徳用'],
			createdAt: new Date().toString(),
			updatedAt: new Date().toString()
		},
		{
			id: 2,
			title: '猫缶02',
			thumbnail: { url: '/thumbnails/02.png' },
			price: 1980,
			content: '猫缶02の詳細情報です',
			tag: ['魚介類', 'まとめ買い', '全猫種用', 'お徳用'],
			createdAt: new Date().toString(),
			updatedAt: new Date().toString()
		},
		{
			id: 3,
			title: '猫缶03',
			price: 4980,
			thumbnail: { url: '/thumbnails/03.png' },
			content: '猫缶03の詳細情報です',
			tag: ['魚介類', 'まとめ買い', '全猫種用'],
			createdAt: new Date().toString(),
			updatedAt: new Date().toString()
		}
	];
</script>

<div class="relative h-64 w-full md:h-96">
	<img src="#" alt="Header Image" class="h-full w-full object-cover" />
	<div class="absolute left-0 top-1/2 -translate-y-1/2 transform p-4">
		<h1 class="from-bold text-4xl text-white md:text-5xl">- 全ての肉球に届け -</h1>
	</div>
</div>

<main class="mt-10 flex flex-wrap items-center justify-center md:mt-16">
	<h2 class="mb-2 w-full text-center text-3xl font-bold">猫缶一覧</h2>
	{#each product as product}
		<Product {product} isPurchased={product.updatedAt === new Date().toString()} />
	{/each}
</main>
