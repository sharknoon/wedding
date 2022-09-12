import { streamAllInvitations } from '$lib/database';

const controllers = new Set<ReadableStreamController<string>>();
const stream = await streamAllInvitations();
stream.on('change', (c) => {
	let data = '';
	switch (c.operationType) {
		case 'insert':
		case 'update':
		case 'replace':
			data = JSON.stringify(c.fullDocument);
			break;
		case 'delete':
			data = c.documentKey._id;
			break;
	}
	const result = `event: ${c.operationType}\ndata: ${data}\n\n`;
	controllers.forEach((controller) => controller.enqueue(result));
});

export const GET: import('./$types').RequestHandler = async () => {
	let controller: ReadableStreamController<string>;

	return new Response(
		new ReadableStream({
			start: (c) => {
				controller = c;
				controllers.add(controller);
			},
			cancel: () => {
				controllers.delete(controller);
			}
		}),
		{
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		}
	);
};
