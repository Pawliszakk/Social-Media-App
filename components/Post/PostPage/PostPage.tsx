'use client';

import { useState } from 'react';
import classes from './PostPage.module.scss';
import PostImages from './Images/PostImages';
import PostAuthor from './Author/PostAuthor';
import PostComments from './Comments/PostComments';
import PostLikes from './Likes/PostLikes';
import PostAddComment from './Comments/PostAddComment';
import { switchLiking } from '@/lib/actions/post/switchLiking';
import { switchCommenting } from '@/lib/actions/post/switchCommenting';
import PostDescription from './Description/PostDescription';
import PostActions from './Actions/PostActions';
import PostSettings from '../Settings/PostSettings';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';

interface PostPageProps {
	post: {
		images: string | string[];
		id: string;
		date: number;
		hideLikesCount: boolean;
		description: string;
		commenting: boolean;
		likes: string[] | [];
	};
	author: { name: string; id: string; image: string; imageType: string };

	user: {
		name: string;
		image: string;
		id: string;
		imageType: string;
		showLikes: boolean;
		isUserLikingPost: boolean;
		isUserSavedPost: boolean;
		isUserAuthor: boolean;
		isUserFollowingAuthor: boolean;
	};
}

const PostPage: React.FC<PostPageProps> = ({ post, author, user }) => {
	const [likesCount, setLikesCount] = useState(post.likes.length);
	const [isUserLikingPost, setIsUserLikingPost] = useState(
		user.isUserLikingPost
	);
	const likePostHandler = () => {
		if (!isUserLikingPost) {
			setLikesCount((prev) => prev + 1);
			setIsUserLikingPost(true);
			likePost(post.id);
		} else {
			setLikesCount((prev) => prev - 1);
			setIsUserLikingPost(false);
			unLikePost(post.id);
		}
	};
	return (
		<div className={classes.box}>
			<PostImages
				images={post.images}
				authorName={author.name}
				isUserLikingPost={isUserLikingPost}
				likePost={likePostHandler}
			/>

			<div className={classes.panel}>
				<PostAuthor
					name={author.name}
					image={author.image}
					imageType={author.imageType}
					date={post.date}
					authorId={author.id}
					isUserFollowingAuthor={user.isUserFollowingAuthor}
					isUserAuthor={user.isUserAuthor}
					userId={user.id}
				>
					<PostSettings
						isUserFollowingAuthor={user.isUserFollowingAuthor}
						isUserAuthor={user.isUserAuthor}
						switchCommenting={switchCommenting}
						postId={post.id}
						userId={user.id}
						commenting={post.commenting}
						hideLikesCount={post.hideLikesCount}
						switchLiking={switchLiking}
						authorId={author.id}
						images={post.images}
						authorName={author.name}
						userImage={author.image}
						userImageType={author.imageType}
					/>
				</PostAuthor>
				<PostDescription
					image={author.image}
					description={post.description}
					authorId={author.id}
					authorName={author.name}
					imageType={author.imageType}
				/>

				<PostComments isCommenting={post.commenting} />

				<PostActions
					likePost={likePostHandler}
					postId={post.id}
					isUserLikingPost={isUserLikingPost}
					isUserSavedPost={user.isUserSavedPost}
				/>
				<PostLikes
					likes={likesCount}
					date={post.date}
					showLikes={user.showLikes}
					isUserAuthor={user.isUserAuthor}
				/>

				{post.commenting && (
					<PostAddComment
						name={user.name}
						image={user.image}
						userId={user.id}
						imageType={user.imageType}
					/>
				)}
			</div>
		</div>
	);
};

export default PostPage;
