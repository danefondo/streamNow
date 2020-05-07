const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = require("./user.js");

const stream_schema = new mongoose.Schema({
  stream_name: String,
  stream_description: String,
  stream_tags: [String],
  stream_video_id: String,
  stream_video_link: String,
  date_created: Date,
  thumbnail_key: String,
  thumbnail_url: String,
  thumbnail_name: String,
  thumbnail_id: String,
  streamer_id: String,
  streamer: { type: Schema.Types.ObjectId, ref: "User" },
  stream_likes_count: Number,
  users_who_like_stream: [String],
  is_live: Boolean,
  is_scheduled: Boolean,
  is_featured: Boolean,
  was_live: Boolean,
  scheduled_time: Date,
  public_status: String,
  platform_status: String,
  waitlist_emails: [String],
  support_link: String,
  started_time: Date,
  ended_time: Date,
});

const Stream = (module.exports = mongoose.model("Stream", stream_schema));
