import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import { savePost } from '@/lib/actions/post/savePost';
import PostPage from '@/components/Post/PostPage/PostPage';
import { getPostData } from '@/lib/actions/utils/post/getPostData';

const postPage = async ({ params }: { params: { postId: string } }) => {
	const {
		user,
		post,
		isUserLikingPost,
		isUserAuthor,
		isUserFollowingAuthor,
		isUserSavedPost,
		author,
	} = await getPostData(params.postId);

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
			showLikes={user.showLikes}
			user={{
				name: user.name,
				image: user.image,
				userId: user.id,
				imageType: user.imageType,
			}}
			description={post.description}
			hideLikesCount={post.hideLikesCount}
		/>
	);
};

export default postPage;
