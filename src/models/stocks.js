'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Stocks = new Schema({
  symbol: { type: String, unique: true },
  name: String,
  active: Boolean
})

module.exports = mongoose.model('Stocks', Stocks)
