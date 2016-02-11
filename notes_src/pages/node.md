# Node.js

[TOC]


## HTTPS

**Set up HTTPS certificate:** (Press enter on all fields.)

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


## HTTPS Proxy (multiple servers with different domain on same host)

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
