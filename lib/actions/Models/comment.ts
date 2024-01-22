const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	id: { type: String, required: true },
	author: { type: String, required: true },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
	date: { type: String, required: true },
	// answers: '[id odpowiedzi do komentarza]',
});

export const Comment =
	mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
