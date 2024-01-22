import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	//Add default user image
	sex: { type: String, required: true, default: 'other' },
	private: { type: Boolean, required: true, default: false },
	date: { type: String, required: true },
	theme: { type: String, required: true, default: 'light' },
	provider: { type: String, required: true },
	password: { type: String, required: false },

	// posts: ['id postów stworzonych przez usera'],
	// followers: ['id użytkowników obserwujących usera'],
	// following: ['id użytkowników których user obserwuje'],
	// savedPosts: ['id zapisanych postów przez użytkownika'],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
