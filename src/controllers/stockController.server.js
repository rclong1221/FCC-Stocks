'use strict'

const Request = require('request')
const Stocks = require(process.cwd() + '/src/models/stocks.js')

const Q_URL = process.env.QUANDL_URL
const Q_KEY = process.env.QUANDL_KEY

const YEARS = 5

class Stock {
  static getStocks(socket) {
    Stocks.find({active: true}).exec()
    .then(function (d) {
      d.forEach(function (item) {
        let date = _getDate()
        let options = {
          method: 'GET',
          url: `${Q_URL}${item.symbol}.json?api_key=${Q_KEY}&start_date=${date.year - YEARS}-${date.month}-${date.day}&end_date=${date.year}-${date.month}-${date.day}`,
          type: 'json',
          headers: { 'cache-control': 'no-cache' }
        }

        Request(options, function (err, response, body) {
          if (err) console.error(err)
          else if (!body) console.error("No body")
          else {
            let dataset = JSON.parse(body).dataset
            if (dataset) {
              let response = {
                data: dataset.data,
                dataset_code: dataset.dataset_code,
                name: dataset.name
              }
              return socket.emit('add stock', response)
            }
          }
        })
      })
    })
    .catch(function (err) {
      if (err) console.log(err)
    })
  }

  static addStock(socket, symbol) {
    // TODO: Test with regex

    // TODO: If pass regex make API call
    let date = _getDate()
    let options = {
      method: 'GET',
      url: `${Q_URL}${symbol}.json?api_key=${Q_KEY}&start_date=${date.year - YEARS}-${date.month}-${date.day}&end_date=${date.year}-${date.month}-${date.day}`,
      type: 'json',
      headers: { 'cache-control': 'no-cache' }
    }

    Request(options, function (err, response, body) {
      let dataset
      if (err) console.error(err)
      else if (!body) console.error("No body")
      else if (!JSON.parse(body).dataset) return socket.emit('invalid symbol', symbol)
      else {
        dataset = JSON.parse(body).dataset

        Stocks.findOneAndUpdate({symbol: dataset.dataset_code}, {active: true}, {upsert: true}, function(err, s){
          if (err) console.log(err)
          return socket.emit('add stock', dataset)
        })
      }
    })
  }

  static removeStock(socket, symbol) {
    Stocks.update({symbol: symbol}, {$set: {active: false}}, function (err){
      if (err) console.error(err)
      else return socket.emit('remove stock', symbol)
    })
  }
}

function _getDate() {
  let now = new Date()
  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
  }
}

module.exports = Stock
