<script lang="ts">
	export let data;
</script>

<div class="mt-20 flex items-center justify-center">
	<div class="rounded-lg bg-white p-6 shadow-lg">
		<h1 class="mb-1 text-center text-2xl font-bold text-gray-800">購入ありがとうございます！</h1>
		<h1 class="mb-14 text-center text-2xl font-bold text-gray-800">
			商品がお手元に届くまで今しばらくお待ちください。
		</h1>
		<p class="text-center text-gray-600">
			ご購入いただいた商品内容の詳細は、プロフィール欄からでも確認できます。
		</p>
		<div class="mb-10">
			{#if data.productId}
				<div class="mt-6 text-center">
					<a
						href={`/product/${data.productId}`}
						class="text-indigo-600 transition duration-300 hover:text-indigo-800"
					>
						購入した商品を見る
					</a>
				</div>
			{:else}
				<p class="text-center text-gray-600">商品情報の読み込み中...</p>
			{/if}
		</div>
	</div>
</div>
