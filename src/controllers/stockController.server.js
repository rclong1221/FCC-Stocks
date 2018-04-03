'use strict'

const Stocks = require(process.cwd() + '/src/models/stocks.js')

class Stock {
  // TODO: Test with regex

  // TODO: If pass regex make API call

  // TODO: If stock exists, save to DB

  static getStocks(req, res) {
    res.json({ stocks: [
      { symbol: 'appl', data: [] },
      { symbol: 'msft', data: [] }
    ]})
  }

  static addStock(req, res) {
    let stock = new Stocks({
      symbol: req.params.symbol,
      name: "Microsoft",
      active: true
    })

    var options = { upsert: true, new: true };

    Stocks.findOneAndUpdate({symbol: stock.symbol}, {name: stock.name, active: stock.active}, options, function (err, result) {
      if (err) {
        throw console.error(err)
        res.status(500).json({ desc: "save failed" })
      }
      else {
        res.json({ desc: "save success"})
      }
    })
  }
}

module.exports = Stock
