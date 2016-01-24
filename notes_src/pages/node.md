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
