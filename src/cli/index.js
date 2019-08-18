#!/usr/bin/env node
const fs = require("file-system");
const chalk = require("chalk");
const [, , ...args] = process.argv;
const fileEvent = `${args[0]}.js`;

function log(msg, color) {
  console.log("spring: " + chalk[color](msg));
}
function err(error) {
  console.error(`spring: Error: ${error.message}`);
  throw err;
}

process.title = "spring.js-cli";

fs.readFile(`./events/${fileEvent}`, function(file) {
  try {
    require(fileEvent).run(args, chalk);
  } catch (err) {
    log(
      chalk.bold(args.join(" ")) +
        " is not a valid command, please consult the docs at https://spring.js.org/docs/error#Not-Valid",
      "red"
    );
  }
});
