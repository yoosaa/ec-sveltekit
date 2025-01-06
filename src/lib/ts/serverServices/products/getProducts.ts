import { client } from '$lib/ts/serverServices/microcms.server';
import type { ProductType } from '$lib/types/types';

export const getProducts = async (type: string, contentId?: string) => {
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
		} else if (type === 'detail') {
			const detailProducts = await client.getListDetail<ProductType>({
				endpoint: 'nekokan',
				contentId: contentId!
			});

			return detailProducts;
		}
	} catch (err) {
		return Response.json(err);
	}
};
