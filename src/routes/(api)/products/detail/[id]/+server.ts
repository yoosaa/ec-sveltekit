import { client } from '$lib/ts/serverServices/microcms.server';
import type { ProductType } from '$lib/types/types';

export const GET = async ({ params }: { params: { id: string } }): Promise<Response> => {
	try {
		const detailProduct = await client.getListDetail<ProductType>({
			endpoint: 'nekokan',
			contentId: params.id
		});

		return new Response(JSON.stringify(detailProduct));
	} catch (err) {
		return new Response(JSON.stringify(err));
	}
};
