const mongoose = require('mongoose');

const CommentReplySchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	content: { type: String, required: true },
	date: { type: String, required: true },
	likes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
});

export const CommentReply =
	mongoose.models.CommentReply ||
	mongoose.model('CommentReply', CommentReplySchema);
