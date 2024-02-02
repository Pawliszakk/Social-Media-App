import { checkSession } from '@/lib/actions/utils/checkSession';
import Post from '@/components/Post/Post';
import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import Spinner from '@/components/UI/Spinner';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import PostSkeleton from '@/components/Post/PostSkeleton';

export default async function Home({
	searchParams,
}: {
	searchParams: { create: string; search: string };
}) {
	const { session, user } = await getSessionData();

	const search = searchParams.search;

	const posts = await getPosts();

	//AS A SUSPENSE ADD A SKELETON LOADING

	return (
		<>
			{search && <p>Szukanie osób</p>}
			<PostsVariant />

			<Suspense fallback={<Spinner />}>
				<PostSkeleton />
				{posts.map((post) => (
					<Post
						key={post.id}
						postId={post.id}
						description={post.description}
						image={post.image}
						commenting={post.commenting}
						archived={post.archived}
						hideLikesCount={post.hideLikesCount}
						date={post.date}
						likes={post.likes}
						comments={post.comments}
						author={post.author}
					/>
				))}
			</Suspense>
		</>
	);
}
