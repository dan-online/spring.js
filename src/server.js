module.exports = function(options) {
  const createError = require("http-errors");
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

  log("server");
  // view engine setup
  app.set("views", options.viewsDir);

  const cooky = {
    secret: "work hard",
    resave: true,
    expires: new Date() * 60 * 60 * 24 * 7,
    saveUninitialized: true,
    store: new MongoStore({ url: options.mongo })
  };

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(session(cooky));
  options.log ? app.use(logger("tiny")) : false;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(options.publicDir));
  app.use(require("../index").app);
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
  });

  log("routes");
  module.exports.app = app;
  module.exports.db = require("./utils/handlers/database");
  return app;
};