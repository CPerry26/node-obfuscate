// Require express and create a new express app.
var express = require('express');
var app = express();

// Bind the router/controller to the app.
var ObfuscateController = require('./ObfuscateController');
app.use('/obfuscate', ObfuscateController);

// Export the app to be used in other files.
module.exports = app;

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })