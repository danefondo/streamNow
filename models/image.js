const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
	imageKey: String,
	imageURL: String,
    imageName: String,
    streamId: String,
    streamer_id: String
});

const image = module.exports = mongoose.model('image', imageSchema);
