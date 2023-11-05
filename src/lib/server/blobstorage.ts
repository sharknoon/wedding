import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { Client } from 'minio';

let minioClient: Client;

if (!building) {
	if (!env.MINIO_ENDPOINT) {
		console.error('Missing MINIO_ENDPOINT env');
		process.exit();
	}
	if (!env.MINIO_ACCESS_KEY) {
		console.error('Missing MINIO_ACCESS_KEY env');
		process.exit();
	}
	if (!env.MINIO_SECRET_KEY) {
		console.error('Missing MINIO_SECRET_KEY env');
		process.exit();
	}
	env.MINIO_PORT = env.MINIO_PORT || '9000';
	env.MINIO_USE_SSL = env.MINIO_USE_SSL || 'true';
	env.MINIO_PUBLIC_URL =
		env.MINIO_PUBLIC_URL ||
		`${env.MINIO_USE_SSL ? 'https' : 'http'}://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}`;

	minioClient = new Client({
		endPoint: env.MINIO_ENDPOINT,
		port: parseInt(env.MINIO_PORT),
		useSSL: env.MINIO_USE_SSL === 'true',
		accessKey: env.MINIO_ACCESS_KEY,
		secretKey: env.MINIO_SECRET_KEY
	});

	if (!(await minioClient.bucketExists('wedding'))) {
		await minioClient.makeBucket('wedding');
	}

	// Allow public access to minio in order to be able to store urls in the database
	const bucketPolicy = {
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Principal: '*',
				Action: 's3:GetObject',
				Resource: 'arn:aws:s3:::wedding/*'
			}
		]
	};
	minioClient.setBucketPolicy('wedding', JSON.stringify(bucketPolicy));
}

export const put = async (objectName: string, buffer: Buffer): Promise<string> => {
	await minioClient.putObject('wedding', objectName, buffer);
	return `${env.MINIO_PUBLIC_URL}/wedding/${objectName}`;
};

export const purge = async () => {
	const objects = minioClient.listObjects('wedding');
	for await (const object of objects) {
		await minioClient.removeObject('wedding', object.name);
	}
};
