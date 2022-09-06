import { error, redirect } from '@sveltejs/kit';
import { getInvitation, updateInvitation } from '$lib/database';
import { GOOGLE_MAPS_API_KEY } from '$lib/env';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		throw error(100, 'Missing invitation id');
	}

	const invitation = await getInvitation(invitationId);

	if (!invitation) {
		throw redirect(302, '/');
	}

	return { invitation: invitation, googleMapsApiKey: GOOGLE_MAPS_API_KEY };
};

export const PUT: import('./$types').Action = async ({ params, request }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		throw error(400, 'Missing invitation id');
	}

	const result = await updateInvitation(invitationId, await request.json());

	if (result.matchedCount != 1) {
		throw error(404, 'Invitation not found');
	}
};
