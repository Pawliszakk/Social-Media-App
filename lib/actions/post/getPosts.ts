import { Post } from '../Models/post';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getPosts() {
	await connectToDatabase();

	let posts;
	try {
		posts = await Post.find({ archived: false }).populate(
			'author',
			'id name image private'
		);
	} catch (e) {
		throw new Error('Failed to fetch posts');
	}

	const filteredPosts = posts.filter(
		(post) => !post.author.private && !post.archive
	);

	filteredPosts.reverse();
	
	return filteredPosts;
}
