import { getPostLikes } from '@/lib/actions/post/getPostLikes';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get('postId');

	const postLikes = await getPostLikes(`${postId}`);

	return Response.json(postLikes);
}
