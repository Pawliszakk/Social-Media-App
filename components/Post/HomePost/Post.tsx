import classes from './Post.module.scss';
import Link from 'next/link';
import PostAuthor from '../PostPage/PostAuthor';
import PostImages from '../PostPage/PostImages';
import PostActions from '../PostPage/PostActions';
import { savePost } from '@/lib/actions/post/savePost';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import PostLikes from '../PostPage/PostLikes';

interface PostProps {
	postId: string;
	description: string;
	image: string;
	commenting: boolean;
	archived: boolean;
	hideLikesCount: boolean;
	date: string;
	likes: string[] | [];
	comments: string[] | [];
	author: { id: string; name: string; image: string };
	isUserAuthor: boolean;
	isUserFollowingAuthor: boolean;
	userId: string;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
}

const Post: React.FC<PostProps> = async ({
	postId,
	description,
	image,
	commenting,
	archived,
	hideLikesCount,
	date,
	likes,
	comments,
	author,
	isUserAuthor,
	isUserFollowingAuthor,
	userId,
	isUserLikingPost,
	isUserSavedPost,
}) => {
	return (
		<article className={classes.post}>
			<PostAuthor
				image={author.image}
				name={author.name}
				authorId={author.id}
				date={date}
				home
				isUserAuthor={isUserAuthor}
				isUserFollowingAuthor={isUserFollowingAuthor}
				description={description}
			/>
			<PostImages images={image} author={author.name} />
			<PostActions
				likePost={isUserLikingPost ? unLikePost : likePost}
				savePost={savePost}
				userId={userId}
				postId={postId}
				isUserLikingPost={isUserLikingPost}
				isUserSavedPost={isUserSavedPost}
			/>
			<PostLikes likes={likes} date={date} />

			<div className={classes.description}>
				<p>
					<Link href={`/profile/${author.id}`}>{author.name}</Link>{' '}
					{description}
				</p>
			</div>

			<div className={classes.comments}>
				<p>View all {comments.length} comments</p>
			</div>

			<div className={classes.addComment}>
				<form action="">
					<textarea
						name=""
						id=""
						// cols="30"
						// rows="1"
						placeholder="Add comment..."
					></textarea>
				</form>
			</div>
			<hr />
		</article>
	);
};

export default Post;
