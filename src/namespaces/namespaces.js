'use strict'

const Stock = require(process.cwd() + '/src/controllers/stockController.server.js')

var nsp = function (io) {
  var mns = io.of('/my-namespace')

  mns.on('connection', function(socket){
    // Get all data and send to user

    console.log('User connected')
    Stock.getStocks(socket)

    socket.on('disconnect', function(s){
      console.log('User disconnected')
    })

    socket.on('add stock', function(symbol){
      Stock.addStock(mns, symbol)
    })

    socket.on('remove stock', function(symbol){
      Stock.removeStock(mns, symbol)
    })
  })
}

module.exports = nsp
