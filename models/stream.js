const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const stream_schema = new mongoose.Schema({
    stream_name: String,
    stream_description: String,
    stream_tags: [String],
    stream_video_id: String,
    date_created: Date,
    thumbnail_key: String,
    thumbnail_url: String,
    thumbnail_name: String,
    thumbnail_id: String,
    stream_creator_id: String,
    stream_status: String
});

const Stream = module.exports = mongoose.model('Stream', stream_schema);