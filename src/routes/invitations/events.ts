import { streamAllInvitations } from '$lib/database';
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
		default:
			change = { type: 'insert' };
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
