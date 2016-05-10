'use strict'

const yahooFinance = require('yahoo-finance');
const EventEmitter = require('events')
const FIELDS = ['a']
const SYMBOL = "EURUSD=X"

class EuroConverter extends EventEmitter {
  constructor() {
    super()
    this.EURO_rate = 0
    this.get_euro_rate()
    this.int_id = setInterval(this.get_euro_rate, 5000)
  }
  get_euro_rate() {
    var self = this
    yahooFinance.snapshot({
      fields: FIELDS,
      symbol: SYMBOL
    }).then(function(snapshot) {
      self.EURO_rate = snapshot.ask
    })
  }
  convert_update(data) {
    var self = this
    var price = data[1]
    var converted_price = (price / self.EURO_rate).toPrecision(7)
    data[1] = converted_price
    this.emit('conversion', data)
  }
  convert_snapshot(data) {
    var self = this
    data.map(function(x) {
      var price = x[1]
      var converted_price = (price / self.EURO_rate).toPrecision(7)
      x[1] = converted_price
    })
    this.emit('conversion', data)
  }
}
module.exports = {
  EuroConverter: EuroConverter
}