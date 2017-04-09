import assert from 'assert'

class MessagesController {
    constructor({validator, messageSender}) {
        assert(validator && validator.validate,
            "Must supply the validator with a 'validate' method")
        assert(messageSender && messageSender.send,
            "Must supply a messageSender with a `send` method")

        this.validator = validator;
        this.messageSender = messageSender;
        this.send = this.send.bind(this);
    }

    send(req, res) {
        const message = req.body;
        const validationResult = this.validator.validate(message)

        if (!validationResult.isValid) {
            res.status(400);
            res.json(validationResult);
            return Promise.resolve();
        }

        return this.messageSender.send(message)
            .then(_ => {
                res.status(200);
                return res.end();
            })
            .catch(e => {
                console.error(e, e.stack)
                res.status(500)
                res.end();
                return null;
            })
    }
}

export default MessagesController