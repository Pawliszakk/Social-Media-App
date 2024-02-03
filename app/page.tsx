import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import Post from '@/components/Post/HomePost/Post';
import PostFallback from '@/components/Post/HomePost/PostFallback';

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

			<Suspense fallback={<PostFallback />}>
				{posts.map((post) => {
					const isUserAuthor = post.author.id === user.userId;
					const isUserFollowingAuthor = user.following.find(
						(id: string) => id.toString() === post.author.id
					);
					const isUserLikingPost = user.likedPosts.find(
						(id: string) => id.toString() === post.id
					);

					const isUserSavedPost = user.savedPosts.find(
						(id: string) => id.toString() === post.id
					);
					return (
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
							isUserAuthor={!!isUserAuthor}
							isUserFollowingAuthor={!!isUserFollowingAuthor}
							userId={user.userId}
							isUserLikingPost={!!isUserLikingPost}
							isUserSavedPost={!!isUserSavedPost}
						/>
					);
				})}
			</Suspense>
		</>
	);
}
