import PostsVariant from '@/components/Home/PostsVariant';
import { getPosts } from '@/lib/actions/post/get/getPosts';
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
import PostAddComment from '@/components/Post/PostPage/Comments/PostAddComment';
import CommentsLink from '@/components/Post/HomePost/CommentsLink';
import Stories from '@/components/Home/Stories/Stories';

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
				<Stories user={user} />
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
										userId={user.id}
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

									<CommentsLink
										commentsLength={post.comments}
										postId={post.id.toString()}
									/>

									<PostAddComment
										postId={post.id.toString()}
										user={{
											image: user.image,
											imageType: user.imageType,
											name: user.name,
											id: user.id.toString(),
										}}
										home
									/>
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
