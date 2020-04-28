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
		  subject: 'Kinnita oma meiliaadress',
		  html: '',
		  text: `Palun kinnita oma kasutaja registreerimine vajutades allolevale nupule. ${link}`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},

	sendWelcomeEmail(email, link) {
		console.log(link, 'mail js file');
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: 'Tere tulemast Eeter.tv kasutajaks!',
		  html: '',
		  text: `Tere tulemast Eeter.tv kasutajaks! Meil on hea meel, et otsustasid meiega liituda. Oleme alles uus ja kasvav kommuun, mitõttu väärtustame sinu liitumist kohe eriti palju. Uuri ringi või tee oma etteaste kõikide teiste uudishimulike ees!`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},

	sendVideoSignUpEmail(email, stream) {
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: `Registreerisid vaatama ${stream_name}`,
		  html: '',
		  text: `Ära muretse! Tuletame sulle meelde kohe kui ${stream_name} eetrisse läheb! Seniks, mine uudista Eeter.tv lehel ringi, äkki leiad midagi muud põnevat.`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},


	sendVideoSignUpReminderEmail30(email, stream) {
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: `Kohe eetris: ${stream_name}`,
		  html: '',
		  text: `Ära unusta! ${stream_name} on juba 30 minuti pärast eetris!`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},

	sendVideoSignUpReminderEmail(email, stream) {
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: `${stream_name} on eetris!`,
		  html: '',
		  text: `${stream_name} on juba eetris! Tõtta vaatama!`
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
		  subject: 'Eeter.tv parooli lähtestamine',
		  html: '',
		  text: `Parooli lähtestamiseks vajuta sellele viitele ${link}. Viide aegub 30 minuti jooksul.`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	},

	sendInterestReceived(email, stream) {
		const data = {
		  from: 'Eeter.tv <noreply@eeter.tv>',
		  to: email,
		  subject: `Soovisid minna eetrisse?`,
		  html: '',
		  text: `Meil on väga hea meel, et oled huvitatud oma sisu Eeter.tv keskkonnas jagama. Su
		  soov jõudis meieni ja võtame sinuga ühendust!`
		};
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	}
}
