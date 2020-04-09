const { validationResult } = require('express-validator');
let User = require('../models/user');
let Image = require('../models/image');
let Stream = require('../models/stream');
const accountUtil = require('../utils/account')
const mail = require('../utils/mail');

const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIARKLMM5TMEHGOSNJC",
    secretAccessKey: "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",
    region: "us-east-1" 
});

const s3 = new aws.S3();
const S3_BUCKET = 'curata';

const accountController = {
	checkIfUserWithValueExists(field, value) {
		// for checking whether various information, such as username or email give results to detect whether the email is already used or not
		return new Promise((resolve, reject) => {
			User.findOne({[field]: value}, function(err, user) {
				if (err) {
					return reject(err);
				}
				return user ? resolve(true) : resolve(false);
			})
		})
	},

	async checkUnique (req, res) {
		let value = req.body.value;
		let field = req.body.field;
		console.log('value', value, field);
		let message = '';
		try {
			let fail = await accountController.checkIfUserWithValueExists(field, value);

			field = field[0].toUpperCase() + field.substring(1)
			if (fail) {
				message = `${field} already taken.`;
			} else {
				message = `${field} available.`;
			}
			res.json({
				fail: fail,
				message: message
			});
		} catch(error) {
			console.log(error);
			res.json({
				message: "An error occurred, we're fixing this now"
			});
		}
	},

	async register(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
		    return res.status(422).json({ errors: errors.array() });
		}
		const email = req.body.email;
		const username = req.body.username;
		const password = req.body.password;
		const passcheck = req.body.passcheck;
		const dateCreated = new Date();
		// code change

		try {
			const verificationToken = await accountUtil.generateToken();
			console.log("veriftok: ", verificationToken);

			let newUser = new User({
				email,
				verifiedStatus: false,
				verificationToken,
				username,
				password,
				dateCreated
			});
			console.log("Stored user in variable.")
			const link = `${req.protocol}://${req.get('host')}/accounts/verify/${verificationToken}`;

			const hash = await accountUtil.hashPassword(newUser.password);
			console.log("Hashing password.")
			newUser.password = hash;
			console.log("About to create user.")
			await newUser.save();
			console.log('Not stuck yet 3.')
			console.log('You are now registered and can log in', verificationToken);
			mail.sendVerificationMail(email, link);
			req.login(newUser, function (err) {
        		if ( ! err ){
            		res.json({
            			redirectURL: '/successful-registration'
            		})
        		} else {
            		//handle error
        		}
    		});
		} catch(err) {
			console.log(err);
		}
	},

	async resetPassword(req, res) {
		const { body: { token, password } } = req;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
		    return res.status(422).json({ err: errors.array()[0].msg });
		}
		try {
			const user = await User.findOne({
				resetToken: token
			});

			if (!user || Date.now() > user.resetTokenExpires) {
				// return res.status(400).json({
				// 	err: 'Invalid password reset link'
				// });
				return res.redirect(req.originalUrl);
			}

			user.password = await accountUtil.hashPassword(password)
			user.resetToken = null;
			user.resetTokenExpires = null;

			await user.save();
			res.status(200).json({
				message: 'Password reset was successful, please login'
			});
		} catch(error) {
			console.log(error);
			res.status(500).json({
				message: 'An error occurred'
			});
		}
	},

	async sendResetPass(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
		    return res.status(422).json({ message: errors.array()[0].msg });
		}

		try {
			console.log(req.body.email);
			const token = await accountUtil.generateToken();
			console.log("veriftok: ", token);

			const user = await User.findOne({
				email: req.body.email
			});

			user.resetToken = token;
			user.resetTokenExpires = Date.now() + 1800000;

			await user.save();

			const link = `${req.protocol}://${req.get('host')}/accounts/reset/${token}`;
			console.log(link);
			mail.sendResetMail(req.body.email, link);
			res.status(200).json({
				message: 'A password reset link has been sent to the email address you entered.'
			})
		} catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});
		}
	},

	async deleteAccount(req, res) {

		try {
			let user_id = req.user._id;

            if (!user_id) {
                return res.status(404).json({
                    errors: "User id missing."
                });
			}
			
			User.deleteOne({_id: user_id}).exec(function(err, removed) {
				if (err)  {
					return console.log("Failed to delete account: ", err);
				}
				console.log("Successfully deleted account.");

			})

            let images = await Image.find({"streamer_id": user_id});
            const imageKeys = [];
            images.forEach(function(image) {
                // Pull image reference from curataFiles
                console.log("One imageId to remove: ", image);

                imageKeys.push({
                    Key: '' + image.imageKey
                })
			});
			
            if (imageKeys.length) {
                s3.deleteObjects({
                Bucket: S3_BUCKET,
                Delete: {
                    Objects: imageKeys
                }
                }, function (err, data) {
                    if (err) {
                        console.log("Error: ", err);
                    } else {
                        console.log("Successfully deleted image from AWS.");
                    }
                })
            }

			await Image.deleteMany({ "streamer_id": user_id});
			console.log("Associated images successfully removed.");

			await Stream.deleteMany({ "streamer_id": user_id});
			console.log("Associated streams successfully removed.");
			
			//- pull your id from everyone's following/followers list
			//- remove user like & comments?
			req.logout();
			console.log('Account deleted and you are logged out');
			res.status(200).json({
				message: "Removed."
			})

		} catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	},

	async updateName(req, res) {
		try {
			const firstname = req.body.first_name;
			const lastname = req.body.last_name;
		

			let user = await User.findById(req.user._id);
			user.firstname = firstname;
			user.lastname = lastname;

			await user.save();

			res.status(200).json({
				message: 'Name successfully changed!'
			})

		}  catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	},

	async updateDescription(req, res) {
		try {
			const description = req.body.description;

			let user = await User.findById(req.user._id);
			user.description = description;

			await user.save();

			res.status(200).json({
				message: 'Description successfully changed!'
			})

		}  catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	},

	async updateUsername(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
			return res.status(422).json({ errors: errors.array() });
		}
		try {
			const username = req.body.username;

			let user = await User.findById(req.user._id);
			user.username = username;

			await user.save();

			res.status(200).json({
				message: 'Username successfully changed!'
			})

		}  catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	},

	async updateEmail(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
			return res.status(422).json({ errors: errors.array() });
		}
		try {
			const email = req.body.email;
			const verificationToken = await accountUtil.generateToken();

			let user = await User.findById(req.user._id);
			user.email = email;
			user.verifiedStatus = false;
			user.verificationToken = verificationToken;

			const link = `${req.protocol}://${req.get('host')}/accounts/verify/${verificationToken}`;

			await user.save();

			mail.sendVerificationMail(email, link);

			res.status(200).json({
				message: 'Email successfully changed!'
			})

		}  catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	},

	async updateSocial(req, res) {
		try {
			const website = req.body.website_link;
			const facebook = req.body.fb_link;
			const youtube = req.body.yt_link;
			const twitter = req.body.twitter_link;
			const instagram = req.body.insta_link;

			let user = await User.findById(req.user._id);

			if (website) {
				let websiteParsed = (website.indexOf('://') === -1) ? 'http://' + website : website;
				user.website_link = websiteParsed;user.website_link = websiteParsed;
			}
			if (facebook) {
				let facebookParsed = (facebook.indexOf('://') === -1) ? 'http://' + facebook : facebook;
				user.fb_link = facebookParsed;
			}
			if (youtube) {
				let youtubeParsed = (youtube.indexOf('://') === -1) ? 'http://' + youtube : youtube;
				user.yt_link = youtubeParsed;
			}
			if (twitter) {
				let twitterParsed = (twitter.indexOf('://') === -1) ? 'http://' + twitter : twitter;
				user.twitter_link = twitterParsed;
			}
			if (instagram) {
				let instagramParsed = (instagram.indexOf('://') === -1) ? 'http://' + instagram : instagram;
				user.insta_link = instagramParsed;
			}

			await user.save();

			res.status(200).json({
				message: 'Social media links successfully saved!'
			})

		}  catch(err) {
			console.log(err);
			res.status(500).json({
				message: 'An error occurred, please try again later.'
			});			
		}
	}




	// async canUserViewCurata(req, res, next) {
	// 	const curata = await utils.getCurata(req.params.curataId);
	// 	if (curata.owner.owner_id == req.user._id) {
	// 		req.curata = curata;
	// 		return next();
	// 	}
	// 	res.redirect(302, '/');
	// }

};

module.exports = accountController;
