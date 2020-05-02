const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../config/auth')
// Bring in User Model
let User = require('../models/user');
// const mail = require('../utils/mail');
const accountController = require('../controller/accounts');
const adminController = require('../controller/admin');
// const accountUtil = require('../utils/account')
const validator = require('../controller/validator');

// Generate token
// const generateToken = (username) => {
// 	return crypto.createHmac('sha256', process.env.SIGN_SECRET).update(username).digest('hex');
// };

// this resource suggest using async for crypto.randomBytes
// https://github.com/nodejs/help/issues/457

function usernameToLowerCase(req, res, next){
	// also strip it from spaces
	let username = req.body.username;
	req.body.username = username.replace(/\s+/g, '');
	req.body.username = req.body.username.toLowerCase();
	next();
}

function emailToLowerCase(req, res, next){
	// also strip it from spaces
	let email = req.body.email;
	req.body.email = email.replace(/\s+/g, '');
	req.body.email = req.body.email.toLowerCase();
	next();
}


router.post('/checkUnique', accountController.checkUnique);

router.post('/register', usernameToLowerCase, emailToLowerCase, validator.register, accountController.register);

//token verification
router.get('/verify/:verificationToken', function (req, res, next) {
	const { verificationToken } = req.params;
	User.findOne({ verificationToken }, (verifyError, theUser) => {
		if (verifyError) {
			console.log('DB error', verifyError);
			return res.status(500).send({ message: "verification.error-occurred" });
		}
		if (!theUser) {
			console.log('Please ensure you have created an account');
			return res.status(401).send({ message: "verification.ensure-account" });
		}
		let adminStatus = false;
		if (theUser.admin) {
			adminStatus = true;
		}
		let superadmin = false;
		if (theUser.superadmin) {
			superadmin = true;
		}
		theUser.verifiedStatus = true;
		theUser.save((err, savedUser) => {
			const tokenUser = { username: savedUser.username, _id: savedUser._id, is_live: savedUser.is_live, admin: adminStatus, superadmin: superadmin }
			const token = jwt.sign({ user: tokenUser }, process.env.SECRET, {
				expiresIn: '1d',
			});
			return res.json({ user: theUser, token, message: "verification.verified" });
		})
	});
});

// Login
router.post('/login', usernameToLowerCase, function (req, res, next) {
	passport.authenticate('local', { session: false }, function (err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			return res.status(401).send({ error: "Your username and/or password is incorrect." });
		}
		req.login(user, { session: false }, function (err) {
			if (err) { return next(err) }
			let adminStatus = false;
			if (user.admin) {
				adminStatus = true;
			}
			let superadmin = false;
			if (user.superadmin) {
				superadmin = true;
			}
			const theUser = {
				username: user.username,
				_id: user._id,
				is_live: user.is_live,
				active_stream_id: user.active_stream_id,
				admin: adminStatus,
				superadmin: superadmin
			}
			console.log(theUser);
			const token = jwt.sign({ user: theUser }, process.env.SECRET, {
				expiresIn: '30d',
			});
			return res.json({ user: theUser, token });
		});
	})(req, res, next);
});

router.post('/updateName', auth.ensureAuthenticated, accountController.updateName);

router.post('/updateDescription', auth.ensureAuthenticated, accountController.updateDescription);

router.post('/updateUsername', auth.ensureAuthenticated, validator.check_username, accountController.updateUsername);

router.post('/updateEmail', validator.check_email, auth.ensureAuthenticated, accountController.updateEmail);

router.post('/resendEmailVerification', auth.ensureAuthenticated, accountController.resendEmailVerification);

router.post('/updateSocial', auth.ensureAuthenticated, accountController.updateSocial);


router.post('/updatePassword', auth.ensureAuthenticated, async function (req, res) {
	const newPassword = req.body.password;
	const oldPassword = req.body.currentpass;
	const confirmPassword = req.body.passconfirm;

	let success = "Password successfully changed.";
	let fail = "Wrong password.";
	let samePassFail = "New password must be different.";

	const user = await User.findById(req.user._id).select('+password');

	let match = bcrypt.compareSync(oldPassword, user.password);
	
	if (match == true) {
		// check that new pass is not the same as old pass
		if (oldPassword !== newPassword) {
			// hash newPassword
			bcrypt.genSalt(10, function (err, salt) {
				console.log("Inside bcrypt function.")
				bcrypt.hash(newPassword, salt, function (err, hash) {
					if (err) {
						console.log(err);
					}
					console.log("Hashing password.")
					user.password = hash;
					user.save(function (err, updatedUser) {
						if (err) {
							return console.log("Password change failed: ", err);
						} else {
							console.log('Password successfully changed.');
							res.status(200).json({ message: success });
						}
					});
				});
			});
		} else {
			return res.status(400).json({ message: samePassFail })
		}
	} else {
		// Passwords did not match
		return res.status(400).json({ message: fail })
	}
})


router.post('/sendResetPass', validator.forgotPass, accountController.sendResetPass);

/*router.get('/reset/:token', async function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		const user = await User.findOne({
			resetToken: req.params.token
		});

		res.render('pass__reset', {
			valid: !!user && Date.now() < user.resetTokenExpires
		});
	}
})*/

router.post('/reset/', validator.reset, accountController.resetPassword)

router.delete('/deleteAccount', auth.ensureAuthenticated, accountController.deleteAccount);

module.exports = router;