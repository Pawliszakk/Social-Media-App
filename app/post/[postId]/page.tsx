import { getPostById } from '@/lib/actions/post/getPostById';
import { permanentRedirect } from 'next/navigation';

import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import { savePost } from '@/lib/actions/post/savePost';
import PostPage from '@/components/Post/PostPage/PostPage';
import { getUserData } from '@/lib/actions/utils/getUserData';

const postPage = async ({ params }: { params: { postId: string } }) => {
	const { session, user } = await getUserData(
		'blockedUsers',
		'name',
		'image',
		'imageType',
		'likedPosts',
		'following',
		'savedPosts'
	);

	if (!session) {
		permanentRedirect('/auth/login');
	}

	const { post, isUserAllowedToView, isUserAuthor } = await getPostById(
		params.postId,
		user.id,
		user.blockedUsers
	);
	if (!isUserAllowedToView) {
		permanentRedirect(`/profile/${post.author.id}`);
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
		imageType: post.author.imageType,
	};
	return (
		<PostPage
			images={post.image}
			author={author}
			isUserLikingPost={!!isUserLikingPost}
			likePost={likePost}
			unLikePost={unLikePost}
			postId={post.id}
			userId={user.id}
			savePost={savePost}
			isUserSavedPost={!!isUserSavedPost}
			date={post.date}
			likes={post.likes.map((like: string) => like.toString())}
			isUserAuthor={!!isUserAuthor}
			isUserFollowingAuthor={!!isUserFollowingAuthor}
			commenting={post.commenting}
			showLikes={user?.showLikes}
			user={{
				name: user.name,
				image: user.image,
				userId: user.userId,
				imageType: user.imageType,
			}}
			description={post.description}
			hideLikesCount={post.hideLikesCount}
		/>
	);
};

export default postPage;
