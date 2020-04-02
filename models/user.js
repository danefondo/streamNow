const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const stream = require('./stream.js').model('Stream').schema;
const user = require('./user.js');

// User Schema
const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	password: {
		type: String,
		required: true
	},
	currently_live: Boolean,
	lastLogin: Date,
	verificationToken: String,
	resetToken: String,
	resetTokenExpires: Number,
	verifiedStatus: Boolean,
	defaultCurataId: String,
	likedSpaces: [String],
	oldUserId: String,
	dateCreated: Date,
	upcoming_streams: [stream],
	previous_streams: [stream],
	live_right_now: Boolean,
	current_stream_url: String,
	current_stream_thumbnail: String,
	followers: [user],
	following: [user],
	fb_link: String,
	yt_link: String,
	insta_link: String,
	website_link: String
});

const User = module.exports = mongoose.model('User', UserSchema);