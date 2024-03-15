const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	content: { type: String, required: true },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
});

export const Answer =
	mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
