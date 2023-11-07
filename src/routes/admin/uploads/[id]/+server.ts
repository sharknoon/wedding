import { del } from '$lib/server/blobstorage';
import { deleteUpload, getUpload } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const id = params.id;
	const upload = await getUpload(id);

	if (!upload) {
		return new Response(null, { status: 404 });
	}

	await deleteUpload(upload._id.toString());
	await del(upload.blobName);
	await del(upload.thumbnailBlobName);
	await del(upload.originalBlobName);
	return new Response();
};
