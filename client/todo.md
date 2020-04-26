# todo by Sunday

*** VUE.JS RECONSTRUCTIONS ***

** To be fixed **
- Go live button
- Success page
+ Profile link / same component
+ Profile not working (especially new)
- Get video ID from video link

** 
- new databse

**
- if new video goes live, make owner's other videos offline

*Questions:
<!-- - Do I have to change every req.user._id and is there an equivalently convenient way to get this? -->

** WATCH PAGE **
<!-- + If LoggedIn && User==Owner
    + Show edit stream button
    + Show end stream button
    + Disable liking video
    + Don't show follow
+ Make like button work
+ Make follow button work
+ If stream has ended, show it has ended -->
- Make autoscroll name-bar work

** GENERAL **
- Change all <a> links to router-links with to:link


*** FEATURES PROMISED BY SUNDAY-MONDAY ***

** GENERAL ** 
- Fix

** ABOUT PAGE **
- Create custom about page

** LIVE & SCHEDULED STREAMS **
- REGISTER for upcoming streams
- Rich text editor for video descriptions (CKEDITOR5)
- Select whether stream preview is with YouTube, Facebook, Twitch at Go Live & Edit stream
- Disable scheduling streams if email not verified
- Schedule streams
- View single scheduled stream
- Edit scheduled streams
- Delete streams
- Go live with scheduled stream
- View my scheduled streams
- Viewer count

** PROFILE PAGE **
- Social media buttons
- Profile separated from main live stream
- On clicking profile, do show live stream on the top

** WATCH PAGE **
- Support button
- Share buttons
- View more button for longer descriptions
- Currently viewing stream count
- Total views count
- Creator social media buttons
- Socket.io live chatroom-box
- Only owner should be able to end stream
- Only owner should be able to edit stream
- Owner should not be able to follow oneself
- Owner should not be able to like one's own stream

** BROWSE & DISCOVERY FOR STREAMS **
- Filter streams by category
- Filter streams by common tags

** LANGUAGE **
- Estonian-English version setup

** GENERAL **
- MOBILE RESPONSIVE DESIGN
- Embed Segment analytics

** EMAIL ** 
- Custom confirmation message
- Email collection

# NEXT WEEK

** PAYWALL FOR EVENTS **
- Buy access to an event (access code?)

** BROWSE & DISCOVERY FOR STREAMS **
- 4x grid for live streams
- Order streams by view count
- Location detectioin & regional view of local streams
- Algolia search for creators

** CATEGORIES, TAGS & CREATORS PAGE ** 
- View & find streams by categories, tags & creators

** LANGUAGE ** 
- Switchable toggle between English & Estonian
- Automatic location detector to set language (unless otherwise specified in user settings)


# done
+ In components/Stream, added 'streamTime' div with class
+ Fixed nav button not opening on first click
+ Setup 'About', 'Privacy', 'Terms', 'Contact'
+ Setup custom AboutNav component
+ Setup binding active class to current router-link
+ Setup binding smarter by abstracting active/not active check into method
+ Changed footer <a> links to router-links
+ Changed all 'hrefs' to 'to:"/link"' for footer links