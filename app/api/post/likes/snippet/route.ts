import { getLikesSnippet } from '@/lib/actions/post/getLikesSnippet';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get('postId');
	const likesSnippet = await getLikesSnippet(`${postId}`);

	return Response.json(likesSnippet);
}
