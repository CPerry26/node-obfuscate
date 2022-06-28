// Require express and create a new express app.
var express = require('express');
var app = express();

// Bind the router/controller to the app.
var ObfuscateController = require('./ObfuscateController');
app.use('/obfuscate', ObfuscateController);

// Export the app to be used in other files.
module.exports = app;