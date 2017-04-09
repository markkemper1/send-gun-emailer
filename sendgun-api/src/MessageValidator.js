import assert from 'assert'
import Ajv from 'ajv'
import schema from 'EmailSchema.json'


var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}


class MessageValidator {
    constructor() {
        this.internalValidate = ajv.compile(schema);
        this.validate = this.validate.bind(this);
    }
    validate(item) {
        const result = this.internalValidate(item);
        
        const errors = (this.internalValidate.errors || [])
            .map(x=> ({message: x.message, field: x.dataPath }))       

        const toCcBccEmailHash = emailsToHash(item)

        for (var email in toCcBccEmailHash) {
            if (toCcBccEmailHash[email] > 1)
                errors.push({message: `The email: ${email} appears multiple times in the to, cc or bcc fields`})
        }
        
        return {
            isValid: result && errors.length === 0,
            errors: errors
        }
    }
}

function emailsToHash(item) {
    const result = {}
    const addOne = e => result[e.email] = result[e.email] ? result[e.email] + 1 : 1;
    if(item.to) item.to.forEach(addOne);
    if (item.cc) item.cc.forEach(addOne)
    if (item.bcc) item.bcc.forEach(addOne)
    return result;
}

export default MessageValidator