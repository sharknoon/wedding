import { env } from '$env/dynamic/private';

export const handle: import('@sveltejs/kit').Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const auth = event.request.headers.get('Authorization');

		if (auth !== `Basic ${Buffer.from(env.ADMIN_LOGIN || 'admin:admin').toString('base64')}`) {
			return new Response('Unauthorized', {
				status: 401,
				headers: {
					'WWW-Authenticate':
						'Basic realm="Um in den Admin bereich zu gelangen, melden Sie sich bitte an", charset="UTF-8"'
				}
			});
		}
	}

	return await resolve(event);
};
