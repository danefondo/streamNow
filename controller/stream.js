const { validationResult } = require('express-validator');
let Stream = require('../models/stream');
let User = require('../models/user');
const streamUtils = require('../utils/stream')
const moment = require('moment');
const mail = require('../utils/mail');
const streamController = {
    async fetchLiveStreams(req, res) {
        let query = { "is_live": true }
        try {
            let streams = await Stream.find(query).populate('streamer').exec();
            if (!streams.length) {
                return res.status(404).json({
                    message: "No live streams found"
                });
            }
            res.status(200).json({
                streams: streams
            });
        } catch (error) {
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },
    async fetchStreams(req, res) {
        let query = { "is_live": true }
        if (req.query.scheduled) {
            const date = req.query.date ? new Date(req.query.date) : new Date();
            const anotherDate = new Date();
            query = {
                is_scheduled: true,
                scheduled_time: {
                    $gte: date,
                    $lte: anotherDate.setDate(date.getDate() + 20),
                }
            }
        }
        try {
            let streams = await Stream.find(query).populate('streamer').sort({ scheduled_time: 1 }).exec();
            let featured_streams = await Stream.find({ "is_featured": true }).populate('streamer').exec();
            let featured = featured_streams[0];
            if (!streams.length) {
                return res.status(404).json({
                    message: "No stream found"
                });
            }
            res.status(200).json({
                streams: streams,
                featured: featured
            });
        } catch (error) {
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },
    async getStreams(req, res) {
        try {

            let streams = await Stream.find({ "is_live": true }).populate('streamer').exec();
            if (!streams) {
                console.log("nooo streams");
                return res.render('index', {
                    error: "Couldn't get streams"
                });
            }
            // console.log("sttreams", streams);

            let featured_streams = await Stream.find({ "is_featured": true }).populate('streamer').exec();
            if (!featured_streams) {
                console.log("nooo streams");
                return res.render('index', {
                    error: "Couldn't get featured streams"
                });
            }
            let featured = featured_streams[0];
            // console.log("feat", featured);

            res.render('index', {
                streams: streams,
                featured: featured
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async getScheduledStreams(req, res) {
        try {

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let day3 = new Date();
            day3.setDate(tomorrow.getDate() + 1);
            let day4 = new Date();
            day4.setDate(day3.getDate() + 1);
            let day5 = new Date();
            day5.setDate(day4.getDate() + 1);

            let streams = await Stream.find({
                "is_scheduled": true,
                scheduled_time: {
                    $gte: today,
                    $lte: day5
                }
            }).populate('streamer').sort({ scheduled_time: -1 }).exec();
            if (!streams) {
                console.log("nooo streams");
                return res.render('scheduled', {
                    error: "Couldn't get streams"
                });
            }
            console.log("sttreams", streams);

            let featured_streams = await Stream.find({ "is_featured": true }).populate('streamer').exec();
            if (!featured_streams) {
                console.log("Couldn't get featured streams");
            }
            let featured = featured_streams[0];
            console.log("feat", featured);

            // let today = new Date();
            // let today = moment().startOf('day')

            // get all scheduled before date (date =  today + 4)

            // for each stream, if stream.date == today, add
            // for each stream if stream.date == today + 1, add 

            let datedStreams = {
                today: [],
                tomorrow: [],
                next3: [],
                next4: [],
                next5: []
            };

            function compareDates(date1, date2) {
                let boolean = Math.floor(date1.getTime() / 86400000) == Math.floor(date2.getTime() / 86400000);

                return boolean;
            }

            for (i = 0; i < 5; i++) {
                streams.forEach(function (stream) {
                    let stream_date = stream.scheduled_time;
                    compareDates(today, stream_date);
                    // if (stream.)
                })
            }

            let data = {
                streams
            };
            if (featured) {
                data.featured = featured
            }
            res.render('scheduled', data);

        } catch (error) {
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
        } catch (error) {
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
            stream.thumbnail_key = stream_data.thumbnail_key;
            stream.thumbnail_url = stream_data.thumbnail_url;
            stream.thumbnail_name = stream_data.thumbnail_name;
            stream.stream_name = stream_data.stream_name;
            stream.stream_description = stream_data.stream_description;
            stream.stream_video_link = stream_data.stream_video_link;
            stream.platform_status = streamUtils.getPlatform(stream_data.stream_video_link);
            stream.stream_video_id = streamUtils.getVideoId(stream.platform_status, stream_data.stream_video_link)
            stream.stream_tags = stream_data.stream_tags;
            stream.scheduled_time = stream_data.scheduled_time;
            stream.public_status = stream_data.public_status;

            console.log("user_id", req.user._id);


            await stream.save();

            res.json({
                stream: stream
            })
        } catch (error) {
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async signUpForVideo(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
			return res.status(422).json({ errors: errors.array() });
		}
        try {
            let stream_id = req.params.streamId;
            let email = req.body.email;
            let signUpId = req.body.email;
            if (req.user && req.user._id) {
                const user = await User.findById(req.user._id);
                email = user.email;
                signUpId = req.user._id
            } else {
                // check email
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!email || !re.test(email)) {
                    return res.status(400).json({
                        errors: "Email is not valid"
                    });
                }
            }
            let stream = await Stream.findById(stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }
            if (stream.waitlist_emails.includes(signUpId)) {
                return res.status(404).json({
                    errors: "You have registered for this stream"
                });
            }
            stream.waitlist_emails.push(signUpId);
            await stream.save();

            mail.sendVideoSignUpEmail(email, stream);

            res.json({
                stream: stream
            })
        } catch (error) {
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

        } catch (error) {
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
                    message: "Stream not found"
                });
            }

            let video_id = stream.stream_video_id;

            let streamer_id = stream.streamer_id;
            let streamer_followers_count;
            let streamer_following_count;
            let user_registered;

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
            let user_like_boolean = false;
            let user_following_boolean = false;
            if (req.user) {
                visitor = await User.findById(req.user._id);
                if (!visitor) {
                    return res.status(404).json({
                        errors: "User that seemed to be logged in was no longer found."
                    });
                }
                user_like_boolean = visitor.liked_streams_ids.includes(stream_id);
                user_following_boolean = visitor.following.includes(stream.streamer_id);
                user_registered = stream.waitlist_emails.includes(req.user._id);
            }

            let host_name = req.headers.host;

            res.status(200).json({
                video_id: video_id,
                stream,
                streamer,
                user_like_boolean,
                user_following_boolean,
                user_registered,
                host_name
            });
        } catch (error) {
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async getStreamer(req, res) {
        try {

            let user_id = req.params.userId;

            let user;
            user = await User.findById(user_id).populate({
                path: 'previous_streams',
                populate: {
                    path: 'streamer'}
                }).sort({ scheduled_time: 1 }).populate({
                    path: 'upcoming_streams',
                    populate: {
                        path: 'streamer'
                    }
                }).sort({ scheduled_time: 1 }).exec();

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
            let user_like_boolean = false;
            let user_following_boolean = false;
            if (req.user) {
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
            //console.log("boolean", user_like_boolean);
            //console.log("following", user_following_boolean);

            let host_name = req.headers.host;

            let streamer = user;
            res.status(200).json({
                video_id: video_id,
                stream,
                streamer,
                user_like_boolean,
                user_following_boolean,
                host_name
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async updateLikes(req, res) {
        try {
            // if not user, then cancel (for oh so clever frontend check bypassers)
            if (!req.user) {
                return res.status(401).json({
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
                return res.status(400).json({
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

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async followUnfollow(req, res) {
        try {
            // if not user, then cancel (for oh so clever frontend check bypassers)
            let stream_id = req.params.streamId;
            let stream = await Stream.findById(stream_id);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }
            if (req.user._id == stream.streamer_id) {
                return res.status(400).json({
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

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },
    async goLive(req, res) {
        try {
            let stream = await Stream.findById(req.params.streamId);
            if (!stream) {
                return res.status(404).json({
                    errors: "Stream not found."
                });
            }

            console.log("yo  made it");
            if (!stream.is_live) {
                stream.is_live = true;
                stream.is_scheduled = false;
            }

            await stream.save();

            let user;
            user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
            user.is_live = true;
            user.active_stream_id = stream._id;
            user.current_stream_url = stream.stream_video_link;
            user.current_stream_thumbnail = stream.stream_thumbnail_url;
            await user.save();
            
            // let emails = stream.waitlist_emails;
            // let link = window.location.origin + '/watch/' + stream._id;
            // emails.forEach(function(email, index) {
            //     //- Later check if valid email
            //     if (email.contains("@")) {
            //         mail.sendVideoSignUpReminderEmail(email, link);
            //     } else {
            //         let user = await User.findById(email);
            //         if (!user) {
            //             console.log("Not a valid user id.");
            //         }
            //         email = user.email;
            //         mail.sendVideoSignUpReminderEmail(email, link);
            //     }
            // })

            res.status(200).json({
                stream: stream
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },
    async schedule_live_stream(req, res) {
        try {
            let stream = new Stream({ ...req.body, stream_likes_count: 0 });

            stream.streamer_id = req.user._id;
            stream.streamer = req.user._id;
            stream.platform_status = streamUtils.getPlatform(req.body.stream_video_link);
            stream.stream_video_id = streamUtils.getVideoId(stream.platform_status, req.body.stream_video_link)
            await stream.save();
            let stream_id = stream._id;

            let user;
            user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
            if (req.body.is_live) {
                user.is_live = true;
                user.active_stream_id = stream._id;
            } else {
                user.is_live = false;
                user.active_stream_id = null;
            }
            user.upcoming_streams.push(stream_id);
            await user.save();

            res.json({
                stream: stream,
                stream_id: stream_id,
                user: user
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async getAllUserStreams(req, res) {
        try {

            let userId = req.user._id;

            let streams = await Stream.find({ "streamer_id": userId }).sort({ scheduled_time: -1 }).exec();
            if (!streams) {
                console.log("nooo streams");
                return res.status(404).json({
                    errors: "User not found."
                });
            }

            res.status(200).json({
                streams: streams,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    }

}

module.exports = streamController;
