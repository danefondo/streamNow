const url = require('url');

const getPlatform = (videoLink) => {
    return url.parse(videoLink).hostname;
}

const getYoutubeId = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
 }

const getVideoId = (platform, videoLink) => {
    if (platform.includes("youtu")) {
        return getYoutubeId(videoLink);
    } else if (platform.includes("twitch")) {
        return videoLink.split("=")[1];
    } else if (platform.includes("facebook")) {
        const videoParts = videoLink.split("/")
        return videoParts[videoParts.length - 1];
    } else {
        return videoLink;
    }
}

module.exports = {
    getPlatform,
    getVideoId
}