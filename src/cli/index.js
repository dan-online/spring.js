#!/usr/bin/env node
const fs = require("file-system");
const chalk = require("chalk");
const { log, err } = require("./utils/index");
const [, , ...args] = process.argv;
const fileEvent = `${__dirname}/events/${args[0]}.js`;

process.title = "spring.js-cli";
fs.readFile(fileEvent, function(err, file) {
  if (!err) {
    require(fileEvent).run(args, chalk);
  } else {
    log(
      chalk.bold(args.join(" ")) +
        " is not a valid command, please consult the docs at https://spring.js.org/docs/error#Not-Valid",
      "red"
    );
  }
});
