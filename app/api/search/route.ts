import { searchUsers } from '@/lib/actions/Search/SearchUsers';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');

	const searchedUsers = await searchUsers(`${search}`);

	return Response.json(searchedUsers);
}
