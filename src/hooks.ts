import { ADMIN_LOGIN } from '$lib/env';

export const handle: import('@sveltejs/kit').Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/invitations')) {
		const auth = event.request.headers.get('Authorization');

		if (auth !== `Basic ${Buffer.from(ADMIN_LOGIN).toString('base64')}`) {
			return new Response('Not authorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
				}
			});
		}
	}

	return resolve(event);
};
