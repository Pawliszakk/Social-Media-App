import PostTile from '@/components/Post/Tile/PostTile';
import { getPosts } from '@/lib/actions/post/getPosts';
import { checkSession } from '@/lib/actions/utils/checkSession';
import classes from './page.module.scss';

export default async function ExplorePage() {
	await checkSession();

	const posts = await getPosts();

	return (
		<>
			<div className={classes.box}>
				<h1>Explore posts from users all around the world!</h1>

				<div className={classes.posts}>
					{' '}
					{posts.map((p: any) => (
						<PostTile
							key={p.id}
							postId={p.id}
							hideLikesCount={p.hideLikesCount}
							archived={p.archived}
							likes={p.likes}
							comments={p.comments}
							image={p.image}
							author={p.author}
							commenting={p.commenting}
						/>
					))}
				</div>
			</div>
		</>
	);
}
