const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.MAILGUN_TOKEN;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
 

module.exports = {
	sendVerificationMail(email, link) {
		console.log(link, 'mail js file');
		const data = {
		  from: 'Costream <noreply@costream.one>',
		  to: email,
		  subject: 'Welcome to Costream',
		  html: '',
		  text: `Verify your email address to get the most of Costream by clicking this link ${link}`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},


	sendResetMail(email, link) {
		console.log(link, 'mail js file');
		const data = {
		  from: 'Costream <noreply@costream.one>',
		  to: email,
		  subject: 'Password reset to Costream',
		  html: '',
		  text: `To reset your Costream password, click on this link ${link}. The reset link expires in 30 minutes.`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	}
}
