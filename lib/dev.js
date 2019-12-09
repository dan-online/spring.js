"use strict";

var SpringJS = require("./index");

var _ref = new SpringJS({
  name: "test",
  port: 8080,
  expressLog: true,
  internalLog: false,
  mongo: "mongodb://localhost:27017/",
  viewsDir: __dirname + "/views",
  publicDir: __dirname + "/public",
  forceNulldb: true,
  routes: [{
    url: "/api",
    router: require("./test/routes/api")
  }]
}),
    app = _ref.app;

app.get("/test", function (req, res) {
  res.send("SpringJS is the best");
});