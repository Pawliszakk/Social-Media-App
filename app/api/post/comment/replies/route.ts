import { getCommentReplies } from "@/lib/actions/post/comments/getCommentReplies";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const commentId = searchParams.get('commentId');
	const likesSnippet = await getCommentReplies(`${commentId}`);
	return Response.json(likesSnippet);
}
