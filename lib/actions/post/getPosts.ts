import { Post } from '../Models/post';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getPosts(
	userId: string,
	userBlockedProfiles: [] | string[]
) {
	await connectToDatabase();

	let posts;
	try {
		posts = await Post.find({ archived: false }).populate(
			'author',
			'id name image private imageType blockedUsers'
		);
	} catch (e) {
		throw new Error('Failed to fetch posts');
	}
	const filteredPosts = posts.filter((post) => {

		const isAuthorNotPrivate = !post.author.private;

		const isNotArchived = !post.archive;
		
		const isAuthorBlockingUser = !post.author.blockedUsers.find(
			(id: string) => {
				return id.toString() === userId;
			}
		);
		const isUserBlockingAuthor = userBlockedProfiles.find((id: string) => {
			return id.toString() === post.author.id;
		});

		const shouldIncludePost =
			isAuthorNotPrivate &&
			isNotArchived &&
			isAuthorBlockingUser &&
			!isUserBlockingAuthor;

		return shouldIncludePost ? post : null;
	});
	filteredPosts.reverse();

	return filteredPosts;
}
