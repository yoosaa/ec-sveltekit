// https://authjs.dev/reference/sveltekit
import { signIn } from '$lib/ts/serverServices/auth/auth.server';
export const actions = { default: signIn };
