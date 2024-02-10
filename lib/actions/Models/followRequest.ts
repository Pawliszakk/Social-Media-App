const mongoose = require('mongoose');

const followRequestSchema = new mongoose.Schema({
	requester: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	reciever: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	date: { type: String, required: true },
	status: { type: String, default: 'pending' },
});

export const followRequest =
	mongoose.models.followRequest ||
	mongoose.model('followRequest', followRequestSchema);
