import PostTile from '../Post/Tile/PostTile';
import PostsBox from './PostsBox';
import classes from './PostsBox.module.scss';

interface PostsProps {
	posts: string[] | [];
	authorName: string;
}

const ProfilePosts: React.FC<PostsProps> = (props) => {
	return (
		<PostsBox>
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

export default ProfilePosts;
