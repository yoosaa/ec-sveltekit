export async function load({ url }: { url: URL }) {
	const searchParams = url.searchParams;
	const sessionId = searchParams.get('session_id');
	console.log(sessionId);

	let productId: string | undefined = undefined;
	const fetchData = async (sessionId: string | null) => {
		if (sessionId) {
			try {
				const response = await fetch('/checkout/success', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ sessionId })
				});

				const data = await response.json();
				console.log(data);

				if (data && data.purchase && data.purchase.productId) {
					productId = data.purchase.productId;
				} else {
					console.error('product id is not found in resopnse');
				}
			} catch (e: unknown) {
				console.error('error checkout-success', e);
			}
		}
	};

	await fetchData(sessionId);

	return {
		productId
	};
}
