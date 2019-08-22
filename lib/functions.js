"use strict";

var chalk = require("chalk");

var last = void 0;

function warn(text) {
  if (process.stdout.clearLine) process.stdout.clearLine();
  if (process.stdout.cursorTo) process.stdout.cursorTo(0);
  console.log(chalk.black.bold.bgYellow("WARN") + " " + chalk.yellow(text));
}

function log(text, save, important, ok) {
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

module.exports = {
  log: log,
  warn: warn
};