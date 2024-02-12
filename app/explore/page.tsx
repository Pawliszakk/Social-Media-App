import PostTile from '@/components/Post/Tile/PostTile';
import { getPosts } from '@/lib/actions/post/getPosts';
import { checkSession } from '@/lib/actions/utils/checkSession';
import classes from './page.module.scss';
import Posts from '@/components/Profile/Posts/Posts';
import PostsBox from '@/components/Profile/Posts/PostsBox';

export default async function ExplorePage() {
	await checkSession();

	const posts = await getPosts();
	return (
		<>
			<div className={classes.box}>
				<h1>Explore posts from users all around the world!</h1>
				<PostsBox>
					{posts.map((p: any) => (
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
					))}
				</PostsBox>
			</div>
		</>
	);
}
