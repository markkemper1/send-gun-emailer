require('source-map-support').install();

import Server from './Server'
import Router from 'Router'
import MessagesController from 'MessagesController'
import MailGunMailer from 'MailGunMailer'
import MessageValidator from 'MessageValidator'
import SendGridMailer from 'SendGridMailer'
import SwitchingMailer from 'SwitchingMailer'

const env = process.env;
const mailGun = new MailGunMailer(
    {
        domain: env.MAILGUN_DOMAIN, 
        apiKey: env.MAILGUN_API_KEY
    });
const sendGrid = new SendGridMailer({apiKey: env.SENDGRID_API_KEY});
const messageSender = new SwitchingMailer({mailers: [sendGrid, mailGun]}) 
const validator = new MessageValidator();
const messagesController = new MessagesController({validator, messageSender})
const router = new Router({messagesController});
const server = new Server({router});

server.start(process.env.PORT || 3000);

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    server.close()
        .then(process.exit);
});