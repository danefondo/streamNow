let Stream = require('../models/stream');
let User = require('../models/user');

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

            stream.streamer_id = req.user._id;
            stream.stream_live_status = true;
    
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
                res.render('stream_not_found', {
                    error: "Stream not found."
                });
            }

            let video_id = stream.stream_video_id;

            let streamer_id = stream.streamer_id;
            let streamer_followers_count;
            let streamer_following_count;

            let streamer;
            streamer = await User.findById(streamer_id);
            if (!streamer) {
                streamer = "N/A";
                streamer_followers_count = "N/A";
                streamer_following_count = "N/A";
            } else {
                streamer_followers_count = streamer.followers.length;
                streamer_following_count = streamer.following.length;
            }


            let visitor;
            let user_like_boolean = "N/A";
            let user_following_boolean = "N/A";
            if (req.isAuthenticated()) {
                visitor = await User.findById(req.user._id);
                if (!visitor) {
                    return res.status(404).json({
                        errors: "User that seemed to be logged in was no longer found."
                    });
                }
                user_like_boolean = visitor.liked_streams_ids.includes(stream_id);
                user_following_boolean = visitor.following.includes(stream.streamer_id);
            }
            console.log("boolean", user_like_boolean);
            console.log("following", user_following_boolean);
            
            res.render('watch', {
                video_id: video_id,
                stream,
                streamer,
                user_like_boolean,
                user_following_boolean
            });
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }       
    },

    async updateLikes(req, res) {
        try {      

            console.log("reached this");

            // if not user, then cancel (for oh so clever frontend check bypassers)
            if (!req.isAuthenticated()) {
                return res.status(500).json({
                    errors: "No authenticated user present who could add a like"
                });
            }

            let stream_id = req.params.streamId;

            let stream = await Stream.findById(stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

            if (req.user._id == stream.streamer_id) {
                return res.status(500).json({
                    errors: "Cannot like your own stream."
                });
            }

            // check if user has already liked it or not, based on that choose action

            let user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }

            let user_like_boolean = user.liked_streams_ids.includes(stream_id);

            if (user_like_boolean == true) {

                if (!stream.stream_likes_count) {
                    return res.status(200).end();
                } else if (stream.stream_likes_count > 0) {
                    stream.stream_likes_count = stream.stream_likes_count - 1;
                }

                user.liked_streams_ids.pull(stream_id);

            } else {
                 // if undefined and not even zero, make it one
                if (!stream.stream_likes_count) {
                    stream.stream_likes_count = 1;
                } else if (stream.stream_likes_count == 0 || stream.stream_likes_count > 0) {
                    stream.stream_likes_count = stream.stream_likes_count + 1;
                }

                user.liked_streams_ids.push(stream_id);
            }

            await stream.save();
            await user.save();

            let stream_likes_count = stream.stream_likes_count;

            res.json({
                stream: stream,
                stream_likes_count
            })
        
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }       
    },

    async followUnfollow(req, res) {
        try {      

            console.log("reached following");

            // if not user, then cancel (for oh so clever frontend check bypassers)
            if (!req.isAuthenticated()) {
                return res.status(500).json({
                    errors: "No authenticated user present who could follow a streamer"
                });
            }

            let stream_id = req.params.streamId;

            let stream = await Stream.findById(stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

            if (req.user._id == stream.streamer_id) {
                return res.status(500).json({
                    errors: "Cannot follow yourself."
                });
            }

            // check if user has already liked it or not, based on that choose action

            let user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }

            let streamer_id = stream.streamer_id
            let user_following_boolean = user.following.includes(streamer_id);

            if (user_following_boolean == true) {

                user.following.pull(streamer_id);
            } else {

                user.following.push(streamer_id);
            }

            await user.save();

            let streamer = await User.findById(streamer_id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }

            let streamer_followers_boolean = streamer.followers.includes(user._id);

            if (streamer_followers_boolean == true) {

                streamer.followers.pull(user._id);
            } else {

                streamer.followers.push(user._id);
            }

            await streamer.save();

            // let stream_followers_count = stream.stream_followers_count;

            res.json({
                stream: stream,
                streamer: streamer
            })
        
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }       
    }

}

module.exports = streamController;
