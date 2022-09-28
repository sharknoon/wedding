import { getDetails, getInvitationByPath } from '$lib/server/database';
import type { Details } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const invitationPath: string = params.slug;

	if (!invitationPath) {
		throw error(100, 'Missing invitation slug');
	}

	const details: Details | null = await getDetails();
	const invitation = await getInvitationByPath(invitationPath);

	if (!details) {
		throw error(500, 'Could not load wedding details');
	}
	if (!invitation) {
		throw redirect(302, '/');
	}

	return {
		details: details,
		invitation: invitation
	};
};
