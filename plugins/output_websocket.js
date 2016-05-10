'use strict'
const EventEmitter = require('events')

class Output extends EventEmitter {
  broadcast(data) {
    this.emit("broadcast", data)
  }
}

module.exports = {
  Output: Output
}