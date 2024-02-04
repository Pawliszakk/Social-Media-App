'use client';
import { useState } from 'react';
import PostActions from './PostActions';
import PostImages from './PostImages';
import PostLikes from './PostLikes';
import { likePost } from '@/lib/actions/post/likePost';

interface PostComponentProps {
	images: string | string[];
	postAuthor: string;
	isUserLikingPost: boolean;
	likePost: (postId: string, userId: string) => void;
	unLikePost: (postId: string, userId: string) => void;
	postId: string;
	userId: string;
	savePost: (postId: string, userId: string) => void;
	isUserSavedPost: boolean;
	date: string;
	likes: string[] | [];
}

const PostComponent: React.FC<PostComponentProps> = (props) => {
	const [likesCount, setLikesCount] = useState(props.likes.length);
	const [isUserLikingPost, setIsUserLikingPost] = useState(
		props.isUserLikingPost
	);
	const likePostHandler = async () => {
		if (!isUserLikingPost) {
			setLikesCount((prev) => prev + 1);
			setIsUserLikingPost(true);
			await props.likePost(props.postId, props.userId);
		} else {
			setLikesCount((prev) => prev - 1);
			setIsUserLikingPost(false);
			await props.unLikePost(props.postId, props.userId);
		}
	};

	return (
		<>
			<PostImages
				images={props.images}
				author={props.postAuthor}
				isUserLikingPost={isUserLikingPost}
				likePost={likePostHandler}
			/>
			<PostActions
				likePost={likePostHandler}
				savePost={props.savePost}
				userId={props.userId}
				postId={props.postId}
				isUserLikingPost={isUserLikingPost}
				isUserSavedPost={props.isUserSavedPost}
			/>
			<PostLikes likes={likesCount} date={props.date} />{' '}
		</>
	);
};

export default PostComponent;
