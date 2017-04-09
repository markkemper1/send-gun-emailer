import tape from 'tape'
import Router from 'Router'

const mocks  = { messagesController: { send: _=> "send called"}}
const router = new Router(mocks);


tape('Router:configure should attach messagesController to post /api/email', t => {

    var calledWith = {};
    const app = {
        post: (path, handler) => {
            calledWith.path = path;
            calledWith.handler = handler;
        }
    };

    router.configure(app)

    t.equal(calledWith.path, '/api/email', `call with path: ${calledWith.path}`);
    t.equal(calledWith.handler(), "send called", calledWith.handler())
    t.end();

})
