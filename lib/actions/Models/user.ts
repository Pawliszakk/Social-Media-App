import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	sex: { type: String, required: true },
	private: { type: Boolean, required: true },
	date: { type: String, required: true },
	theme: { type: String, required: true },
	provider: { type: String, required: true },
	password: { type: String, required: false },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
