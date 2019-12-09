"use strict";

var chalk = require("chalk");

var last = void 0;

module.exports = function (options) {
  function warn(text) {
    if (options.internalLog || options.internalLog == undefined) {
      if (process.stdout.clearLine) process.stdout.clearLine();
      if (process.stdout.cursorTo) process.stdout.cursorTo(0);
      console.log(chalk.black.bold.bgYellow("WARN") + " " + chalk.yellow(text));
    }
  }

  function log(text, save, important, ok) {
    if (options.internalLog || options.internalLog == undefined) {
      if (text != last || ok) {
        if (process.stdout.clearLine) process.stdout.clearLine();
        if (process.stdout.cursorTo) process.stdout.cursorTo(0);
        process.stdout.write(chalk.black.bgGreen.bold(" OK ") + " " + text + "\n");

        return;
      }
      if (!text) {
        return last;
      }
      if (!save) {
        return last = text;
      }

      if (!last) {
        return;
      }
      if (important) {
        process.stdout.write("\n\n" + text + "\n\n");
      }
    }
  }

  return {
    log: log,
    warn: warn
  };
};