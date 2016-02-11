# Node.js

[TOC]


## HTTP server without express

Example, http body parsing and query string parsing:

```js
const url = require('url');
const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World')
  } else if (url.parse(req.url).pathname === '/search') {
    const query = querystring.parse(url.parse(req.url).query)
    res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'})
    res.end(`Received query string: ${JSON.stringify(query, null, 2)}`)
  } else if (req.url === '/data' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'})
      res.end(`Received post body: ${body}`)
    })
  } else {
    res.writeHead(404, {'Content-type': 'text/plain; charset=utf-8'})
    res.end('404 Not Found')
  }
}).listen(8080, () => console.log('Listening on http://127.0.0.1:8080'))
```


## HTTPS

**Set up https certificate:** (Press enter on all fields)

```
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -nodes
```

**Setup server:**

```js
const https = require('https')

https.createServer({
  key: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/key.pem`),
  cert: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/cert.pem`)
}, (req, res) {
  res.end('Hello encrypted world!')
}).listen(8080, () => console.log('Listening on https://localhost:8080'))
```


## Basic Auth

Use basic auth with https, otherwise the username and password is unencrypted.

```js
const fs = require('fs')
const https = require('https')

function authenticate(req, res, cb) {
  let authorized = false
  if (req.headers.authorization) {
    const credentials = new Buffer(req.headers.authorization.replace('Basic ', ''), 'base64').toString().split(/:(.*)/) // Split at first :
    if (credentials[0] === 'user' && credentials[1] === 'pass') {
      authorized = true
    }
  }
  if (authorized) {
    cb()
  } else {
    res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Authenticate"'})
    res.end()
  }
}

https.createServer({
  key: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/key.pem`),
  cert: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/cert.pem`)
}, (req, res) => {
  authenticate(req, res, () => {
    res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'})
    res.end('Successfully authenticated')
  })
}).listen(8080, () => console.log('Listening on https://localhost:8080'))
```


## HTTPS proxy (multiple servers with different domain on same host)

```js
const fs = require('fs')
const https = require('https')
const httpProxy = require('http-proxy')


const rules = {
  'www.example.com': 'http://localhost:3000',
  'api.example.com': 'http://localhost:3001'
}

const proxy = httpProxy.createProxyServer({})

https.createServer({
  key: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/key.pem`),
  cert: fs.readFileSync(`${process.env.HOME}/.secrets/ssl/cert.pem`)
}, (req, res) => {
  if (req.headers.host in rules) {
    proxy.web(req, res, { target: rules[req.headers.host] })
  } else {
    res.writeHead(500)
    res.end(`unknown domain '${req.headers.host}'`)
  }
}).listen(443, () => console.log('https://localhost'))
```


## `ErrorHandler`

```js
// Report errors by email and to error.log

const credentials = JSON.parse(fs.readFileSync(`${process.env.HOME}/.secrets/credentials.json`))

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: credentials.gmailNotifier.user,
    pass: credentials.gmailNotifier.pass
  }
})

function log(msg) {
  fs.appendFile(`${__dirname}/error.log`, `${(new Date()).toISOString()} ${msg}\n`)
}

function sendmail(from, subject, text) {
  transporter.sendMail({
    from: `${from} <${credentials.gmailNotifier.user}>`,
    to: credentials.gmail.user,
    subject: subject,
    text: text,
  }, err => {
    if (err) log(`SENDMAIL ERROR: ${JSON.stringify(err, null, 2)}`)
  })
}

function errorHandler(err, cb) {
  if (!err) return
  log(`ERROR: ${JSON.stringify(err, null, 2)}`)
  sendmail('Fitbit sleep log', 'Error', JSON.stringify(err, null, 2))
}
```
