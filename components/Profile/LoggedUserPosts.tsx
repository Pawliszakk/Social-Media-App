import PostTile from '../Post/Tile/PostTile';
import PostsBox from './PostsBox';
import PostsLinks from './PostsLinks';
import classes from './PostsBox.module.scss';

interface LoggedUserPostsProps {
	posts: string[] | [];
	savedPosts: string[] | [];
	profileId: string;
	authorName: string;
}

const LoggedUserPosts: React.FC<LoggedUserPostsProps> = (props) => {
	return (
		<PostsBox>
			<PostsLinks profileId={props.profileId} />
			<div className={classes.posts}>
				{props.posts.map((post: any) => (
					<PostTile
						key={post.id}
						postId={post.id}
						hideLikesCount={post.hideLikesCount}
						commenting={post.commenting}
						archived={post.archived}
						likes={post.likes}
						comments={post.comments}
						image={post.image}
						author={props.authorName}
					/>
				))}
			</div>
		</PostsBox>
	);
};

export default LoggedUserPosts;
