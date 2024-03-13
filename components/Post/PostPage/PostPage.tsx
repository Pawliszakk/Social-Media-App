'use client';

import { useState } from 'react';
import classes from './PostPage.module.scss';
import PostImages from './Images/PostImages';
import PostAuthor from './Author/PostAuthor';
import PostComments from './Comments/PostComments';
import PostLikes from './Likes/PostLikes';
import PostAddComment from './Comments/PostAddComment';
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
	author: { id: string; name: string; image: string; imageType: string };

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
				authorName={author.name}
				images={post.images}
				isUserLikingPost={isUserLikingPost}
				likePost={likePostHandler}
			/>

			<div className={classes.panel}>
				<PostAuthor
					author={{ ...author }}
					date={post.date}
					isUserFollowingAuthor={user.isUserFollowingAuthor}
					isUserAuthor={user.isUserAuthor}
					userId={user.id}
				>
					<PostSettings
						user={{ ...user }}
						post={{ ...post }}
						author={{ ...author }}
					/>
				</PostAuthor>
				<PostDescription
					description={post.description}
					author={{ ...author }}
				/>

				<PostComments isCommenting={post.commenting} />

				<PostActions
					likePost={likePostHandler}
					postId={post.id}
					isUserLikingPost={isUserLikingPost}
					isUserSavedPost={user.isUserSavedPost}
				/>
				<PostLikes
					userId={user.id}
					postId={post.id}
					likes={likesCount}
					date={post.date}
					showLikes={user.showLikes}
					isUserAuthor={user.isUserAuthor}
				/>

				{post.commenting && <PostAddComment user={{ ...user }} />}
			</div>
		</div>
	);
};

export default PostPage;
