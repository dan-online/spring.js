#!/usr/bin/env node
module.exports.start = async function(cb, options) {
  const app = require("../main/server")(options);
  const http = require("http");
  // Msg
  const log = require("../main/tests/logger");
  if (process.argv.find(x => x == "test")) {
    log("test");
  }
  log("initialize");
  // Port init
  function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }
  const port = normalizePort(options.port);
  app.set("port", port);
  //Start server
  const server = http.createServer(app);
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        throw new Error(bind + " requires elevated privileges");
      case "EADDRINUSE":
        throw new Error(bind + " is already in use");
      default:
        throw error;
    }
  }
  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    log("port");
  }
  //Listening
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
  const socket = require("socket.io");
  module.exports.sio = socket(server);

  //Error catching
  process.on("uncaughtException", err => {
    cb(err);
  });

  process.on("unhandledRejection", err => {
    cb(err);
  });

  process.on("finished", function() {
    cb(false);
  });
};
