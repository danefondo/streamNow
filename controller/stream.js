let Stream = require('../models/stream');

const streamController = {

    async create_live_stream(req, res) {
        try {        
            let stream = new Stream();
            let stream_data = req.body;

            if (stream_data.thumbnail_key) {
                stream.thumbnail_key = stream_data.thumbnail_key;
            }

            if (stream_data.thumbnail_url) {
                stream.thumbnail_url = stream_data.thumbnail_url;
            }

            if (stream_data.thumbnail_name) {
                stream.thumbnail_name = stream_data.thumbnail_name;
            }
            
            if (stream_data.thumbnail_id) {
                stream.thumbnail_id = stream_data.thumbnail_id;
            }

            stream.date_created = stream_data.date_created;
            stream.stream_name = stream_data.stream_name;
            stream.stream_description = stream_data.stream_description;
            stream.stream_video_id = stream_data.stream_video_id;

            let tags = stream_data.stream_tags;
            tags = JSON.parse(tags);
            
            for (const tag of tags) {
                stream.stream_tags.push(tag);
            }

            stream.stream_creator_id = req.user._id;
    
            await stream.save();
            let stream_id = stream._id;

            res.json({
                stream: stream,
                stream_id: stream_id
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async showStream(req, res) {
        try {        

            let stream_id = req.params.streamId;

            let stream = await Stream.findById(stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

            let video_id = stream.stream_video_id;
            
            res.render('watch', {
                video_id: video_id,
                stream
            });
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }       
    }

}

module.exports = streamController;
