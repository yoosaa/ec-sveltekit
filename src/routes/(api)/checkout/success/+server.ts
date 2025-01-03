import { env } from '$env/dynamic/private';
import prisma from '@/app/lib/prisma';
import Stripe from 'stripe';

// init
const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export async function POST(request: Request): Promise<Response> {
	const { sessionId } = await request.json();

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		// 新しい購入履歴を常に作成
		const newPurchase = await prisma.purchase.create({
			data: {
				userId: session.client_reference_id!,
				productId: session.metadata?.productId || ''
			}
		});
		return Response.json({ newPurchase });
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Failed to create purchase' });
	}
}
