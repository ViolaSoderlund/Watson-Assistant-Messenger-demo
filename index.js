'use strict';

//#region IMPORTS

// Imports the messanger app setup
const webhookSetup = require('./messenger/webhook_setup');

// Import assistant manager
const assistantManager = require('./assistant/watson_assistant');

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

//#endregion

// Setup messagner comm
webhookSetup(app, assistantManager.analyzeMessage);

// Open assistant session
assistantManager.openSession();

const PORT = process.env.PORT || 1337;

// Sets server port and logs message on success
const server = app.listen(PORT, () => console.log('Server is listening on PORT: ' + PORT));

server.on('close', function() {
  console.log(' Stopping ...');

  assistantManager.closeSession();
});

process.on('SIGINT', function() {
  server.close(function() {
    process.exit(0);
  });
});

module.exports = server;