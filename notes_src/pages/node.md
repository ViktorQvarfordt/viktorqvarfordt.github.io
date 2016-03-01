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


## Async flow control

```js
const flow = {
  parallel: (funs, cb) => {
    let totalResult = []
    let counter = 0
    let someError = false
    for (let i = 0; i < funs.length; i++) {
      funs[i]((err, result) => {
        totalResult[i] = result
        counter++
        if (err) {
          cb(err)
          someError = true
        }
        if (!someError && counter === funs.length) {
          cb(null, totalResult)
        }
      })
    }
  },
  series: (funs, cb) => {
    let totalResult = []
    let i = 0
    const next = () => {
      funs[i]((err, result) => {
        totalResult.push(result)
        if (err) cb(err)
        else if (i++ < totalResult) next()
        else cb(null, totalResult)
      })
    }
    next()
  }
}
```


## HTTPS proxy (multiple servers with different domain on same host)

```js
const fs = require('fs')
const http = require('http')
const https = require('https')
const httpProxy = require('http-proxy')


const rules = {
  'www.example.com': 'http://localhost:3000',
  'api.example.com': 'http://localhost:3001'
}

const proxy = httpProxy.createProxyServer({ secure: false })
proxy.on('error', (err, req, res) => { console.log(err); res.end() })


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
}).listen(443, () => console.log('Proxy server listening on https://127.0.0.1'))


http.createServer((req, res) => {
  res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` })
  res.end()
}).listen(80, () => console.log('HTTP -> HTTPS redirect server listening on http://127.0.0.1'))
```



## Simple DB

```js
const fs = require('fs')
const http = require('http')

const dbPath = `${__dirname}/db.json`

http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)
  if (req.method === 'GET' && req.url === '/db') {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end()
      } else {
        res.writeHead(200, { 'Content-type': 'application/json; charset=utf8' })
        res.end(data)
      }
    })
  } else if (req.method === 'POST' && req.url === '/db') {
    res.end()
    fs.writeFile(dbPath, err => {
      if (err) {
        res.writeHead(500)
        res.end()
      } else {
        res.end()
      }
    })
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.end(`404 ${req.url}`)
  }
}).listen(8080, () => console.log('Running...'))
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
  const msg = `${(new Date()).toISOString()} ${msg}`
  console.log(msg)
  fs.appendFile(`${__dirname}/error.log`, `${msg}\n`)
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
