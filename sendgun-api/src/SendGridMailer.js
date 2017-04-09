import assert from 'assert'
import axios from 'axios'



export default class {
    constructor({apiKey}) {
        assert(apiKey, "Must pass in an api key")
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: 'https://api.sendgrid.com/'
        });
    }
    send({from, to, cc, bcc, subject, body }) {

        assert(from && from.email, "from.email must be defined")
        assert(to.length && to.length > 0 && to[0].email, "at least 1 to.email must be defined")

        const request = transformMessage(from, to, cc, bcc, subject, body)

        return this.client.post('/v3/mail/send', request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        })
    }

}

const transformMessage = (from, to, cc, bcc, subject, body) => {

    const result = {
        personalizations: [{ to: to }],
        from: from,
        subject: subject,
        content: [
            {
                type: 'text/plain',
                value: body
            }
        ]
    };

    if (cc && cc.length > 0)
        result.cc = cc;

    if (bcc && bcc.length > 0)
        result.bcc = bcc;

    return result;

};
