import { getPostById } from '@/lib/actions/post/getPostById';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';

const postPage = async ({ params }: { params: { postId: string } }) => {
	const { user } = await getSessionData();

	const { post, isUserAllowedToView, isUserAuthor } = await getPostById(
		params.postId,
		user?.userId
	);
	const postAuthor = post.author.toString();

	if (!isUserAllowedToView) {
		permanentRedirect(`/profile/${postAuthor}`);
	}
	return <h1>{params.postId}</h1>;
};

export default postPage;
