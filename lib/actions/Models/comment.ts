const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	content: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
	date: { type: String, required: true },
	replies: [{ type: mongoose.Types.ObjectId, required: true, ref: 'CommentReply' }],
});

export const Comment =
	mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
