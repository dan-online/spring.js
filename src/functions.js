module.exports = function (chalk) {
    var last;
    function warn(text) {
        console.clear();
        console.log(chalk.black.bold.bgYellow("WARN") + " " + chalk.yellow(text));
    }
    function log(text, save, important, ok) {
        if (text != last || ok) {
            console.clear();
            process.stdout.write(chalk.black.bgGreen.bold(" OK ") + " " + text + "\n");
            return;
        }
        if (!text) {
            return last;
        }
        if (!save) {
            return (last = text);
        }
        if (!last) {
            return;
        }
        if (important) {
            process.stdout.write("\n\n" + text + "\n\n");
        }
    }
    return { log: log, warn: warn };
};
