import { Post } from '../Models/post';
import { connectToDatabase } from '../utils/connectToDatabase';

export async function getPosts() {
	await connectToDatabase();
	let posts;
	try {
		posts = await Post.find({}).populate('author', 'id name image');
	} catch (e) {
		throw new Error('Failed to fetch posts');
	}
	posts.reverse();
	return posts;
}
