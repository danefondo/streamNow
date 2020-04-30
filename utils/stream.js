const url = require("url");
const mail = require("./mail");
const user = require("../models/user");
const mongoose = require("mongoose");

const getPlatform = (videoLink) => {
  return url.parse(videoLink).hostname;
};

const getYoutubeId = (url) => {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

const getVideoId = (platform, videoLink) => {
  if (!platform) {
    return null;
  }
  if (platform.includes("youtu")) {
    return getYoutubeId(videoLink);
  } else if (platform.includes("twitch")) {
    const videoParts = videoLink.split("/");
    return videoParts[videoParts.length - 1];
  } else if (platform.includes("facebook")) {
    const videoParts = videoLink.split("/");
    return (
      videoParts[videoParts.length - 1] || videoParts[videoParts.length - 2]
    );
  } else {
    return videoLink;
  }
};

const sendGoLiveMails = async (emailsOrIds, stream, link) => {
  const userIds = [];
  emailsOrIds.forEach(function (email, index) {
    //- Later check if valid email
    if (email.includes("@")) {
      mail.sendVideoSignUpReminderEmail(email, stream, link);
    } else {
      userIds.push(mongoose.Types.ObjectId(email));
    }
  });
  const userEmails = await user.find(
    {
      _id: {
        $in: userIds,
      },
    },
    { email: 1 }
  );
  userEmails.forEach(user => {
    mail.sendVideoSignUpReminderEmail(user.email, stream, link)
  })
};

module.exports = {
  getPlatform,
  getVideoId,
  sendGoLiveMails
};
