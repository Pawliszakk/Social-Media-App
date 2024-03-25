import { getAccountData } from '@/lib/actions/user/get/getAccountData';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');

	const userData = await getAccountData(`${userId}`);

	return Response.json(userData);
}
