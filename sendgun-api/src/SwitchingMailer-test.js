import tape from 'tape'
import SwitchingMailer from 'SwitchingMailer'

const FAIL = 1
let sendCount = 0;
let failCount = 0;
let messageSent = null;
function createSender(fail) {
    return {
        send: function (m) {
            if (!fail) sendCount += 1;
            if (fail) failCount += 1;
            console.log(`Sending message... ${fail ? 'FAILED' : 'success'}`);
            messageSent = m;
            return fail ? Promise.reject("fail") : Promise.resolve("OK")
        }
    }
}

tape('SwitchingMailer:should pass the message onto the mailer', t => {

    var target = new SwitchingMailer({
        mailers: [createSender()]
    });
    const messagePassed = { to: 'me'};

    target.send(messagePassed)
        .then(x => {
            t.equal(messageSent, messagePassed);
            t.end();
        })
})

tape('SwitchingMailer:send only to first mailer if no errors', t => {
    sendCount = 0;
    var target = new SwitchingMailer({
        mailers: [createSender(), createSender(FAIL)]
    });

    target.send({})
        .then(x => {
            t.equal(sendCount, 1);
            t.end();
        })
})

tape('SwitchingMailer:use second mailer if first errors', t => {
    sendCount = 0;
    var target = new SwitchingMailer({
        mailers: [createSender(FAIL), createSender()]
    });

    target.send({})
        .then(x => {
            t.equal(sendCount, 1);
            t.end();
        })
})

tape('SwitchingMailer:send should throw if all mailers fail', t => {
    sendCount = 0;
    var target = new SwitchingMailer({
        mailers: [createSender(FAIL), createSender(FAIL), createSender(FAIL)]
    });

    target.send({})
        .then(x => t.fail("should not work!"))
        .catch(e => t.equal(e.message, 'Failed to send message on all mailers'))
        .then(t.end)
})


tape('SwitchingMailer:send should not attempt to send on a failed server', t => {
    sendCount = 0;
    failCount = 0;
    var target = new SwitchingMailer({
        mailers: [createSender(FAIL), createSender()]
    });
    target.send({})
        .then(x => {
            t.equal(sendCount, 1);
            t.equal(failCount, 1);

            target.send({})
                .then(x => {
                    t.equal(sendCount, 2);
                    t.equal(failCount, 1);
                    t.end();
                })
        })


})
