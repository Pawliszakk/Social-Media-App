'use client';
import { useState } from 'react';
import PostImages from '../PostPage/Images/PostImages';
import PostLikes from '../PostPage/Likes/PostLikes';
import PostActions from '../PostPage/Actions/PostActions';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';

interface PostComponentProps {
	post: {
		id: string;
		images: string | string[];
		date: number;
		likes: string[] | [];
	};
	authorName: string;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
	isUserAuthor: boolean;
	showLikes: boolean;
}

const PostComponent: React.FC<PostComponentProps> = (props) => {
	const { post } = props;
	const [likesCount, setLikesCount] = useState(post.likes.length);
	const [isUserLikingPost, setIsUserLikingPost] = useState(
		props.isUserLikingPost
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
		<>
			<PostImages
				images={post.images}
				authorName={props.authorName}
				isUserLikingPost={isUserLikingPost}
				likePost={likePostHandler}
			/>
			<PostActions
				likePost={likePostHandler}
				postId={post.id}
				isUserLikingPost={isUserLikingPost}
				isUserSavedPost={props.isUserSavedPost}
			/>
			<PostLikes
				likes={likesCount}
				date={post.date}
				showLikes={props.showLikes}
				isUserAuthor={props.isUserAuthor}
			/>
		</>
	);
};

export default PostComponent;
