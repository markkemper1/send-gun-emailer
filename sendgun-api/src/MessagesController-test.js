import tape from 'tape'
import MessagesController from 'MessagesController'
import MockHttpResponse from 'MockHttpResponse'

tape('MessagesController:send invalid message', t => {

    const mocks = {
        validator: {
            validate: _ => "send called"
        },
        messageSender: {
            send: m => { throw "don't call me!" }
        }
    };

    const target = new MessagesController(mocks);
    const res = new MockHttpResponse();
    target.send({ body: {} }, res)
        .then(_ => {
            t.equal(res._statusCode, 400, "400 bad request returned")
            t.equal(res._json, "send called")
            t.end();
        })
        .catch(t.fail);

})

tape('MessagesController:send valid message, sender success', t => {

    let senderCalled = false;
    const mocks = {
        validator: {
            validate: _ => ({ isValid: true })
        },
        messageSender: {
            send: m => { senderCalled = true; return Promise.resolve(true) }
        }
    };

    const target = new MessagesController(mocks);
    const res = new MockHttpResponse();

    target.send({ body: {} }, res)
        .then(_ => {
            t.equal(res._statusCode, 200, "200 OK")
            t.equal(true, senderCalled)
            t.end();
        })
        .catch(t.fail);

})

//Server errors could be handled by a global error handler but since we only have 
// one controller I'll just handle them directly in the controller.
tape('MessagesController:send valid message, sender exception', t => {

    const mocks = {
        validator: {
            validate: _ => ({ isValid: true })
        },
        messageSender: {
            send: m => { return Promise.reject(new Error("hairy error")) }
        }
    };

    const target = new MessagesController(mocks);
    const res = new MockHttpResponse();

    target.send({ body: {} }, res)
        .then(_ => {
            t.equal(res._statusCode, 500, "500 Server Error")
            t.end();
        })
        .catch(t.fail);

})
