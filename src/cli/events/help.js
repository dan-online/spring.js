const { log, err } = require("../utils/index");
const prompts = require("prompts");
const chalk = require("chalk");
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
  console.log(`
  spring help

    usage: spring <command>

    description: Spring.js is a simple way to start a nodejs server, use this cli to initialize a project!

    These are common Spring commands used in various situations:
    
        help       View the help screen + commands
        init       Create a spring.js project ready to run and tailored to you
`);
};
module.exports.info = {
  name: "help",
  alias: ["helpp", "error"]
};
