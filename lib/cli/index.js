#!/usr/bin/env node
"use strict";

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("file-system");
var chalk = require("chalk");

var _require = require("./utils/index"),
    log = _require.log,
    err = _require.err;

var _process$argv = (0, _toArray3.default)(process.argv),
    args = _process$argv.slice(2);

var fileEvent = __dirname + "/events/" + args[0] + ".js";

process.title = "spring.js-cli";
fs.readFile(fileEvent, function (err, file) {
  if (!err) {
    require(fileEvent).run(args, chalk);
  } else {
    log(chalk.bold(args.join(" ")) + " is not a valid command, please consult the docs at https://spring.js.org/docs/error#Not-Valid", "red");
  }
});