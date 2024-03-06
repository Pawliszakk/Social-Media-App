import { Post } from '../Models/post';

export async function getPosts(
	userId: string,
	userBlockedProfiles: [] | string[]
) {
	let posts;
	try {
		posts = await Post.find({
			archived: false,
		}).populate('author', 'id name image private imageType blockedUsers');
	} catch (e) {
		throw new Error('Failed to fetch posts');
	}

	const filteredPosts = posts.filter((post) => {
		const isAuthorPrivate = post.author.private;
		const isAuthorBlockingUser = !post.author.blockedUsers.find(
			(id: string) => {
				return id.toString() === userId;
			}
		);
		const isUserBlockingAuthor = userBlockedProfiles.find((id: string) => {
			return id.toString() === post.author.id;
		});

		const shouldIncludePost =
			!isAuthorPrivate && isAuthorBlockingUser && !isUserBlockingAuthor;

		return shouldIncludePost ? post : null;
	});

	return filteredPosts.reverse();
}
