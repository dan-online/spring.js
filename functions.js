const chalk = require("chalk");
const emojis = require('emojis-list');

let last;
let x = 0;
function warn(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(chalk.yellow.bold(`[${emojis[2428]} ]`) + " " + chalk.yellow.bold(text));
}

function log(text, save, important, ok) {
  if (text != last || ok) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${chalk.green.bold(`[${emojis[2427]} ]`)} ${chalk.yellow.bold(text)}\n`);
    return;
  }
  if (!text) {
    return last;
  } else {
    if (!save) {
      return (last = text);
    }
  }
  if (!last) {
    return;
  }
  if (important) {
    process.stdout.write("\n\n" + text + "\n\n");
  }
}

module.exports = { log, warn };
