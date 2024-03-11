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
			post={{
				images: post.image,
				id: post.id,
				date: post.date,
				description: post.description,
				hideLikesCount: post.hideLikesCount,
				commenting: post.commenting,
				likes: post.likes.map((like: string) => like.toString()),
			}}
			author={author}
			user={{
				name: user.name,
				image: user.image,
				id: user.id,
				imageType: user.imageType,
				showLikes: user.showLikes,
				isUserLikingPost,
				isUserSavedPost,
				isUserAuthor,
				isUserFollowingAuthor,
			}}
		/>
	);
};

export default postPage;
