const chalk = require("chalk");

function log(msg) {
  console.log(chalk.green("spring.js log: " + msg));
}
function error(error) {
  console.error(chalk.red(`spring.js err: ${error.message}`));
}
module.exports = {
  log,
  error
};
