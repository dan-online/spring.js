const SpringJS = require("./index");
const { app } = new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views",
  viewEngine: "ejs",
  publicDir: "./test/public",
  routes: [
    {
      route: "/hi",
      file: "../route.js"
    }
  ]
});

app.get("/test", function(req, res) {
  res.send("SpringJS is the best");
});
