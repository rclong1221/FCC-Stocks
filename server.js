'use strict'

const express = require('express')
const app = express()
const PORT = 5000

app.set('port', process.env.PORT || PORT)

console.log(process.env.PORT)

var server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}...`)
})

var routes = require('./src/routes/routes.js')(app)
