#!/usr/bin/env node
"use strict";

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("file-system");
var chalk = require("chalk");
var Enmap = require("enmap");

var _require = require("./utils/index"),
    log = _require.log,
    error = _require.error;

var _process$argv = (0, _toArray3.default)(process.argv),
    args = _process$argv.slice(2);

var commands = new Enmap();
var options = args.filter(function (a) {
  return a.startsWith("-");
});
var command = args.filter(function (a) {
  return !a.startsWith("-");
});

if (command.length < 1) {
  command = ["help"];
}

process.title = "spring.js-cli";

fs.readdir(__dirname + "/events", function (err, files) {
  files.forEach(function (f) {
    var name = f.split(".")[0];
    var file = "./events/" + f;
    var props = require(file);
    commands.set(name, props);
  });
  var file = commands.find(function (c) {
    return c.info.name == command.join(" ").toLowerCase() || c.info.alias.find(function (a) {
      return a == command.join(" ").toLowerCase();
    });
  });
  if (!file) {
    error({
      message: "Command *" + chalk.bold(command.join(" ")) + "* not found"
    });
    log("Run " + chalk.green("spring help") + " to view a list of commands.");
  } else {
    file.run(options);
  }
});