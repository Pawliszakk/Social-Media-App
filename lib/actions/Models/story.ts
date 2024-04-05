import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	image: { type: String, required: true },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	views: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
});

export const Story =
	mongoose.models.Story || mongoose.model('Story', StorySchema);
