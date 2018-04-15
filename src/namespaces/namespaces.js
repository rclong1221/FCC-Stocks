'use strict'

const Stock = require(process.cwd() + '/src/controllers/stockController.server.js')

var stockNamespace = function (io) {
  var stockNs = io.of('/stocks-ns')

  stockNs.on('connection', function(socket){
    // Get all data and send to user
    Stock.getStocks(socket)

    socket.on('add stock', function(symbol){
      Stock.addStock(stockNs, symbol)
    })

    socket.on('remove stock', function(symbol){
      Stock.removeStock(stockNs, symbol)
    })
  })
}

module.exports = stockNamespace
