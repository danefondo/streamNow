const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// Bring in User Model
let User = require('../models/user');
// const mail = require('../utils/mail');
const accountController = require('../controller/accounts');
// const accountUtil = require('../utils/account')
const validator = require('../controller/validator');

// Generate token
// const generateToken = (username) => {
// 	return crypto.createHmac('sha256', process.env.SIGN_SECRET).update(username).digest('hex');
// };

// this resource suggest using async for crypto.randomBytes
// https://github.com/nodejs/help/issues/457


router.post('/checkUnique', accountController.checkUnique);

router.post('/register', validator.register, accountController.register);

//token verification
router.get('/verify/:verificationToken', function(req, res, next) {
	const { verificationToken } = req.params;
	User.findOne({ verificationToken }, (verifyError, theUser) => {
		if (verifyError) {
			console.log('DB error', verifyError);
			return res.status(500).send({ message: "An error occurred" });
		}
		if (!theUser) {
			console.log('Please ensure you have created an account');
			return res.status(401).send({ message: "Please ensure you have an account" });
		}
		theUser.verifiedStatus = true;
		theUser.save((err, savedUser) => {
			console.log('user verified');
			req.login(savedUser, function (err) {
        		if ( ! err ){
            		res.redirect('/successful-registration');
        		} else {
            		//handle error
        		}
    		});
		})
	});
});

// Login
router.post('/login', function(req, res, next){
  passport.authenticate('local', { session: false }, function(err, user, info) {
  	if (err) { return next(err) }
  	if (!user) {
  		return res.status(401).send({ error: "Your username and/or password is incorrect." });
  	}
  	req.login(user, { session: false }, function(err) {
		if (err) { return next(err) }
		const theUser = { username: user.username, _id: user._id, is_live: user.is_live }
		const token = jwt.sign({ user: theUser }, process.env.SECRET, { 
			expiresIn: '1d',
		});
		return res.json({ user: theUser, token });
  	});
  })(req, res, next);
});

// Logout
router.get('/logout', function(req, res) {
	req.logout();
	console.log('You are logged out');
	res.redirect('/');
});

router.post('/updateName', ensureAuthenticated, accountController.updateName);

router.post('/updateDescription', ensureAuthenticated, accountController.updateDescription);

router.post('/updateUsername', ensureAuthenticated, validator.check_username, accountController.updateUsername);

router.post('/updateEmail', validator.check_email, accountController.updateEmail);

router.post('/updateSocial', ensureAuthenticated, accountController.updateSocial);


router.post('/updatePassword', function(req, res) {
	const newPassword = req.body.password;
	const oldPassword = req.body.currentpass;
	const confirmPassword = req.body.passconfirm;

	let success = "Password successfully changed.";
	let fail = "Wrong password.";
	let samePassFail = "New password must be different.";

	const hashedPass = req.user.password;
	console.log("hashed", hashedPass);
	console.log("old", oldPassword);

	let match = bcrypt.compareSync(oldPassword, hashedPass);

	if (match == true) {
		// check that new pass is not the same as old pass
		if (oldPassword !== newPassword) {
			// hash newPassword
			bcrypt.genSalt(10, function(err, salt) {
				console.log("Inside bcrypt function.")
				bcrypt.hash(newPassword, salt, function(err, hash) {
					if(err) {
						console.log(err);
					}
					console.log("Hashing password.")
					User.findById(req.user._id, function(err, user) {
						user.password = hash;

						user.save(function(err, updatedUser) {
							if(err) {
								return console.log("Password change failed: ", err);
							} else {
								console.log('Password successfully changed.');
								res.status(200).json({success: success});
							}
						});
					})
				});
			});
		} else {
			return res.status(500).json({message: samePassFail})
		}
	} else {
		// Passwords did not match
		return res.status(500).json({message: fail})
	}
})


router.post('/sendResetPass', validator.forgotPass, accountController.sendResetPass);

router.get('/reset/:token', async function(req, res) {
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
})


router.post('/reset/', validator.reset, accountController.resetPassword)

router.delete('/deleteAccount', ensureAuthenticated, accountController.deleteAccount);

/*====== Access control  ======*/
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		console.log("Authentication successful.");
	  return next();
	} else {
		console.log("Authentication failed.");
	  res.redirect(302, '/');
	}
}


module.exports = router;