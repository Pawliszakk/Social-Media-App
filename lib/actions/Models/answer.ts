const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
	id: { type: String, required: true },
	author: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: String, required: true },
	// likes: ['id użytkowników co polubili komentarz'],
});

export const Answer =
	mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
