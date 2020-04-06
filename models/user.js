const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let stream = require('./stream.js').model('Stream').schema;

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
	lastLogin: Date,
	verificationToken: String,
	resetToken: String,
	resetTokenExpires: Number,
	verifiedStatus: Boolean,
	defaultCurataId: String,
	oldUserId: String,
	dateCreated: Date,
	upcoming_streams: [stream],
	previous_streams: [stream],
	active_stream_id: String,
	is_live: Boolean,
	current_stream_url: String,
	current_stream_thumbnail: String,
	followers: [String],
	following: [String],
	subscribed: [String],
	fb_link: String,
	yt_link: String,
	insta_link: String,
	website_link: String,
	total_stream_likes: Number,
	total_stream_views: Number,
	liked_streams_ids: [String]
});

const User = module.exports = mongoose.model('User', UserSchema);