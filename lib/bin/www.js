#!/usr/bin/env node
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.start = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cb, options) {
    var app, http, log, normalizePort, port, server, onError, onListening, socket;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onListening = function onListening() {
              var addr = server.address();
              var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
              log("port");
            };

            onError = function onError(error) {
              if (error.syscall !== "listen") {
                throw error;
              }

              var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

              // handle specific listen errors with friendly messages
              switch (error.code) {
                case "EACCES":
                  throw new Error(bind + " requires elevated privileges");
                case "EADDRINUSE":
                  throw new Error(bind + " is already in use");
                default:
                  throw error;
              }
            };

            normalizePort = function normalizePort(val) {
              var port = parseInt(val, 10);
              if (isNaN(port)) {
                return val;
              }
              if (port >= 0) {
                return port;
              }
              return false;
            };

            app = require("../main/server")(options);
            http = require("http");
            // Msg

            log = require("../main/tests/logger");

            if (process.argv.find(function (x) {
              return x == "test";
            })) {
              log("test");
            }
            log("initialize");
            // Port init
            port = normalizePort(options.port);

            app.set("port", port);
            //Start server
            server = http.createServer(app);

            //Listening
            server.listen(port);
            server.on("error", onError);
            server.on("listening", onListening);
            socket = require("socket.io");

            module.exports.sio = socket(server);

            //Error catching
            process.on("uncaughtException", function (err) {
              cb(err);
            });

            process.on("unhandledRejection", function (err) {
              cb(err);
            });

            process.on("finished", function () {
              cb(false);
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();