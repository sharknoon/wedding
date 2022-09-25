import { getDetails, getInvitationByPath } from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const invitationPath: string = params.slug;

	if (!invitationPath) {
		throw error(100, 'Missing invitation slug');
	}

	const details = await getDetails();
	const invitation = await getInvitationByPath(invitationPath);

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
