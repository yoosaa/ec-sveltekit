import { client } from '$lib/ts/serverServices/microcms.server';
import type { ProductType } from '$lib/types/types';

export const getProducts = async (type: string) => {
	try {
		if (type === 'all') {
			const allProducts = await client.getList<ProductType>({
				endpoint: 'nekokan',
				queries: {
					offset: 0,
					limit: 10
				}
			});

			return allProducts;
		}
	} catch (err) {
		return Response.json(err);
	}
};
