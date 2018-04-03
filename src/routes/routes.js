'use strict'

const path = process.cwd()
const Stock = require(path + '/src/controllers/stockController.server.js')

var routes = function (app) {
  app.route('/')
    .get(function (req, res) {
      res.sendFile(path + '/public/index.html')
    })

  app.route('/api/stocks')
    .get(Stock.getStocks)

  app.route('/api/stock/:symbol')
    .post(Stock.addStock)
}

module.exports = routes
