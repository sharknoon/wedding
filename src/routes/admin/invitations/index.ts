import {
	createInvitation,
	deleteInvitation,
	existsInvitation,
	getAllInvitations
} from '$lib/database';
import type { Invitation } from '$lib/types';

export const GET: import('./__types/index').RequestHandler = async () => {
	const invitations = await getAllInvitations();

	return {
		body: { invitations: invitations }
	};
};

export const DELETE: import('./__types/index').RequestHandler = async ({ url }) => {
	const invitationId: string = url.searchParams.get('id') || '';

	if (!invitationId) {
		return {
			status: 400,
			body: { message: 'Missing invitation id' }
		};
	}

	const result = await deleteInvitation(invitationId);

	if (result.deletedCount !== 1) {
		return {
			status: 400,
			body: { message: 'Could not delete invitation ' + invitationId }
		};
	}

	return {
		status: 200
	};
};

export const PUT: import('./__types/index').RequestHandler = async ({ request }) => {
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
		return {
			status: 200,
			body: { message: 'Ok' }
		};
	} catch (error) {
		return {
			status: 400,
			body: { message: 'Invitation could not be saved' }
		};
	}
};
