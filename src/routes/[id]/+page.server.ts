import { getInvitation } from '$lib/database';
import { GOOGLE_MAPS_API_KEY } from '$lib/env';
import { error, redirect } from '@sveltejs/kit';

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
