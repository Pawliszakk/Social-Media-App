import { getReplyLikes } from '@/lib/actions/post/comments/getReplyLikes';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const replyId = searchParams.get('replyId');
	const likesSnippet = await getReplyLikes(`${replyId}`);
	return Response.json(likesSnippet);
}
