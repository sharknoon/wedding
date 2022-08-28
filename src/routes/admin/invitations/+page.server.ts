import { error } from '@sveltejs/kit';
import {
	createInvitation,
	deleteInvitation,
	existsInvitation,
	getAllInvitations
} from '$lib/database';
import type { Invitation } from '$lib/types';

export const load: import('./$types').PageServerLoad = async () => {
	const invitations = await getAllInvitations();

	return { invitations: invitations };
};

export const DELETE: import('./$types').Action = async ({ url }) => {
	const invitationId: string = url.searchParams.get('id') || '';

	if (!invitationId) {
		throw error(400, 'Missing invitation id');
	}

	const result = await deleteInvitation(invitationId);

	if (result.deletedCount !== 1) {
		throw error(400, 'Could not delete invitation ' + invitationId);
	}
};

export const PUT: import('./$types').Action = async ({ request }) => {
	try {
		const invitation: Invitation = await request.json();
		const id = invitation.members
			.map((m) => m.name.trim().split(' ').pop()?.toLowerCase())
			.filter((name, index, self) => self.indexOf(name) === index)
			.filter((name) => name?.length || 0 > 0)
			.join('-');
		invitation._id = id;
		let counter = 0;
		while (await existsInvitation(invitation._id)) {
			console.log(invitation._id);
			counter++;
			invitation._id = `${id}-${counter}`;
		}
		await createInvitation(invitation);
	} catch {
		throw error(500, 'Invitation could not be saved');
	}
};
