import { getUserFollowing } from '@/lib/actions/user/get/getUserFollowing';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const profileId = searchParams.get('profileId');

	const userData = await getUserFollowing(`${profileId}`);

	return Response.json(userData);
}
