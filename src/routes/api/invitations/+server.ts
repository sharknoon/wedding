import { createInvitation } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const POST: import('./$types').RequestHandler = async ({ request }) => {
	try {
		await createInvitation(await request.json());
	} catch {
		error(500, 'Invitation could not be saved');
	}

	return new Response();
};
