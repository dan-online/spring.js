"use strict";

module.exports = function (options) {
  var express = require("express");
  var session = require("express-session");
  var bodyParser = require("body-parser");
  var cookieParser = require("cookie-parser");
  var logger = require("morgan");
  var helmet = require("helmet");
  var log = require("./tests/logger");
  var MongoStore = require("connect-mongo")(session);
  var database = require("./utils/handlers/database").start(options);

  var app = express();

  require("express").app = app;
  log("server");
  // View engine setup
  app.set("views", options.viewsDir);

  var cooky = {
    secret: "work hard",
    resave: true,
    expires: new Date() * 60 * 60 * 24 * 7,
    saveUninitialized: true,
    store: options.mongo ? new MongoStore({ url: options.mongo }) : null
  };
  app.session = session(cooky);
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(app.session);
  options.expressLog ? app.use(logger("tiny")) : false;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(options.publicDir));
  function validRoute(router) {
    if (router.get && router.post) {
      return true;
    }
    return false;
  }
  if (options.routes) {
    for (var i = 0; i < options.routes.length; i++) {
      if (validRoute(options.routes[i]["router"])) app.use(options.routes[i].url, options.routes[i].router);else throw new TypeError(options.routes[i].url + " router is not a valid Router.");
    }
  }
  log("routes");
  module.exports.app = app;
  module.exports.db = require("./utils/handlers/database");
  // Catch 404 and forward to error handler
  return app;
};