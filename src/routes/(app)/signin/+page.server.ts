// https://authjs.dev/reference/sveltekit
import { signIn } from '$lib/ts/auth/auth.server';
export const actions = { default: signIn };
