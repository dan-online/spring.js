const chalk = require("chalk");
const path = require("path");

const homeConfig = require(path.resolve(__dirname, "../package.json"));
process.title = "spring.js";
/**
 * @description
 * Constructor to start the SpringJS
 *
 * @example
 * ```js
 *   const SpringJS = require("js-spring");
 *   new SpringJS({ name: "example" });
 * ```
 */

class SpringJS {
  constructor(options) {
    const { log, warn } = require("./functions")(options);
    if (exports.started) {
      throw new Error("Spring already initialized!");
    } else {
      exports.started = true;
    }
    if (typeof options !== "object") {
      throw new TypeError("Expected object for constructor");
    }
    if (!options.name || typeof options.name !== "string") {
      throw new TypeError("Name is required and needs to be a string");
    }
    if (!options.port || isNaN(parseInt(options.port))) {
      warn("No valid port provided, using 8080");
      options.port = 8080;
    }
    if (
      !options.mongo ||
      !options.mongo.startsWith("mongodb") ||
      typeof options.mongo !== "string"
    ) {
      warn(
        "No valid mongo database url provided, database will not initialize"
      );
      options.mongo = null;
    } else {
      options.mongo = options.mongo.endsWith("/")
        ? options.mongo + options.name
        : `${options.mongo}/${options.name}`;
    }
    if (options.routes && typeof options.routes !== "object") {
      this.routes = null;
      throw new TypeError("Value of router option must be an array");
    }
    if (options.expressLog && typeof options.expressLog !== "boolean") {
      throw new TypeError("Value of express-log option needs to be a boolean");
    }
    if (options.internalLog && typeof options.internalLog !== "boolean") {
      throw new TypeError("Value of internal-log option needs to be a boolean");
    }
    log(
      chalk.bold.bgGreen.black(
        ` ${homeConfig.name}-${homeConfig.version} starting`
      )
    );
    if (!options.viewsDir || typeof options.viewsDir !== "string") {
      options.viewsDir = path.resolve(process.cwd().toString(), "views");
      warn(`No valid view directory provided, using ${options.viewsDir}`);
    } else {
      options.viewsDir = path.resolve(
        process.cwd().toString(),
        options.viewsDir
      );
    }
    if (!options.publicDir || typeof options.publicDir !== "string") {
      options.publicDir = path.resolve(process.cwd(), "public");
      warn(`No valid public directory provided, using ${options.publicDir}`);
    } else {
      options.publicDir = path.resolve(
        process.cwd().toString(),
        options.publicDir
      );
    }
    this.options = options;
    this.base = process.cwd();
    module.exports = this;
    require("./bin/www").start(err => {
      if (process.env.TEST || typeof options.exited === "function") {
        if (err) {
          console.error(err);
          throw err;
        }
        if (options.exited) {
          options.exited();
        } else {
          process.exit(0);
        }
      } else {
        console.error(err);
      }
    }, options);
    this.database = require("./main/server").db;
    this.app = require("./main/server").app;
    this.express = require("express");
    this.router = this.express.Router();
    this.socket = require("./bin/www").sio;
    module.exports = this;
  }
}
module.exports = SpringJS;
