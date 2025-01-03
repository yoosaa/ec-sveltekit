import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
	const userId = request.url.searchParams.get('userId');

	try {
		const purchase = await prisma.purchase.findMany({
			where: { userId }
		});
		console.log(purchase);

		return Response.json(purchase);
	} catch (err) {
		return Response.json(err);
	}
}
