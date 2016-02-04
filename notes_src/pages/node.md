# Node.js

## HTTPS

**Set up HTTPS certificate:** (Press enter on all fields.)

```
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -nodes
```

**Setup server:**

```js
var options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}

// app is a requestListener, e.g. app = express()
https.createServer(options, app).listen(8080, function() {
 console.log('Listening on https://localhost:8080')
})
```

## Proxy (multiple servers with different domain on same host)

```js
const fs = require('fs')
const https = require('https')
const httpProxy = require('http-proxy')


const servers = {
  'laptop.viktorq.se': new httpProxy.createProxyServer({ target: 'http://localhost:3000' })
}

function errorHandler(err, req, res) {
  if (err) console.log(err)
  res.writeHead(500)
  res.end('INTERNAL SERVER ERRROR')
}

https.createServer({

  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')

}, (req, res) => {

  if (req.headers.host in servers) {
    servers[req.headers.host].proxyRequest(req, res)
    servers[req.headers.host].on('error', errorHandler)
  } else {
    res.writeHead(500)
    res.end(`unknown domain '${req.headers.host}'`)
  }

}).listen(443, () => console.log('https...'))
```
