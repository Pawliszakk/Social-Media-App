'use client';

import { useState } from 'react';
import PostActions from './PostActions';
import PostAuthor from './PostAuthor';
import PostComments from './PostComments';
import PostDescription from './PostDescription';
import PostImages from './PostImages';
import PostLikes from './PostLikes';
import PostAddComment from './PostAddComment';
import classes from './PostPage.module.scss';

interface PostPageProps {
	images: string | string[];
	author: { name: string; id: string; image: string };
	isUserLikingPost: boolean;
	likePost: (postId: string, userId: string) => void;
	unLikePost: (postId: string, userId: string) => void;
	postId: string;
	userId: string;
	savePost: (postId: string, userId: string) => void;
	isUserSavedPost: boolean;
	date: string;
	isUserAuthor: boolean;
	likes: string[] | [];
	isUserFollowingAuthor: boolean;
	commenting: boolean;
	description: string;
	user: {
		name: string | null | undefined;
		image: string | null | undefined;
		userId: string | null | undefined;
	};
}

const PostPage: React.FC<PostPageProps> = (props) => {
	const [likesCount, setLikesCount] = useState(props.likes.length);
	const [isUserLikingPost, setIsUserLikingPost] = useState(
		props.isUserLikingPost
	);

	const likePostHandler = () => {
		if (!isUserLikingPost) {
			console.log('liking');
			setLikesCount((prev) => prev + 1);
			setIsUserLikingPost(true);
			props.likePost(props.postId, props.userId);
		} else {
			console.log('unliking');
			setLikesCount((prev) => prev - 1);
			setIsUserLikingPost(false);
			props.unLikePost(props.postId, props.userId);
		}
	};

	return (
		<div className={classes.box}>
			<PostImages
				images={props.images}
				authorName={props.author.name}
				isUserLikingPost={isUserLikingPost}
				likePost={likePostHandler}
			/>

			<div className={classes.panel}>
				<PostAuthor
					name={props.author.name}
					image={props.author.image}
					authorId={props.author.id}
					date={props.date}
					isUserFollowingAuthor={props.isUserFollowingAuthor}
					isUserAuthor={props.isUserAuthor}
				/>
				<PostDescription
					image={props.author.image}
					description={props.description}
					authorId={props.author.id}
					authorName={props.author.name}
				/>

				<PostComments isCommenting={props.commenting} />

				<PostActions
					likePost={likePostHandler}
					savePost={props.savePost}
					userId={props.userId}
					postId={props.postId}
					isUserLikingPost={isUserLikingPost}
					isUserSavedPost={props.isUserSavedPost}
				/>
				<PostLikes likes={likesCount} date={props.date} />

				{props.commenting && (
					<PostAddComment
						name={props.user.name}
						image={props.user.image}
						userId={props.user.userId}
					/>
				)}
			</div>
		</div>
	);
};

export default PostPage;
