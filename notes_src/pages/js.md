# JS

## HTTP

```js
window.http = (function() {

  var logger = function(err, data) {
    console.log(err, data)
  }

  return {

    get: function(url, cb) {

      if (!cb) cb = logger

      var request = new XMLHttpRequest()
      request.open('GET', url)

      request.onload = function() {
        if (this.status === 200) {
          var err = null
          var data = null
          try {
            data = JSON.parse(this.response)
          } catch (e) {
            err = 'Cannot parse response: ' + this.response
          }
          cb(err, data)
        } else {
          cb(this)
        }
      }

      request.onerror = function() { cb(this) }

      request.send()

    },

    post: function(url, data, cb) {

      if (!cb) cb = logger

      var request = new XMLHttpRequest()
      request.open('POST', url)
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8')

      request.onload = function() {
        if (this.status === 200) {
          var resData = JSON.parse(this.response)
          cb(null, resData)
        } else {
          cb(this)
        }
      }

      request.onerror = function() { cb(this) }

      request.send(JSON.stringify(data))

    },

    put: function(url, data, cb) {

      if (!cb) cb = logger

      var request = new XMLHttpRequest()
      request.open('PUT', url)
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8')

      request.onload = function() {
        if (this.status === 200) {
          var resData = JSON.parse(this.response)
          cb(null, resData)
        } else {
          cb(this)
        }
      }

      request.onerror = function() { cb(this) }

      request.send(JSON.stringify(data))

    },

    delete: function(url, cb) {

      if (!cb) cb = logger

      var request = new XMLHttpRequest()
      request.open('DELETE', url)

      request.onload = function() {
        if (this.status === 200) {
          cb(null)
        } else {
          cb(this)
        }
      }

      request.onerror = function() { cb(this) }

      request.send()

    }

  }

})()
```

## ArrOp

```js
function match(el, query) {
  var result = true
  for (var prop in query) {
    // Treat time objects separately. To make a proper comparison we must use .getTime()
    if (el[prop] && el[prop].getTime && query[prop].getTime) {
      if (el[prop].getTime() !== query[prop].getTime()) {
        result = false
        break
      }
    } else {
      if (el[prop] !== query[prop]) {
        result = false
        break
      }
    }
  }
  return result
}

window.arrop = {

  remove: function(arr, query) {
    var count = 0
    var i = arr.length
    while (i--) {
      if (match(arr[i], query)) {
        arr.splice(i, 1)
        count++
      }
    }
    return count
  },

  removeByFilter: function(arr, query) {
    var count = 0
    arr = arr.filter(function(el) {
      if (match(el, query)) {
        count++
      }
      return match
    })
    return count
  },

  findOne: function(arr, query) {
    for (var i = 0; i < arr.length; i++) {
      if (match(arr[i], query)) {
        return arr[i]
      }
    }
    return null
  },

  contains: function(arr, query) {
    return this.findOne(arr, query) !== null
  },

  indexOf: function(arr, query) {
    for (var i = 0; i < arr.length; i++) {
      if (match(arr[i], query)) {
        return i
      }
    }
    return -1
  }

}
```
