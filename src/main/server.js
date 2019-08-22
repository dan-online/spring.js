module.exports = function(options) {
  const express = require("express");
  const session = require("express-session");
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const logger = require("morgan");
  const helmet = require("helmet");
  const log = require("./tests/logger");
  const MongoStore = require("connect-mongo")(session);
  const database = require("./utils/handlers/database").start(options);

  const app = express();

  require("express").app = app;
  log("server");
  // View engine setup
  app.set("views", options.viewsDir);

  const cooky = {
    secret: "work hard",
    resave: true,
    expires: new Date() * 60 * 60 * 24 * 7,
    saveUninitialized: true,
    store: options.mongo ? new MongoStore({ url: options.mongo }) : null
  };

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(session(cooky));
  options.log ? app.use(logger("tiny")) : false;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(options.publicDir));
  // App.use(require("../index").app);

  log("routes");
  module.exports.app = app;
  module.exports.db = require("./utils/handlers/database");
  // Catch 404 and forward to error handler
  return app;
};
