'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Stock = new Schema({
  symbol: String,
  name: String
})

module.exports = mongoose.model('Stock', Stock)
