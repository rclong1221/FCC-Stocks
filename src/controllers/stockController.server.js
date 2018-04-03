'use strict'

class Stock {
  static getStocks(req, res) {
    res.json({ stocks: [
      { symbol: 'appl', data: [] },
      { symbol: 'msft', data: [] }
    ]})
  }
}

module.exports = Stock
