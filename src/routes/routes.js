'use strict'

const path = process.cwd()
const Stock = require(path + '/src/controllers/stockController.server.js')

var routes = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path + '/public/index.html')
  })

  app.get('/api/stocks', Stock.getStocks)
}

module.exports = routes
