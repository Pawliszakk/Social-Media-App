'use client';
import { useState } from 'react';
import PostImages from '../PostPage/Images/PostImages';
import PostActions from '../PostPage/PostActions';
import PostLikes from '../PostPage/Likes/PostLikes';

interface PostComponentProps {
	images: string | string[];
	authorName: string;
	isUserLikingPost: boolean;
	postId: string;
	userId: string;
	isUserSavedPost: boolean;
	date: string;
	likes: string[] | [];
	likePost: (postId: string, userId: string) => void;
	unLikePost: (postId: string, userId: string) => void;
	savePost: (postId: string, userId: string) => void;
}

const PostComponent: React.FC<PostComponentProps> = (props) => {
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
		<>
			<PostImages
				images={props.images}
				authorName={props.authorName}
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
			<PostLikes likes={likesCount} date={props.date} />
		</>
	);
};

export default PostComponent;
