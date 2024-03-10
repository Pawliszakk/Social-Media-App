import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';
import PostFallback from '@/components/Post/HomePost/PostFallback';
import PostDescription from '@/components/Post/PostPage/Description/PostDescription';
import { likePost, unLikePost } from '@/lib/actions/post/likePost';
import classes from './page.module.scss';
import { savePost } from '@/lib/actions/post/savePost';
import PostComponent from '@/components/Post/HomePost/PostComponent';
import PostAuthor from '@/components/Post/PostPage/Author/PostAuthor';
import { switchCommenting } from '@/lib/actions/post/switchCommenting';
import { switchLiking } from '@/lib/actions/post/switchLiking';
import PostSettings from '@/components/Post/Settings/PostSettings';
import NoPostsFallback from '@/components/Post/HomePost/NoPostsFallback';
import { getUserData } from '@/lib/actions/utils/getUserData';
import AsideSuggestions from '@/components/Home/AsideSuggestions';

export default async function Home() {
	const { session, user } = await getUserData(
		'following likedPosts savedPosts showLikes blockedUsers image name imageType'
	);
	if (!session) {
		permanentRedirect('/auth/login');
	}
	const posts = await getPosts(user.id, user.blockedUsers);

	const arePostsEmpty = posts.length === 0 || !posts;

	return (
		<div className={classes.box}>
			<div className={classes.posts}>
				<PostsVariant />

				<Suspense fallback={<PostFallback />}>
					{arePostsEmpty ? (
						<NoPostsFallback />
					) : (
						posts.map((post) => {
							const isUserAuthor = post.author.id === user.id;
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
										userId={user.id}
										date={post.date}
										isUserFollowingAuthor={!!isUserFollowingAuthor}
										isUserAuthor={isUserAuthor}
										imageType={post.author.imageType}
									>
										<PostSettings
											isUserFollowingAuthor={!!isUserFollowingAuthor}
											isUserAuthor={!!isUserAuthor}
											switchCommenting={switchCommenting}
											switchLiking={switchLiking}
											postId={post.id.toString()}
											userId={user.id}
											commenting={post.commenting}
											hideLikesCount={post.hideLikesCount}
											authorId={post.author.id}
											userImage={post.author.image}
											userImageType={post.author.userImageType}
											images={post.image}
											authorName={post.author.name}
										/>
									</PostAuthor>
									<PostComponent
										images={post.image}
										authorName={post.author.name}
										isUserLikingPost={!!isUserLikingPost}
										likePost={likePost}
										unLikePost={unLikePost}
										postId={post.id}
										userId={user.id}
										savePost={savePost}
										isUserSavedPost={!!isUserSavedPost}
										date={post.date}
										isUserAuthor={isUserAuthor}
										showLikes={user.showLikes}
										likes={post.likes.map((like: string) => like.toString())}
									/>

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
						})
					)}
				</Suspense>
			</div>
			<AsideSuggestions
				image={user.image}
				imageType={user.imageType}
				name={user.name}
				userId={user.id}
			/>
		</div>
	);
}
