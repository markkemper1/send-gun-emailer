import tape from 'tape'
import Server from 'Server'


const port = 30000
const server = new Server({ router: { configure: _ => { } } });



tape('Server:start should fail with empty port', t => {
    server.start().catch(t.pass).then(t.end)
})

tape('Server:start should fail with non integer ', t => {
    server.start().catch(t.pass).then(_ => t.end())
})

tape('Server:start should fail with negitive port number', t => {
    server.start(-1).catch(t.pass).then(_ => t.end())
})

tape('Server:start should fail with invalid port number', t => {
    server.start(10000000).catch(t.pass).then(_ => t.end())
})

tape('Server: should start with a valid port number', t =>
    server.start(port).then(t.pass).then(t.end)
)

tape('Server:stop should stop cleanly', t =>
    server.close().then(t.pass).then(t.end)
)