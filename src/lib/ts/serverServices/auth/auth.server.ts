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
		trustHost: true,
		callbacks: {
			async jwt({ token, account, user }) {
				console.log('JWT token:', token, 'User:', user, 'Account:', account);
				if (user) {
					token.id = user.id;
					token.role = user.role ?? 'user';
				} else if (account?.provider === 'github' && account.id) {
					token.id = account.id;
				}
				return token;
			},
			async session({ session, token }) {
				session.user = { ...session.user, id: token.id as string, role: token.role as string };
				return session;
			}
		}
	};
	return authOptions;
});
