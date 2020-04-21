const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const User = require('./user.js');

const stream_schema = new mongoose.Schema({
    stream_name: String,
    stream_description: String,
    stream_tags: [String],
    stream_video_id: String,
    date_created: Date,
    end_date: Date,
    thumbnail_key: String,
    thumbnail_url: String,
    thumbnail_name: String,
    thumbnail_id: String,
    streamer_id: String,
    streamer: {type: Schema.Types.ObjectId, ref: 'User'},
    stream_likes_count: Number,
    users_who_like_stream: [String],
    is_live: Boolean,
    is_scheduled: Boolean,
    scheduled_date: Date,
    scheduled_time: String,
    public_status: String
});

const Stream = module.exports = mongoose.model('Stream', stream_schema);