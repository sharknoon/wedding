import { createInvitation, existsInvitation } from '$lib/database';
import type { Invitation } from '$lib/types';
import { error } from '@sveltejs/kit';

export const POST: import('./$types').RequestHandler = async ({ request }) => {
	try {
		const invitation: Invitation = await request.json();

		const id = invitation.members
			.map((m) => m.name.trim().split(' ').pop()?.toLowerCase())
			// filter out duplicates
			.filter((name, index, self) => self.indexOf(name) === index)
			// filter out empty strings
			.filter((name) => name?.length || 0 > 0)
			.join('-');
		invitation._id = id;

		let counter = 1;
		while (await existsInvitation(invitation._id)) {
			counter++;
			invitation._id = `${id}-${counter}`;
		}

		await createInvitation(invitation);
	} catch {
		throw error(500, 'Invitation could not be saved');
	}

	return new Response();
};
