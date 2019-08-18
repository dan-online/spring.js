const chalk = require("chalk");

function log(msg, color) {
  console.log("spring: " + chalk[color](msg));
}
function err(error) {
  console.error(`spring: Error: ${error.message}`);
  throw err;
}
module.exports = {
  log,
  err
};
