import assert from 'assert'



export default class {

    constructor({mailers}) {
        assert(mailers, "Must supply the mailers options")
        assert(mailers instanceof Array, "mailers options must be an array")
        assert(mailers.length > 0, "Must supply at least 1 mailer")
        this.mailers = mailers;
        this.currentMailerIndex = 0;
        this.send = this.send.bind(this)
    }

    send(message) {
        return sendUsingMailer.bind(this)(0, message)
    }
}

function sendUsingMailer(attempts, message) {
    
    return this.mailers[this.currentMailerIndex].send(message)
        .catch(x => {

            console.error(x, x.stack);
            
            //cycle to next mailer;
            this.currentMailerIndex = (this.currentMailerIndex + 1) % this.mailers.length;

            if ( (attempts + 1) < this.mailers.length)
                return sendUsingMailer.bind(this)(attempts + 1, message)

            throw new Error('Failed to send message on all mailers')
        });
}

