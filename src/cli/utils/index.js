const chalk = require("chalk");

function log(msg) {
  console.log("spring log: " + msg);
}
function error(error) {
  console.error(`spring err: ${chalk.red(error.message)}`);
}
module.exports = {
  log,
  error
};
