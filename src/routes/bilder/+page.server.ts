import type { Actions, PageServerLoad } from './$types';
import crypto from 'node:crypto';
import { fail } from '@sveltejs/kit';
import { addUploads, getUploads } from '$lib/server/database';
import type { Upload } from '$lib/types';
import sharp from 'sharp';
import { put } from '$lib/server/blobstorage';

export const load: PageServerLoad = async () => {
	return { images: await getUploads() };
};

export const actions = {
	upload: async ({ request }) => {
		try {
			const formData = await request.formData();
			const blobs = formData.getAll('uploads') as Blob[];
			const uploads: Upload[] = [];
			for (const blob of blobs) {
				if (!blob.type.startsWith('image/')) {
					return fail(400, { err: `file type ${blob.type} not supported` });
				}

				if (blob.type.startsWith('image/')) {
					// block images over 50MB
					if (blob.size > 50 * 1024 * 1024) {
						continue;
					}

					const buffer = Buffer.from(await blob.arrayBuffer());
					const s = sharp(buffer);
					const metadata = await s.metadata();

					const fileExtension = blob.name.split('.').pop();
					const fileUUID = crypto.randomUUID();

					const originalFileName = `${fileUUID}.${fileExtension}`;
					const originalUrl = await put(originalFileName, buffer);

					const compressedFileName = `${fileUUID}-compressed.webp`;
					const compressed = await s
						.resize(Math.min(metadata.width ?? 1440, 1440))
						.toFormat('webp')
						.toBuffer({ resolveWithObject: true });
					const compressedUrl = await put(compressedFileName, compressed.data);

					const thumbnailFileName = `${fileUUID}-thumbnail.webp`;
					const thumbnail = await s
						.resize(undefined, Math.min(metadata.height ?? 200, 200))
						.toFormat('webp')
						.toBuffer({ resolveWithObject: true });
					const thumbnailUrl = await put(thumbnailFileName, thumbnail.data);

					uploads.push({
						createdAt: new Date().toISOString(),
						url: compressedUrl,
						type: 'image/webp',
						width: compressed.info.width,
						height: compressed.info.height,
						thumbnailUrl,
						originalUrl,
						originalFilename: blob.name,
						blobName: compressedFileName,
						thumbnailBlobName: thumbnailFileName,
						originalBlobName: originalFileName
					});
				}
			}
			await addUploads(uploads);
		} catch (err) {
			console.error(err);
			return fail(500);
		}
	}
} satisfies Actions;
