import { getUserFollowers } from '@/lib/actions/user/getUserFollowers';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const profileId = searchParams.get('profileId');

	const userData = await getUserFollowers(`${profileId}`);

	return Response.json(userData);
}
