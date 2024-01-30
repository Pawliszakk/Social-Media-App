interface PostsProps {
	posts: any;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
	return (
		<ul>
			{posts.map((p: any) => {
				<li key={p}>{p}</li>;
			})}
		</ul>
	);
};

export default Posts;
