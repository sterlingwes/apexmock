var express = require('express')
var https = require('https')
var parser = require('body-parser')
var fs = require('fs')
var app = express()
var del = require('del')
var mkdirp = require('mkdirp')

var PORT = 443
var FOLDER = 'requests'

var sslOptions = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
}

app.use(parser.json())

/*
 * on start, clean out old requests
 */
del.sync([FOLDER])

app.use(function (req, res, next) {
  if (!/salesforce\.com$/.test(req.hostname)) {
    console.warn('!!! Unknown host request !!!', req.hostname, req.path)
    return res.status(404).send('404')
  }

  var timestamp = Date.now()

  var folder = FOLDER + req.path
  mkdirp(folder, function (err) {
    if (err) throw err

    var file = folder + '/' + timestamp + '.json'
    console.log('-', 'writing request', file)

    fs.writeFile(file, JSON.stringify(req.body, null, ' '), function (err) {
      if (err) console.error('!', err)
      res.json('SF_MOCK_ID_' + timestamp)
    })
  })
})

https
  .createServer(sslOptions, app)
  .listen(PORT, function () {
    console.log('Listening on port ' + PORT)
  })
