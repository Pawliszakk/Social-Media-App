import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	bio: { type: String, required: false, default: '' },
	image: { type: String, required: false, default: '/assets/defaultUser.JPG' },
	imageType: { type: String, required: true, default: 'provider' },
	sex: { type: String, required: true, default: 'other' },
	website: { type: String, required: false, default: '' },
	private: { type: Boolean, required: true, default: false },
	showLikes: { type: Boolean, required: false, default: true },
	date: { type: String, required: true },
	theme: { type: String, required: true, default: 'light' },
	provider: { type: String, required: true },
	password: { type: String, required: false },
	showInSuggestions: { type: Boolean, required: false, default: true },
	posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	stories: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Story' }],
	likedPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	likedComments: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' },
	],
	likedReplies: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'CommentReply' },
	],
	followers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	following: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	recentSearches: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	],
	closeFriends: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	],
	savedPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	blockedUsers: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	],
	sentFollowRequests: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'followRequest' },
	],
	recievedFollowRequests: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'followRequest' },
	],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
