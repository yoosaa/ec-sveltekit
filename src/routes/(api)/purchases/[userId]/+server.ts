import prisma from '@/app/lib/prisma';

export async function GET({ url }: { url: URL }): Promise<Response> {
	const userId = url.searchParams.get('userId');

	try {
		const purchase = await prisma.purchase.findMany({
			where: { userId }
		});

		return Response.json(purchase);
	} catch (err) {
		return Response.json(err);
	}
}
