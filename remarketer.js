'use strict'
const Book = require("./plugins/input_websocket.js").Book
const EuroConverter = require("./plugins/convert_euro.js").EuroConverter
const Output = require("./plugins/output_websocket.js").Output

var book = new Book()
var ec = new EuroConverter()
var output = new Output()


//TODO Have it take command line arguments so that it can switch between plugins and add a start and stop method
book.on('snapshot', a => ec.convert_snapshot(a))
book.on('update', a => ec.convert_update(a))
ec.on('conversion', a => output.broadcast(a))
output.on('broadcast', a => console.log(a))