"use strict";

var _require = require("../utils/index"),
    log = _require.log,
    err = _require.err;

var prompts = require("prompts");
var chalk = require("chalk");
exports.run = function (args) {
  console.log(chalk.hex("#29B120")("                          %8              \n                          8S              \n                        888%              \n                       :888X              \n      t8X;             @88:%              \n      8t8888 8;       :88S8@              \n      :8888888@8;     @88;8t              \n        888@88tX88    88S88               \n        X88%X88t88@   @8@8:               \n        ;8888X8S%88; S888;                \n         % 88%88X88SX8X8;    XS%SX ;8%    \n           :X8888X;8 @S   tSX8888888888XX%\n            :  @;S@%88S  %88X@88888888888@\n                    88t t888888888S 88    \n     ;X8@@8X:      ::8X  8t888 8S  :      \n  SS888888888 X     :@t%88888%;:          \n  t88S88X8@888XX8   %88 88:%;             \n     S;8S888@8888 ; ;88S8:                \n          88888888; tXX :                 \n          ;t88888@8%t8t                   \n             8S88@88;Xt                   \n               t888;%8t                   \n                 88888X                   \n                     8%                  "));
  console.log("\n  spring help\n\n    usage: spring <command>\n\n    description: Spring.js is a simple way to start a nodejs server, use this cli to initialize a project!\n\n    These are common Spring commands used in various situations:\n    \n        help       View the help screen + commands\n        init       Create a spring.js project ready to run and tailored to you\n");
};
module.exports.info = {
  name: "help",
  alias: ["helpp", "error"]
};