import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/getPosts';
import { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';
import PostFallback from '@/components/Post/HomePost/PostFallback';
import PostDescription from '@/components/Post/PostPage/Description/PostDescription';
import classes from './page.module.scss';
import PostComponent from '@/components/Post/HomePost/PostComponent';
import PostAuthor from '@/components/Post/PostPage/Author/PostAuthor';
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
						posts.map((post: any) => {
							const isUserAuthor = post.author.id === user.id;
							const isUserFollowingAuthor = !!user.following.find(
								(id: string) => id.toString() === post.author.id
							);
							const isUserLikingPost = !!user.likedPosts.find(
								(id: string) => id.toString() === post.id
							);

							const isUserSavedPost = !!user.savedPosts.find(
								(id: string) => id.toString() === post.id
							);
							const postAuthor = {
								id: post.author.id.toString(),
								name: post.author.name,
								image: post.author.image,
								imageType: post.author.imageType,
							};
							const postValues = {
								id: post.id.toString(),
								date: post.date,
								commenting: post.commenting,
								hideLikesCount: post.hideLikesCount,
								images: post.image,
								likes: post.likes.map((id: string) => id.toString()),
							};
							return (
								<article className={classes.post} key={post.id}>
									<PostAuthor
										author={postAuthor}
										userId={user.id}
										date={post.date}
										isUserFollowingAuthor={isUserFollowingAuthor}
										isUserAuthor={isUserAuthor}
									>
										<PostSettings
											user={{
												isUserFollowingAuthor,
												isUserAuthor,
											}}
											post={postValues}
											author={postAuthor}
										/>
									</PostAuthor>
									<PostComponent
										post={postValues}
										authorName={post.author.name}
										isUserLikingPost={isUserLikingPost}
										isUserSavedPost={isUserSavedPost}
										isUserAuthor={isUserAuthor}
										showLikes={user.showLikes}
									/>

									<PostDescription
										description={post.description}
										author={postAuthor}
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
			<AsideSuggestions user={user} />
		</div>
	);
}
