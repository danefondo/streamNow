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

            console.log("data: ", stream_data);
            let tags = stream_data.stream_tags;
            for (var i=0; i<tags.length; i++) {
                stream.stream_tags.push(tags[i]);
            }
    
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

    async showVideo(req, res) {
        try {        
            let video_id = req.params.videoId;
            res.render('watch', {
                video_id: video_id
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
