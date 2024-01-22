import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	id: { type: String, required: true },
	author: { type: String, required: true },
	commenting: { type: Boolean, required: true },
	archived: { type: Boolean, required: true },
	date: { type: String, required: true },
	// likes: ['id użytkowników co polubili post'],
	// comments: ['id komentarzy posta'],
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
