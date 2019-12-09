"use strict";

var done = false;
var logged = [{
  name: "Initialize",
  value: false
}, {
  name: "Port",
  value: false
}, {
  name: "Server",
  value: false
}, {
  name: "Routes",
  value: false
}, {
  name: "Database",
  value: false
}];

var config = require("../../index").options;

var test = false;
var date = void 0;

if (process.argv.find(function (x) {
  return x === "test";
})) {
  test = true;
  okOn = "OK";
}
if (process.stdout.clearLine) process.stdout.clearLine();
function log(change, err) {
  if (!date) {
    date = new Date();
  }
  if (err) {
    throw new Error(err);
  }
  if (logged.find(function (x) {
    return x.name.toLowerCase() === change;
  })) {
    logged.find(function (x) {
      return x.name.toLowerCase() === change;
    }).value = true;
  }

  if (logged.filter(function (x) {
    return x.value === false;
  }).length === 0 && !done) {
    done = true;
    if (config.internalLog || config.internalLog == undefined) process.stdout.write("\n" + config.name + " listening on port " + config.port + "\n");
    console.log("");
    if (process.env.TEST) {
      process.emit("finished");
    }
  }
}

if (test) {
  logged.push({
    name: "Syntax",
    value: false
  });
  require("child_process").exec('find .  -path ./node_modules -prune -o -path ./.history -prune -o -path ./data -prune -o -name "*.js" -exec node -c {} \\;', function (err, out) {
    if (err) {
      log("syntax", err);
    } else {
      log("syntax");
    }
  });
}

log("start");

module.exports = log;