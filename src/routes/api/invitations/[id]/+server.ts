import { deleteInvitation, updateInvitation } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const PUT: import('./$types').RequestHandler = async ({ params, request }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		error(400, 'Missing invitation id');
	}

	const result = await updateInvitation(invitationId, await request.json());

	if (result.matchedCount !== 1) {
		error(404, 'Invitation not found');
	}

	return new Response();
};

export const DELETE: import('./$types').RequestHandler = async ({ params }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		error(400, 'Missing invitation id');
	}

	const result = await deleteInvitation(invitationId);

	if (result.deletedCount !== 1) {
		error(400, 'Could not delete invitation ' + invitationId);
	}

	return new Response();
};
