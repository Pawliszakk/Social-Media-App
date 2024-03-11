import PostTile from '@/components/Post/Tile/PostTile';

import classes from './page.module.scss';
import PostsBox from '@/components/Profile/Posts/PostsBox';
import { getExploreData } from '@/lib/actions/utils/explore/getExploreData';

export default async function ExplorePage() {
	const { posts, user } = await getExploreData();

	return (
		<>
			<div className={classes.box}>
				<h1>Explore posts from users all around the world!</h1>
				<PostsBox>
					{posts.map((p: any) => {
						const isUserAuthor = p.author.id.toString() === user.id.toString();
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
								isUserAuthor={isUserAuthor}
								showLikes={user.showLikes}
							/>
						);
					})}
				</PostsBox>
			</div>
		</>
	);
}
