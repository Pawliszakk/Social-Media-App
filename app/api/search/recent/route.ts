import { getRecentSearches } from '@/lib/actions/user/get/getRecentSearches';

export async function GET(request: Request) {
	const recentSearchedUsers = await getRecentSearches();

	return Response.json(recentSearchedUsers);
}
