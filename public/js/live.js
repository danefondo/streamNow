 $(document).ready(function () {

	let likes_being_updated = false;

	$('.ytp-title-channel').hide();

	function init_stream_likes() {
		let stream_likes = $('.stream_likes');
		stream_likes.off('click');

		// Front-end check for if user is present
		if ($(".user_check")[0]){
			stream_likes.on('click', function() {

				// check if user has already liked it, button should already indicate
				// so only check should happen in the backend.
				// and so if button does not have 'liked' indicator
				// then this shouldn't run
				likes_being_updated = true;

				let like_count_container = stream_likes.find('.stream_likes_count');
				let like_count_text = like_count_container.text();
				let like_count = parseInt(like_count_text);
				let original_count = like_count;
				let already_liked_boolean;

				let already_liked_check = stream_likes.attr('data-liked');
				if (already_liked_check == "true") {
					// remove like
					like_count = like_count - 1;
					already_liked_boolean = "false";
				} else {
					like_count = like_count + 1;
					already_liked_boolean = "true";
				}

				like_count = like_count.toString();
				like_count_container.text(like_count);
				stream_likes.attr('data-liked', already_liked_boolean);

				let stream_id = $('.stream_id').attr('data-stream-id');

				$.ajax({
					type: 'POST',
					url: '/streams/' + stream_id + '/updateLikes',
					success: function(data) {
						// set site count to match db count in case more people have liked it
						like_count_container.text(data.stream_likes_count);
						likes_being_updated = false;
					},
					error: function(err) {
						like_count_container.text(original_count);
						already_liked_boolean = JSON.parse(already_liked_boolean);
						already_liked_boolean = !already_liked_boolean;
						already_liked_boolean = "" + already_liked_boolean;
						stream_likes.attr('data-liked', already_liked_boolean);
						likes_being_updated = false;
						// display error message
					}
				});

			});
		} else {
			stream_likes.on('click', function() {
				alert("You must be logged in to like streams.");
			})
		}
	}
	init_stream_likes();

	function init_stream_likes_update() {
		// automatic pull & update of stream_count without conflict of updating
	}

	function init_streamer_following() {
		let streamer_following = $('.streamer_follow');
		streamer_following.off('click');

		// Front-end check for if user is present
		if ($(".user_check")[0]){
			streamer_following.on('click', function() {

				// check if user has already liked it, button should already indicate
				// so only check should happen in the backend.
				// and so if button does not have 'liked' indicator
				// then this shouldn't run

				let following_state = streamer_following.find('.streamer_follow_state');
				let following_text = following_state.text();
				let already_following_boolean;
				let original_state = following_text;
				
				let follow_icon = $('.streamer_follow_icon');
				let follow_icon_original = follow_icon.attr('src');

				let already_following_check = streamer_following.attr('data-following');
				if (already_following_check == "true") {
					// remove like
					following_text = "Follow";
					already_following_boolean = "false";
					follow_icon_version = '/images/follow_icon.png'

				} else {
					following_text = "Following";
					already_following_boolean = "true";
					follow_icon_version = '/images/following_icon.png'
				}

				following_state.text(following_text);
				streamer_following.attr('data-following', already_following_boolean);
				follow_icon.attr('src', follow_icon_version);

				let stream_id = $('.stream_id').attr('data-stream-id');

				$.ajax({
					type: 'POST',
					url: '/streams/' + stream_id + '/followUnfollow',
					success: function(data) {
						// update general follower count
					},
					error: function(err) {
						following_state.text(original_state);
						already_following_boolean = JSON.parse(already_following_boolean);
						already_following_boolean = !already_following_boolean;
						already_following_boolean = "" + already_following_boolean;
						streamer_following.attr('data-following', already_following_boolean);
						follow_icon.attr('src', follow_icon_original);
						// display error message
					}
				});

			});
		} else {
			streamer_following.on('click', function() {
				alert("You must be logged in to follow a streamer.");
			})
		}
	}
	init_streamer_following();



 });