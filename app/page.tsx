import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import Post from '@/components/Post/HomePost/Post';
import PostSkeleton from '@/components/Post/HomePost/PostSkeleton';

export default async function Home({
	searchParams,
}: {
	searchParams: { create: string; search: string };
}) {
	const { session, user } = await getSessionData();
	if (!session) {
		permanentRedirect('/auth/login');
	}
	const search = searchParams.search;

	const posts = await getPosts();

	return (
		<>
			{search && <p>Szukanie osób</p>}
			<PostsVariant />

			<Suspense
				fallback={
					<>
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</>
				}
			>
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
