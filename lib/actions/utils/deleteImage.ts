'use server';

import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
	region: 'eu-central-1',
});

export default async function deleteImage(image: any) {
	await s3.deleteObject({
		Bucket: 'next-14-aws-oskar-bucket',
		Key: image,
	});
}
