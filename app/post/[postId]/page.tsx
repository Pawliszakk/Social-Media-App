import { getPostById } from '@/lib/actions/post/getPostById';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import classes from './page.module.scss';
import PostAuthor from '@/components/Post/PostPage/PostAuthor';
import PostComments from '@/components/Post/PostPage/PostComments';
import PostAddComment from '@/components/Post/PostPage/PostAddComment';
import PostImages from '@/components/Post/PostPage/PostImages';
import PostLikes from '@/components/Post/PostPage/PostLikes';
import PostActions from '@/components/Post/PostPage/PostActions';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import { savePost } from '@/lib/actions/post/savePost';

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
	return (
		<div className={classes.box}>
			<PostImages images={post.image} author={post.author.name} />

			<div className={classes.panel}>
				<PostAuthor
					name={post.author.name}
					image={post.author.image}
					description={post.description}
					authorId={post.author.id}
					date={post.date}
				/>

				<PostComments isCommenting={post.commenting} />

				<PostActions
					likePost={isUserLikingPost ? unLikePost : likePost}
					savePost={savePost}
					userId={user.userId}
					postId={post.id}
					isUserLikingPost={!!isUserLikingPost}
				/>
				<PostLikes likes={post.likes} date={post.date} />

				{post.commenting && (
					<PostAddComment
						name={user.name}
						image={user.image}
						userId={user.userId}
					/>
				)}
			</div>
		</div>
	);
};

export default postPage;
