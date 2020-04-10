const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.MAILGUN_TOKEN;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
 

module.exports = {
	sendVerificationMail(email, link) {
		console.log(link, 'mail js file');
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: 'Welcome to Eeter.tv',
		  html: '',
		  text: `Verify your email address to get the most of Eeter.tv by clicking this link ${link}`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},


	sendResetMail(email, link) {
		console.log(link, 'mail js file');
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: 'Password reset to Eeter.tv',
		  html: '',
		  text: `To reset your Eeter.tv password, click on this link ${link}. The reset link expires in 30 minutes.`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	}
}
