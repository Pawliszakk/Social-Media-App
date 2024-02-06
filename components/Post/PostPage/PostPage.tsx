'use client';

import { useState } from 'react';
import PostActions from './PostActions';
import PostDescription from './PostDescription';
import classes from './PostPage.module.scss';
import PostImages from './Images/PostImages';
import PostAuthor from './Author/PostAuthor';
import PostComments from './Comments/PostComments';
import PostLikes from './Likes/PostLikes';
import PostAddComment from './Comments/PostAddComment';
import PostSettings from './Author/PostSettings';
import { deletePost } from '@/lib/actions/post/deletePost';
import {
	turnOffCommenting,
	turnOnCommenting,
} from '@/lib/actions/post/switchCommenting';
import { hideLiking, showLiking } from '@/lib/actions/post/switchLiking';
import { archivePost } from '@/lib/actions/post/archivePost';

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
	hideLikesCount: boolean;
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
			setLikesCount((prev) => prev + 1);
			setIsUserLikingPost(true);
			props.likePost(props.postId, props.userId);
		} else {
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
				>
					<PostSettings
						isUserAuthor={props.isUserAuthor}
						isUserFollowingAuthor={props.isUserFollowingAuthor}
						deletePost={deletePost}
						turnOnCommenting={turnOnCommenting}
						turnOffCommenting={turnOffCommenting}
						archivePost={archivePost}
						showLiking={showLiking}
						hideLiking={hideLiking}
						postId={props.postId}
						userId={props.userId}
						commenting={props.commenting}
						hideLikesCount={props.hideLikesCount}
					/>
				</PostAuthor>
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
