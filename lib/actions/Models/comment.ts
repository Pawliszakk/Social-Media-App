const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	id: { type: String, required: true },
	author: { type: String, required: true },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
	date: { type: String, required: true },
	answers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Answer' }],

});

export const Comment =
	mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
