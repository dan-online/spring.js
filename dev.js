const Q_Server = require("./index");
const { app } = new Q_Server({
  name: "test",
  viewEngine: "ejs",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./src/views",
  publicDir: "./src/public"
});

app.get("/test", function(req, res) {
  res.send("Q-Server is the best");
});
