const SpringJS = require("./index");
const { app } = new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views",
  publicDir: "./test/public"
});

app.get("/test", function(req, res) {
  res.send("SpringJS is the best");
});
