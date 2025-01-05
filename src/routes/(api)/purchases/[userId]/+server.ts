import prisma from '$lib/ts/clientServices/prisma';

export const GET = async ({ params }: { params: { userId: string } }): Promise<Response> => {
	const userId = params.userId;
	try {
		if (prisma != null && userId != null) {
			const purchase = await prisma.purchase.findMany({
				where: { userId }
			});

			return new Response(JSON.stringify(purchase));
		} else {
			return new Response(JSON.stringify({ message: 'cannot find prisma or userId' }));
		}
	} catch (err) {
		return new Response(JSON.stringify(err));
	}
};
