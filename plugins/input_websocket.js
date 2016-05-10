'use strict'
const WebSocket = require('ws')
const EventEmitter = require('events')

//TODO get a larger book
class Book extends EventEmitter {
  constructor() {
    super()
    var w = new WebSocket("wss://api2.bitfinex.com:3000/ws")
    w.on("message", (function(msg) {
      msg = JSON.parse(msg)
      if (msg.event == "subscribed") {

      } else if (msg.event == "info") {

      } else if (msg[1] == "hb") {

      } else if (msg == 'undefined') {

      } else if (msg[1] instanceof Array) {
        msg.shift()
        msg = msg[0]
        this.emit("snapshot", msg)
      } else {
        msg.shift()
        this.emit("update", msg)
      }
    }).bind(this))
    w.on("open", function() {
      w.send(JSON.stringify({
        "event": "subscribe",
        "channel": "book",
        "pair": "BTCUSD",
        "prec": "R0",
        "len": 25
      }))
    })
  }
}

module.exports = {
  Book: Book
}