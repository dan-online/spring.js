#!/usr/bin/env node
const fs = require("file-system");
const chalk = require("chalk");
const Enmap = require("enmap");
const { log, error } = require("./utils/index");
const [, , ...args] = process.argv;
const commands = new Enmap();
var options = args.filter(a => a.startsWith("-"));
var command = args.filter(a => !a.startsWith("-"));

if (command.length < 1) {
  command = ["help"];
}

process.title = "spring.js-cli";

fs.readdir(__dirname + "/events", function(err, files) {
  files.forEach(f => {
    const name = f.split(".")[0];
    const file = `./events/${f}`;
    const props = require(file);
    commands.set(name, props);
  });
  const file = commands.find(
    c =>
      c.info.name == command.join(" ").toLowerCase() ||
      c.info.alias.find(a => a == command.join(" ").toLowerCase())
  );
  if (!file) {
    error({
      message: "Command *" + chalk.bold(command.join(" ")) + "* not found"
    });
    log("Run " + chalk.green("spring help") + " to view a list of commands.");
  } else {
    file.run(options);
  }
});
