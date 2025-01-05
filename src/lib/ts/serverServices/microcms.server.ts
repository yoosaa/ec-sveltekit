import { env } from '$env/dynamic/private';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
	serviceDomain: env.MICROCMS_SERVICE_DOMAIN!,
	apiKey: env.MICROCMS_API_KEY!
});
