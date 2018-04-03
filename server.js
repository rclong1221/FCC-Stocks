'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000

require('dotenv').load()

mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise

app.use('/controllers', express.static(process.cwd() + '/src/controllers'))
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/common', express.static(process.cwd() + '/src/common'))

app.set('port', process.env.PORT || PORT)

var server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}...`)
})

var routes = require('./src/routes/routes.js')(app)
