import { streamAllInvitations } from '$lib/database';

const controllers = new Set<ReadableStreamController<string>>();
const stream = await streamAllInvitations();
stream.on('change', (c) => {
	let data = '';
	switch (c.operationType) {
		case 'insert':
		case 'update':
			data = JSON.stringify(c.fullDocument);
			break;
		case 'delete':
			data = c.documentKey._id;
			break;
	}
	const result = `event: ${c.operationType}\ndata: ${data}\n\n`;
	controllers.forEach((controller) => controller.enqueue(result));
});

export const GET: import('./__types/index').RequestHandler = async () => {
	let controller: ReadableStreamController<string>;

	return {
		status: 200,
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		},
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
