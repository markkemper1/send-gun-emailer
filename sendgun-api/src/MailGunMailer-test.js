import tape from 'tape'
import MailGunMailer from 'MailGunMailer'


const isEntryPoint = require.main === module;

if (isEntryPoint) {

    tape("[INTEGRATION]MailGunMailer:send should be able to send an email", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            cc: [{ "email": "markkemper1+cc@gmail.com", name: "cc Mark" }],
            bcc: [{ "email": "markkemper1+bcc@gmail.com", name: "bcc Mark" }],
            from: { "email": "test@example.com" },
            subject: "Sending with MailGun is fun",
            body: "This is the body of the email"
        }

        const target = new MailGunMailer(
            {
                domain: process.env.MAILGUN_DOMAIN,
                apiKey: process.env.MAILGUN_API_KEY
            });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.error(e.response.data))
    })

    tape("[INTEGRATION]MailGunMailer:send minimum fields needed", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            from: { "email": "test@example.com" }
        }

        const target = new MailGunMailer(
            {
                domain: process.env.MAILGUN_DOMAIN,
                apiKey: process.env.MAILGUN_API_KEY
            });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.error(e.response.data))
    })

    tape("[INTEGRATION]MailGunMailer:send with empty cc / bcc fields", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            bcc: [], cc: [],
            from: { "email": "test@example.com" }
        }

        const target = new MailGunMailer(
            {
                domain: process.env.MAILGUN_DOMAIN,
                apiKey: process.env.MAILGUN_API_KEY
            });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.error(e.response.data))
    })
}