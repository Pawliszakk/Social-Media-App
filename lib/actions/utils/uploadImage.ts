'use server';

import { S3 } from '@aws-sdk/client-s3';
const { v4: uuidv4 } = require('uuid');

const s3 = new S3({
	region: 'eu-central-1',
});

export async function uploadImage(image: any) {
	const extension = image.name.split('.').pop();
	const imageId = uuidv4();
	const fileName = `${imageId}.${extension}`;
	const bufferedImage = await image.arrayBuffer();

	await s3.putObject({
		Bucket: 'next-14-aws-oskar-bucket',
		Key: fileName,
		Body: Buffer.from(bufferedImage),
		ContentType: image.type,
	});

	return fileName;
}
