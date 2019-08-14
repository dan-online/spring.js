const editJsonFile = require("edit-json-file");
const inquirer = require("inquirer");

var questions = [
{
    type: "input",
    name: "name",
    message: "Name: ",
},
{
    type: "input",
    name: "version",
    message: "Version: ",
},
{
    type: "input",
    name: "description",
    message: "Description: ",
},
{
    type: "input",
    name: "username",
    message: "Username: ",
},
{
    type: "input",
    name: "email",
    message: "Email: ",
},
{
    type: "input",
    name: "repo",
    message: "Git Repo (Optional): ",
},
{
    type: "list",
    name: "log",
    message: "Console Startup Log:",
    choices: ["Clean", "Tech"],
},
{
    type: "list",
    name: "update",
    message: "Automatic Update:",
    choices: ["Yes", "No"],
},
];
  console.log("\nThese answers will be written to package.json for publishing! Enjoy -DanCodes\n");
  inquirer.prompt(questions).then((answers) => {
    var file = editJsonFile(`${__dirname.split("/src")[0]}/package.json`);
    file.set("name", answers["name"].toLowerCase());
    file.set("version", answers["version"]);
    file.set("description", answers["description"]);
    file.set("author", `${answers["username"]} <${answers["email"]}>`);
    if(answers["repo"]) {
        file.set("repository", answers["repo"]);
    }
    file.set("update", answers["update"].toLowerCase());
    file.set("log", answers["log"].toLowerCase());
    file.save();
  });
