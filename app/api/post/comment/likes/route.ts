import { getCommentLikes } from '@/lib/actions/post/comments/getCommentLikes';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const commentId = searchParams.get('commentId');
	const likesSnippet = await getCommentLikes(`${commentId}`);
	return Response.json(likesSnippet);
}
