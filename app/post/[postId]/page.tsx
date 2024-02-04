import { getPostById } from '@/lib/actions/post/getPostById';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';

import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import { savePost } from '@/lib/actions/post/savePost';
import PostPage from '@/components/Post/PostPage/PostPage';

const postPage = async ({ params }: { params: { postId: string } }) => {
	const { session, user } = await getSessionData();
	if (!session) {
		permanentRedirect('/auth/login');
	}

	const { post, isUserAllowedToView, isUserAuthor } = await getPostById(
		params.postId,
		user?.userId
	);
	const postAuthor = post.author.toString();

	if (!isUserAllowedToView) {
		permanentRedirect(`/profile/${postAuthor}`);
	}

	const isUserLikingPost = user.likedPosts.find(
		(id: string) => id.toString() === post.id
	);
	const isUserFollowingAuthor = user.following.find(
		(id: string) => id.toString() === post.author.id
	);

	const isUserSavedPost = user.savedPosts.find(
		(id: string) => id.toString() === post.id
	);
	const author = {
		name: post.author.name,
		id: post.author._id.toString(),
		image: post.author.image,
	};
	return (
		<PostPage
			images={post.image}
			author={author}
			isUserLikingPost={!!isUserLikingPost}
			likePost={likePost}
			unLikePost={unLikePost}
			postId={post.id}
			userId={user.userId}
			savePost={savePost}
			isUserSavedPost={!!isUserSavedPost}
			date={post.date}
			likes={post.likes}
			isUserAuthor={!!isUserAuthor}
			isUserFollowingAuthor={!!isUserFollowingAuthor}
			commenting={post.commenting}
			user={{ name: user.name, image: user.image, userId: user.userId }}
			description={post.description}
		/>
	);
};

export default postPage;
