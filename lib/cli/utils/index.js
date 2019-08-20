"use strict";

var chalk = require("chalk");

function log(msg) {
  console.log("spring: " + msg);
}
function err(error) {
  console.error("spring: Error: " + error.message);
  throw err;
}
module.exports = {
  log: log,
  err: err
};