import tape from 'tape'
import SendGridMailer from 'SendGridMailer'

const isEntryPoint = require.main === module;

if (isEntryPoint) {

    tape("[INTEGRATION]SendGridMailer:send should be able to send an email", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            cc: [{ "email": "markkemper1+cc@gmail.com", name: "cc Mark" }],
            bcc: [{ "email": "markkemper1+bcc@gmail.com", name: "bcc Mark" }],
            from: { "email": "test@example.com" },
            subject: "Sending with SendGrid is Fun",
            body: "This is the body of the email"
        }

        const target = new SendGridMailer({ apiKey: process.env.SENDGRID_API_KEY });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.log(e.response.data))
    })

    tape("[INTEGRATION]SendGridMailer:send minimum fields needed", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            from: { "email": "test@example.com" },
            subject: "-",
            body: "-"
        }

        const target = new SendGridMailer({ apiKey: process.env.SENDGRID_API_KEY });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.error(e.response.data))
    })


    tape("[INTEGRATION]MailGunMailer:send with empty cc / bcc fields", { skip: !isEntryPoint }, t => {

        const request = {
            to: [{ "email": "markkemper1@gmail.com", name: "to Mark" }],
            bcc: [], cc: [],
            from: { "email": "test@example.com" },
            subject: "-",
            body: "-"
        }

        const target = new SendGridMailer({ apiKey: process.env.SENDGRID_API_KEY });

        target.send(request)
            .then(t.pass)
            .then(t.end)
            .catch(e => console.error(e.response.data))
    })

}