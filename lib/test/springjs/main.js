"use strict";

var SpringJS = require("js-spring");

var _ref = new SpringJS({
  name: "springjs-template",
  port: 8080,
  log: true,
  mongo: "",
  viewsDir: "/Users/daniel/Desktop/Code/Spring/src/test/springjs/views",
  publicDir: "/Users/daniel/Desktop/Code/Spring/src/test/springjs/public"
}),
    app = _ref.app;