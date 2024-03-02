'use client';
import { useState } from 'react';
import PostImages from '../PostPage/Images/PostImages';
import PostLikes from '../PostPage/Likes/PostLikes';
import PostActions from '../PostPage/Actions/PostActions';

interface PostComponentProps {
	authorName: string;
	postId: string;
	userId: string;
	date: string;
	images: string | string[];
	likes: string[] | [];
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
	isUserAuthor: boolean;
	showLikes: boolean;
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
			<PostLikes
				likes={likesCount}
				date={props.date}
				showLikes={props.showLikes}
				isUserAuthor={props.isUserAuthor}
			/>
		</>
	);
};

export default PostComponent;
