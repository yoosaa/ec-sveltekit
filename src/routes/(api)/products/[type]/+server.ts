import { client } from '$lib/ts/serverServices/microcms.server';
import type { ProductType } from '$lib/types/types';

export const GET = async ({ params }: { params: { type: string } }) => {
	try {
		if (params.type === 'all') {
			const allProducts = await client.getList<ProductType>({
				endpoint: 'nekokan',
				queries: {
					offset: 0,
					limit: 10
				}
			});

			return new Response(JSON.stringify(allProducts.contents));
		}
	} catch (err) {
		return new Response(JSON.stringify(err));
	}
};
