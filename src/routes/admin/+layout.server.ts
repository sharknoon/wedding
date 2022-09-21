import { getAllInvitations, getDetails } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: import('./$types').LayoutServerLoad = async ({ url }) => {
	const details = await getDetails();
	const invitations = await getAllInvitations();

	if (!details) {
		throw error(500, 'Einladungsdetails konnten nicht abgerufen werden');
	}

	return { details: details, invitations: invitations, path: url.pathname };
};
