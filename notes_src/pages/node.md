# Node.js

[TOC]


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
