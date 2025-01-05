// https://authjs.dev/reference/sveltekit
import { signOut } from '$lib/ts/serverServices/auth/auth.server';
export const actions = { default: signOut };
