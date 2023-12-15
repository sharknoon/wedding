import { getAllInvitations, getDetails } from '$lib/server/database';
import type { Details } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: import('./$types').LayoutServerLoad = async ({ url }) => {
	const details: Details | null = await getDetails();
	const invitations = await getAllInvitations();

	if (!details) {
		error(500, 'Could not load wedding details');
	}

	return { details: details, invitations: invitations, path: url.pathname };
};
