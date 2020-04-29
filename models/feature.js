const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const FeatureSchema = new mongoose.Schema({
	idea: String,
	description: String,
    demand_count: Number,
    requester_emails: [String],
    ready_status: {
        type: Boolean,
        default: false
    },
    language: String
});

const Feature = module.exports = mongoose.model('Feature', FeatureSchema);
