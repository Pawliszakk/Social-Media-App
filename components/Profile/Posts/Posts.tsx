import PostTile from '@/components/Post/Tile/PostTile';
import PostsBox from './PostsBox';

interface PostsProps {
	authorName: string;
	posts: string[] | [];
}

const Posts: React.FC<PostsProps> = (props) => {
	return (
		<PostsBox>
			{props.posts.length === 0 || !props.posts ? (
				<p>We found no posts.</p>
			) : (
				props.posts.map((p: any) => (
					<PostTile
						key={p.id}
						postId={p.id}
						likes={p.likes}
						comments={p.comments}
						image={p.image}
						author={p.author}
						commenting={p.commenting}
						hideLikesCount={p.hideLikesCount}
						archived={p.archived}
					/>
				))
			)}
		</PostsBox>
	);
};

export default Posts;
