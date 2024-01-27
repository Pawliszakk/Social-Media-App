import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	id: { type: String, required: true },
	author: { type: String, required: true },
	commenting: { type: Boolean, required: true },
	archived: { type: Boolean, required: true },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }],
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
