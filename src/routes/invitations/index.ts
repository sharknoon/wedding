import {
	createInvitation,
	deleteInvitation,
	getAllInvitations,
	streamAllInvitations
} from '$lib/database';
import type { Change, Invitation } from '$lib/types';

const controllers = new Set<ReadableStreamController<Change<Invitation>>>();
const stream = await streamAllInvitations();
stream.on('change', (c) => {
	let change: Change<Invitation>;
	switch (c.operationType) {
		case 'insert':
		case 'update':
			change = { type: c.operationType, value: c.fullDocument };
			break;
		case 'delete':
			change = { type: c.operationType, value: c.fullDocumentBeforeChange };
			break;
	}
	controllers.forEach((controller) => controller.enqueue(change));
});

export const GET: import('./__types/index').RequestHandler = async () => {
	let controller: ReadableStreamController<Change<Invitation>>;

	return {
		body: new ReadableStream({
			start: (c) => {
				controller = c;
				controllers.add(controller);
			},
			cancel: () => {
				controllers.delete(controller);
			}
		})
	};
};

export const DEL: import('./__types/index').RequestHandler = async ({ url }) => {
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
	const result = await createInvitation(await request.json());
	if (!result.insertedId) {
		return {
			status: 500,
			body: { message: 'Invitation could not be saved' }
		};
	}
	return {
		status: 200,
		body: { message: 'Ok' }
	};
};
