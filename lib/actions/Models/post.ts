import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	commenting: { type: Boolean, required: true, default: true },
	archived: { type: Boolean, required: false, default: false },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }],
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
