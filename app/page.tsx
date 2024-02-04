import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import PostFallback from '@/components/Post/HomePost/PostFallback';
import PostAuthor from '@/components/Post/PostPage/PostAuthor';
import PostImages from '@/components/Post/PostPage/PostImages';
import PostActions from '@/components/Post/PostPage/PostActions';
import PostLikes from '@/components/Post/PostPage/PostLikes';
import PostDescription from '@/components/Post/PostPage/PostDescription';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import classes from './page.module.scss';
import { savePost } from '@/lib/actions/post/savePost';

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
						<article className={classes.post} key={post.id}>
							<PostAuthor
								image={post.author.image}
								name={post.author.name}
								authorId={post.author.id}
								date={post.date}
								isUserAuthor={isUserAuthor}
								isUserFollowingAuthor={isUserFollowingAuthor}
							/>
							<PostImages images={post.image} author={post.author.name} />
							<PostActions
								likePost={isUserLikingPost ? unLikePost : likePost}
								savePost={savePost}
								userId={user.userId}
								postId={post.id}
								isUserLikingPost={isUserLikingPost}
								isUserSavedPost={isUserSavedPost}
							/>
							<PostLikes likes={post.likes} date={post.date} />

							<PostDescription
								description={post.description}
								authorName={post.author.name}
								authorId={post.author.id}
								home
							/>

							<div className={classes.comments}>
								<p>View all {post.comments.length} comments</p>
							</div>

							<div className={classes.addComment}>
								<form action="">
									<textarea
										name=""
										id=""
										// cols="30"
										// rows="1"
										placeholder="Add comment..."
									></textarea>
								</form>
							</div>
							<hr />
						</article>
					);
				})}
			</Suspense>
		</>
	);
}
