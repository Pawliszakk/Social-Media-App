import PostTile from '@/components/Post/Tile/PostTile';
import PostsBox from './PostsBox';

interface PostsProps {
	authorName: string;
	posts: string[] | [];
	userId: string;
	showLikes: boolean;
}

const Posts: React.FC<PostsProps> = (props) => {
	return (
		<PostsBox>
			{props.posts.length === 0 || !props.posts ? (
				<p>We found no posts.</p>
			) : (
				props.posts.map((p: any) => {
					const isUserAuthor = p.author.toString() === props.userId;
					return (
						<PostTile
							key={p.id}
							postId={p.id}
							likes={p.likes}
							comments={p.comments}
							image={p.image}
							author={p.author}
							commenting={p.commenting}
							hideLikesCount={p.hideLikesCount}
							showLikes={props.showLikes}
							isUserAuthor={!!isUserAuthor}
						/>
					);
				})
			)}
		</PostsBox>
	);
};

export default Posts;
