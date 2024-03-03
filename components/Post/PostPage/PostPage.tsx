'use client';

import { useState } from 'react';
import classes from './PostPage.module.scss';
import PostImages from './Images/PostImages';
import PostAuthor from './Author/PostAuthor';
import PostComments from './Comments/PostComments';
import PostLikes from './Likes/PostLikes';
import PostAddComment from './Comments/PostAddComment';
import { deletePost } from '@/lib/actions/post/deletePost';
import { switchLiking } from '@/lib/actions/post/switchLiking';
import { archivePost } from '@/lib/actions/post/archivePost';
import { switchCommenting } from '@/lib/actions/post/switchCommenting';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import PostDescription from './Description/PostDescription';
import PostActions from './Actions/PostActions';
import PostSettings from '../Settings/PostSettings';

interface PostPageProps {
	postId: string;
	userId: string;
	date: number;
	description: string;
	author: { name: string; id: string; image: string; imageType: string };
	likes: string[] | [];
	images: string | string[];
	showLikes: boolean;
	isUserLikingPost: boolean;
	isUserSavedPost: boolean;
	isUserAuthor: boolean;
	isUserFollowingAuthor: boolean;
	commenting: boolean;
	hideLikesCount: boolean;
	unLikePost: (postId: string, userId: string) => void;
	savePost: (postId: string, userId: string) => void;
	likePost: (postId: string, userId: string) => void;
	user: {
		name: string | null | undefined;
		image: string | null | undefined;
		userId: string | null | undefined;
		imageType: string | null | undefined;
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
					imageType={props.author.imageType}
					date={props.date}
					authorId={props.author.id}
					followUser={followUser}
					unFollowUser={unFollowUser}
					isUserFollowingAuthor={props.isUserFollowingAuthor}
					isUserAuthor={props.isUserAuthor}
					userId={props.userId}
				>
					<PostSettings
						isUserFollowingAuthor={props.isUserFollowingAuthor}
						isUserAuthor={props.isUserAuthor}
						deletePost={deletePost}
						switchCommenting={switchCommenting}
						archivePost={archivePost}
						postId={props.postId}
						userId={props.userId}
						commenting={props.commenting}
						hideLikesCount={props.hideLikesCount}
						switchLiking={switchLiking}
						authorId={props.author.id}
						followUser={followUser}
						unFollowUser={unFollowUser}
						images={props.images}
						authorName={props.author.name}
						userImage={props.author.image}
						userImageType={props.author.imageType}
					/>
				</PostAuthor>
				<PostDescription
					image={props.author.image}
					description={props.description}
					authorId={props.author.id}
					authorName={props.author.name}
					imageType={props.author.imageType}
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
				<PostLikes
					likes={likesCount}
					date={props.date}
					showLikes={props.showLikes}
					isUserAuthor={props.isUserAuthor}
				/>

				{props.commenting && (
					<PostAddComment
						name={props.user.name}
						image={props.user.image}
						userId={props.user.userId}
						imageType={props.user.imageType}
					/>
				)}
			</div>
		</div>
	);
};

export default PostPage;
