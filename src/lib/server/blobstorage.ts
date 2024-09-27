import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { Client } from 'minio';

let minioClient: Client;

if (!building) {
	if (!env.MINIO_ENDPOINT) {
		console.error('Missing MINIO_ENDPOINT env');
		process.exit();
	}
	if (!env.MINIO_ROOT_USER) {
		console.error('Missing MINIO_ROOT_USER env');
		process.exit();
	}
	if (!env.MINIO_ROOT_PASSWORD) {
		console.error('Missing MINIO_ROOT_PASSWORD env');
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
		accessKey: env.MINIO_ROOT_USER,
		secretKey: env.MINIO_ROOT_PASSWORD
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

export const ping = async (): Promise<boolean> => {
	return minioClient.bucketExists('wedding');
};

export const put = async (objectName: string, buffer: Buffer): Promise<string> => {
	await minioClient.putObject('wedding', objectName, buffer);
	return `${env.MINIO_PUBLIC_URL}/wedding/${objectName}`;
};

export const del = async (objectName: string): Promise<void> => {
	await minioClient.removeObject('wedding', objectName);
};
