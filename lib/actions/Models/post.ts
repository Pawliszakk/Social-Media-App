import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	description: { type: String, required: false, default: '' },
	image: { type: String, required: true },
	commenting: { type: Boolean, required: true, default: true },
	archived: { type: Boolean, required: false, default: false },
	hideLikesCount: { type: Boolean, required: true, default: false },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }],
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
