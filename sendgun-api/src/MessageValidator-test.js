import tape from 'tape'
import MessageValidator from 'MessageValidator'

const target = new MessageValidator();

function createRequest() {
    return {
        to: [{ email: "to@test.com", name: "to" }],
        cc: [{ email: "cc@test.com", name: "cc" }],
        bcc: [{ email: "bcc@test.com", name: "bcc" }],
        from: { email: "sender@test.com" },
        subject: "simple subject",
        body: "This is the body of the email"
    }
}


tape('MessageValidator:valid', t => {
    const item = createRequest();
    const result = target.validate(item);
    t.ok(result.isValid);
    t.end();
})

tape('MessageValidator:missing missing to email', t => {
    const item = createRequest();
    delete item.to
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})


tape('MessageValidator:missing empty to', t => {
    const item = createRequest();
    item.to[0].email = '';
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})

tape('MessageValidator:invalid email', t => {
    const item = createRequest();
    item.to[0].email = 'test';
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})

tape('MessageValidator:invalid same email repeated in to', t => {
    const item = createRequest();
    item.to.push({email: item.to[0].email });
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})


tape('MessageValidator:missing from email', t => {
    const item = createRequest();
    item.from.email = '';
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.ok(result.errors[0].message.indexOf(item.from.email) >= 0, result.errors[0])
    t.end();
})

tape('MessageValidator:missing missing subject', t => {
    const item = createRequest();
    item.subject = '';
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})


tape('MessageValidator:empty body', t => {
    const item = createRequest();
    item.body = '';
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})


tape('MessageValidator:missing body', t => {
    const item = createRequest();
    delete item.body 
    const result = target.validate(item);
    t.ok(!result.isValid);
    t.end();
})