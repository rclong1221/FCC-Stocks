'use strict'

const Request = require('request')
const Stocks = require(process.cwd() + '/src/models/stocks.js')

const QUANDL_URL = process.env.QUANDL_URL
const QUANDL_KEY = process.env.QUANDL_KEY

const YEARS = 5

class Stock {
  static getStocks(socket) {
    Stocks.find({active: true}).exec(function (err, d) {
      if (err) console.log(err)

      d.forEach(function (item) {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let date = now.getDate()
        let options = {
          method: 'GET',
          url: `${QUANDL_URL}${item.symbol}.json?api_key=${QUANDL_KEY}&start_date=${year - YEARS}-${month}-${date}&end_date=${year}-${month}-${date}`,
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
  }

  static addStock(socket, symbol) {
    // TODO: Test with regex

    // TODO: If pass regex make API call
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()
    let options = {
      method: 'GET',
      url: `${QUANDL_URL}${symbol}.json?api_key=${QUANDL_KEY}&start_date=${year - YEARS}-${month}-${date}&end_date=${year}-${month}-${date}`,
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

        // If stock exists, save to DB
        let stock = new Stocks({
          symbol: dataset.dataset_code,
          name: dataset.name,
          active: true
        })

        Stocks.find({symbol: stock.symbol}).exec(function (err, data) {
          if (err) console.error(err)
          else {
            if (data.length === 0) {
              stock.save(function (err) {
                if (err) console.error(err)
              })
            } else {
              Stocks.update({symbol: stock.symbol}, {$set: {active: true}}, function (err){
                if (err) console.error(err)
              })
            }
            return socket.emit('add stock', dataset)
          }
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

module.exports = Stock
