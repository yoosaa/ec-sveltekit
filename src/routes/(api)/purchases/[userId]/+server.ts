import prisma from '$lib/ts/prisma';

export async function GET({ url }: { url: URL }): Promise<Response> {
	const userId = url.searchParams.get('userId');

	try {
		if (prisma != null && userId != null) {
			const purchase = await prisma.purchase.findMany({
				where: { userId }
			});

			return Response.json(purchase);
		} else {
			return Response.json({ message: 'cannot find prisma or userId' });
		}
	} catch (err) {
		return Response.json(err);
	}
}
