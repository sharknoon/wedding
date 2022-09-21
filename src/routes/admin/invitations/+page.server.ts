import { getAllInvitations } from '$lib/server/database';

export const load: import('./$types').PageServerLoad = async () => {
	const invitations = await getAllInvitations();

	return { invitations: invitations };
};
