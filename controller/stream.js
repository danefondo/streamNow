let Stream = require('../models/stream');
let User = require('../models/user');

const streamController = {

    async getStreams(req, res) {
        try {

            let streams = await Stream.find({"is_live": true}).populate('streamer').exec();
            if (!streams) {
                console.log("nooo streams");
                return res.render('index', {
                    error: "Couldn't get streams"
                });
            }
            console.log("sttreams", streams);

            res.render('index', {
                streams: streams
            });

        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

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

            console.log("user_id", req.user._id);

            stream.streamer_id = req.user._id;
            stream.streamer = req.user._id;
            stream.stream_live_status = true;
            stream.is_live = true;
    
            await stream.save();
            let stream_id = stream._id;

            let user;
            user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
            user.is_live = true;
            user.active_stream_id = stream._id;
            await user.save();

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

    async update_live_stream(req, res) {
        try {        
            let stream = await Stream.findById(req.body.stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

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

            stream.stream_name = stream_data.stream_name;
            stream.stream_description = stream_data.stream_description;
            stream.stream_video_id = stream_data.stream_video_id;

            let tags = stream_data.stream_tags;
            tags = JSON.parse(tags);

            stream.stream_tags = [];
            for (const tag of tags) {
                stream.stream_tags.push(tag);
            }

            console.log("user_id", req.user._id);

    
            await stream.save();

            res.json({
                stream: stream
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async endStream(req, res) {
        try {
            let stream = await Stream.findById(req.params.streamId);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

            console.log("yo  made it");
            if (stream.is_live) {
                stream.is_live = false;
                stream.end_date = req.body.end_date;
            }

            await stream.save();

            let user;
            user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
            user.is_live = false;
            user.active_stream_id = undefined;
            user.current_stream_url = undefined;
            user.current_stream_thumbnail = undefined;
            user.previous_streams.push(stream._id);
            await user.save();

            res.json({
                stream: stream
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
                return res.render('stream_not_found', {
                    error: "Stream not found."
                });
            }

            let video_id = stream.stream_video_id;

            let streamer_id = stream.streamer_id;
            let streamer_followers_count;
            let streamer_following_count;

            let streamer;
            streamer = await User.findById(streamer_id).populate('previous_streams').exec();
            if (!streamer) {
                console.log("Did not find streamer");
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
            
            let host_name = req.headers.host;

            res.render('watch', {
                video_id: video_id,
                stream,
                streamer,
                user_like_boolean,
                user_following_boolean,
                host_name
            });
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }       
    },

    async getStreamer(req, res) {
        try {        

            let user_id = req.params.userId;

            let user;
            user = await User.findById(user_id).populate('previous_streams').populate('upcoming_streams').exec();

            let stream;
            let stream_id;
            let video_id;
            if (user.is_live && user.active_stream_id) {
                stream_id = user.active_stream_id;

                stream = await Stream.findById(stream_id);
                if (!stream) {
                    return res.render('stream_not_found', {
                        error: "Stream not found."
                    });
                }
                video_id = stream.stream_video_id;
            }

            let streamer_followers_count = user.followers.length;
            let streamer_following_count = user.following.length;

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
                
                if (user.is_live && stream_id) {
                    user_like_boolean = visitor.liked_streams_ids.includes(stream_id);
                }
                user_following_boolean = visitor.following.includes(user_id);
            }
            console.log("boolean", user_like_boolean);
            console.log("following", user_following_boolean);

            let host_name = req.headers.host;

            let streamer = user;
            res.render('profile', {
                video_id: video_id,
                stream,
                streamer,
                user_like_boolean,
                user_following_boolean,
                host_name
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
