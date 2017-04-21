import assert from 'assert'
import axios from 'axios'
import qs from 'qs'


export default class {
    constructor({domain, apiKey}) {
        assert(apiKey, "Must pass in an api key")
        assert(domain, "Must pass in the mailgun customer domain")
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: `https://api.mailgun.net/v3/${domain}`,
            auth: {
                username: 'api',
                password: apiKey
            }
        });
    }
    send({from, to, cc, bcc, subject, body }) {

        assert(from && from.email, "from.email must be defined")
        assert(to.length && to.length > 0 && to[0].email, "at least 1 to.email must be defined")

        const toEmailString = x => `${x.name ? x.name + ' ' : ''}<${x.email}>`;
        const mapEmails = x => x.map(toEmailString).join(', ')

        var request = {
            from: toEmailString(from),
            to: mapEmails(to),
            subject: subject,
            text: body || '-',
        }

        if(cc && cc.length > 0) request.cc = mapEmails(cc)
        if(bcc  && bcc.length > 0) request.bcc = mapEmails(bcc)

        return this.client.post('/messages', qs.stringify(request), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

}