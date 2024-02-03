import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	bio: { type: String, required: false, default: '' },
	image: { type: String, required: false, default: '/assets/defaultUser.jpg' },
	sex: { type: String, required: true, default: 'other' },
	private: { type: Boolean, required: true, default: false },
	date: { type: String, required: true },
	theme: { type: String, required: true, default: 'light' },
	provider: { type: String, required: true },
	password: { type: String, required: false },
	posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	likedPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	followers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	following: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	closeFriends: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	],
	savedPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	blockedUsers: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
