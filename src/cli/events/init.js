const { log, error } = require("../utils/index");
const prompts = require("prompts");
const chalk = require("chalk");
const fs = require("file-system");
const path = require("path");

var custom = {
  location: "springjs",
  name: "springjs-template",
  port: 8080,
  logging: true,
  mongo: "",
  views: "views",
  public: "public"
};
exports.run = function(args) {
  console.log(
    chalk.hex("#29B120")(`                          %8              
                          8S              
                        888%              
                       :888X              
      t8X;             @88:%              
      8t8888 8;       :88S8@              
      :8888888@8;     @88;8t              
        888@88tX88    88S88               
        X88%X88t88@   @8@8:               
        ;8888X8S%88; S888;                
         % 88%88X88SX8X8;    XS%SX ;8%    
           :X8888X;8 @S   tSX8888888888XX%
            :  @;S@%88S  %88X@88888888888@
                    88t t888888888S 88    
     ;X8@@8X:      ::8X  8t888 8S  :      
  SS888888888 X     :@t%88888%;:          
  t88S88X8@888XX8   %88 88:%;             
     S;8S888@8888 ; ;88S8:                
          88888888; tXX :                 
          ;t88888@8%t8t                   
             8S88@88;Xt                   
               t888;%8t                   
                 88888X                   
                     8%                  `)
  );
  log(
    chalk.bgHex("#29B120")(" Init started ") +
      "\n\nAnswer the questions below to generate a template of spring.js :)\n",
    "white"
  );

  if (!process.env.TEST) {
    const ask = prompts(
      [
        {
          type: "text",
          initial: custom.name,
          name: "name",
          message: "Name:"
        },
        {
          type: "text",
          initial: custom.location,
          name: "location",
          message: "Directory:"
        },
        {
          type: "number",
          initial: custom.port,
          name: "port",
          message: "Port:",
          validate: value =>
            parseInt(value) <= 0 || parseInt(value) > 65536
              ? "Port must be greater than 0 and less than 65536"
              : true
        },
        {
          type: "select",
          name: "logging",
          message: "Logging:",
          choices: [
            { title: "Yes", value: true },
            { title: "No", value: false }
          ]
        },
        {
          type: "text",
          name: "mongo",
          initial: "",
          message: "Mongo URL:"
        },
        {
          type: "text",
          name: "views",
          initial: custom.views,
          message: "Views directory:"
        },
        {
          type: "text",
          name: "public",
          initial: custom.public,
          message: "Public directory:"
        }
      ],
      {
        onCancel() {
          error({ message: "Spring.js init canceled :(" });
          process.exit(0);
        }
      }
    ).then(function(res) {
      prompts({
        type: "select",
        name: "continue",
        message: "Are you sure you would like to continue?",
        choices: [{ title: "Yes", value: true }, { title: "No", value: false }]
      }).then(function(next) {
        if (next.continue === 1) {
          return error({ message: "Spring.js init canceled :(" });
        }
        const location = path.resolve(process.cwd(), res.location);
        fs.stat(location, function(err, stats) {
          if (!err || stats) {
            return error({
              message:
                "For safety reasons we do not overwrite existing directories, either delete " +
                res.location +
                " or choose a new directory name"
            });
          }
          fs.mkdir(location, function(err) {
            if (err) return error(err);
            fs.mkdir(path.resolve(location, res.views), function(err) {
              if (err) return error(err);
              fs.mkdir(path.resolve(location, res.public), function(err) {
                if (err) return error(err);
                fs.writeFile(
                  path.resolve(location, "main.js"),
                  `
                  const SpringJS = require("js-spring");
                  const { app } = new SpringJS({
                    name: "${res.name}",
                    port: ${res.port},
                    log: ${res.logging},
                    mongo: "${res.mongo}",
                    viewsDir: "${path.resolve(location, res.views)}",
                    publicDir: "${path.resolve(location, res.public)}"
                  });
                  `,
                  function(err) {
                    if (err) {
                      return error(err);
                    }
                    fs.writeFile(
                      path.resolve(location, "package.json"),
                      `{ 
                      "name": "${res.name}", 
                      "version": "1.0.0",
                      "main": "./main.js",
                      "scripts": {
                        "start": "node ./main.js"
                      },
                      "author": "DanCodes <dan@dancodes.online>",
                      "repository": "git://github.com/dan-online/spring.js.git",
                      "bugs": {
                        "url": "https://github.com/dan-online/spring.js/issues"
                      },
                      "license": "MIT"
                    }`,
                      function(err) {
                        if (err) return error(err);
                        require("child_process").exec(
                          "cd " +
                            location +
                            "; npm install --save -g js-spring",
                          function() {
                            log("Init was finished!");
                          }
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  } else {
    const res = custom;
    const location = path.resolve(process.cwd(), "src/test", res.location);
    fs.stat(location, function(err, stats) {
      if (!err || stats) {
        return error({
          message:
            "For safety reasons we do not overwrite existing directories, either delete " +
            res.location +
            " or choose a new directory name"
        });
      }
      fs.mkdir(location, function(err) {
        if (err) return error(err);
        fs.mkdir(path.resolve(location, res.views), function(err) {
          if (err) return error(err);
          fs.mkdir(path.resolve(location, res.public), function(err) {
            if (err) return error(err);
            fs.writeFile(
              path.resolve(location, "main.js"),
              `
                const SpringJS = require("js-spring");
                const { app } = new SpringJS({
                  name: "${res.name}",
                  port: ${res.port},
                  log: ${res.logging},
                  mongo: "${res.mongo}",
                  viewsDir: "${path.resolve(location, res.views)}",
                  publicDir: "${path.resolve(location, res.public)}"
                });
              `,
              function(err) {
                if (err) return error(err);
                fs.writeFile(
                  path.resolve(location, "package.json"),
                  `{ 
                      "name": "${res.name}", 
                      "version": "1.0.0",
                      "main": "./main.js",
                      "scripts": {
                        "start": "node ./main.js"
                      },
                      "author": "DanCodes <dan@dancodes.online>",
                      "repository": "git://github.com/dan-online/spring.js.git",
                      "bugs": {
                        "url": "https://github.com/dan-online/spring.js/issues"
                      },
                      "license": "MIT"
                    }`,
                  function(err) {
                    if (err) return error(err);
                    log("Init was finished!");
                  }
                );
              }
            );
          });
        });
      });
    });
  }
};
module.exports.info = {
  name: "init",
  alias: ["start", "run", "generate"]
};
