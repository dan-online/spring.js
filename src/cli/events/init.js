const { log, error } = require("../utils/index");
const prompts = require("prompts");
const chalk = require("chalk");
var custom = {
  location: "./springjs",
  name: "spring.js-template",
  port: 8080,
  logging: true,
  mongo: "mongodb://localhost:27017/",
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

  const ask = prompts(
    [
      {
        type: "text",
        initial: custom.name,
        name: "name",
        message: `Name:`
      },
      {
        type: "text",
        initial: custom.location,
        name: "location",
        message: `Directory:`
      },
      {
        type: "number",
        initial: custom.port,
        name: "port",
        message: `Port:`,
        validate: value =>
          parseInt(value) <= 0 || parseInt(value) > 65536
            ? `Port must be greater than 0 and less than 65536`
            : true
      },
      {
        type: "select",
        name: "logging",
        message: `Logging:`,
        choices: [{ title: "Yes", value: true }, { title: "No", value: false }]
      },
      {
        type: "text",
        name: "mongo",
        initial: custom.mongo,
        message: `Mongo URL:`,
        validate: value =>
          !value.startsWith("mongodb://") ? `Must be valid mongodb url` : true
      },
      {
        type: "text",
        name: "views",
        initial: custom.views,
        message: `Views directory:`
      },
      {
        type: "text",
        name: "public",
        initial: custom.public,
        message: `Public directory:`
      }
    ],
    {
      onCancel: function() {
        error({ message: "Spring.js init canceled :(" });
        process.exit(0);
      }
    }
  ).then(function(res) {
    prompts({
      type: "select",
      name: "continue",
      message: `Are you sure you would like to continue?`,
      choices: [{ title: "Yes", value: true }, { title: "No", value: false }]
    }).then(function(next) {
      if (next.continue == 1)
        return error({ message: "Spring.js init canceled :(" });
    });
  });
};
module.exports.info = {
  name: "init",
  alias: ["start", "run", "generate"]
};
