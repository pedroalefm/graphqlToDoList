const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
