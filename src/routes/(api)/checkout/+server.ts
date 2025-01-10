import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

// init
const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

const baseUrl = env.VERCEL_BASE_URL;

export async function POST({ request }: { request: Request }) {
	const { title, price, productId, userId } = await request.json();
	console.log(price);

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			metadata: {
				productId
			},
			client_reference_id: userId,
			line_items: [
				{
					price_data: {
						currency: 'jpy',
						product_data: {
							name: title
						},
						unit_amount: price
					},
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: `${baseUrl}/product/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}`
		});

		return Response.json({
			checkout_url: session.url
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return Response.json({ message: error.message });
		}
		return Response.json({ message: 'An unknown error occurred' });
	}
}
