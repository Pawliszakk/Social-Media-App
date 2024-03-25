import { getUserFollowers } from '@/lib/actions/user/get/getUserFollowers';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const profileId = searchParams.get('profileId');

	const userData = await getUserFollowers(`${profileId}`);

	return Response.json(userData);
}
