const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	name: String,
	complete: {
		type: Boolean,
		default: false,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	todoDate: {
		type: Date,
		default: Date.now,
	},
	creator: String,
});

module.exports = mongoose.model('Todo', TodoSchema);
