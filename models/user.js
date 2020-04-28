const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Stream = require('./stream.js');

// User Schema
const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	password: {
		type: String,
		required: true,
		select: false
	},
	description: String,
	lastLogin: Date,
	verificationToken: String,
	resetToken: String,
	resetTokenExpires: Number,
	verifiedStatus: Boolean,
	defaultCurataId: String,
	oldUserId: String,
	dateCreated: Date,
	upcoming_streams: [{type: Schema.Types.ObjectId, ref: 'Stream'}],
	previous_streams: [{type: Schema.Types.ObjectId, ref: 'Stream'}],
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
	twitter_link: String,
	website_link: String,
	total_stream_likes: Number,
	total_stream_views: Number,
	liked_streams_ids: [String],
	profile_image_name: String,
	profile_image_url: String,
	profile_image_key: String,
	admin: Boolean
});

const User = module.exports = mongoose.model('User', UserSchema);