// https://authjs.dev/reference/sveltekit
import { signOut } from '$lib/ts/auth/auth.server';
export const actions = { default: signOut };
