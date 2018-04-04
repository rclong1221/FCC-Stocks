'use strict'

const express = require('express')
const app = express()
const http = require('http').Server(app)
const mongoose = require('mongoose')
const io = require('socket.io')(http)
const PORT = 5000

require('dotenv').load()

mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise

app.use('/controllers', express.static(process.cwd() + '/src/controllers'))
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/common', express.static(process.cwd() + '/src/common'))

app.set('port', process.env.PORT || PORT)

var server = http.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}...`)
})

var routes = require('./src/routes/routes.js')(app)

const namespaces = require('./src/namespaces/namespaces.js')(io)
