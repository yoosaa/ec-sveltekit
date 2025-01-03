import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async () => {
	const authOptions = {
		providers: [
			GitHub({
				clientId: env.GITHUB_ID,
				clientSecret: env.GITHUB_SECRET
			})
		],
		secret: env.AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});
