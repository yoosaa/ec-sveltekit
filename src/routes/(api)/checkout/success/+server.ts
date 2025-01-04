import { env } from '$env/dynamic/private';
import prisma from '$lib/ts/prisma';
import Stripe from 'stripe';

// init
const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
	const { sessionId } = await request.json();

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		// 新しい購入履歴を常に作成
		if (prisma != null) {
			const newPurchase = await prisma.purchase.create({
				data: {
					userId: session.client_reference_id!,
					productId: session.metadata?.productId || ''
				}
			});
			return Response.json({ newPurchase });
		} else {
			return Response.json({ message: 'cannot find prisma' });
		}
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Failed to create purchase' });
	}
}
