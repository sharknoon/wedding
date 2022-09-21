import { getDetails, getInvitation } from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		throw error(100, 'Missing invitation id');
	}

	const details = await getDetails();
	const invitation = await getInvitation(invitationId);

	if (!details) {
		throw error(500, 'Einladungsdetails konnten nicht abgerufen werden');
	}
	if (!invitation) {
		throw redirect(302, '/');
	}

	return {
		details: details,
		invitation: invitation
	};
};
