'use strict'

const yahooFinance = require('yahoo-finance');
const EventEmitter = require('events')
const FIELDS = ['a']
const SYMBOL = "EURUSD=X"

//TODO build a caching mechanism
class EuroConverter extends EventEmitter {
  constructor() {
    super()
  }
  convert(data) {
    yahooFinance.snapshot({
      fields: FIELDS,
      symbol: SYMBOL
    }).then((function(snapshot) {
      var USD_price = data[2]
      var EURO_rate = snapshot.ask
      var EURO_price = (USD_price / EURO_rate).toPrecision(6)
      data[2] = EURO_price
      this.emit('conversion', data)
    }).bind(this));
  }
}

module.exports = {
  EuroConverter: EuroConverter
}