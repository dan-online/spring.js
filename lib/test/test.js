"use strict";

var axios = require("axios");
var opn = require("open");

var random = Math.random().toString();
var SpringJS = require("../index");

process.env.TEST = true;
var sjs = {};
var server = {};
var database = {};
var io = {};

describe("Spring.js", function () {
  it("Module: Construct server", function (done) {
    sjs = new SpringJS({
      name: "test",
      internalLog: false,
      exited: done,
      port: 8000,
      mongo: process.platform != "win32" ? "mongodb://localhost:27017/" : null,
      viewsDir: __dirname + "/views",
      publicDir: __dirname + "/public",
      routes: [{
        url: "/api",
        router: require("./routes/api")
      }]
    });
    server = sjs.app;
    database = sjs.database;
    io = sjs.socket;
  });
  it("Module: Check for options", function (done) {
    done(server.options == {});
  });
  it("Express: Add get route", function (done) {
    server.get("/get", function (req, res) {
      res.send(random);
    });
    axios.get("http://localhost:" + sjs.options.port + "/get").then(function (res) {
      if (res.data == random) {
        done(false);
      } else {
        done(new Error("Get route failed"));
      }
    }).catch(function (err) {
      done(err);
    });
  });
  it("Express: Test route", function (done) {
    axios.get("http://localhost:" + sjs.options.port + "/api").then(function (res) {
      if (res.data == "It's working!") {
        done(false);
      } else {
        done(new Error("API route failed"));
      }
    }).catch(function (err) {
      done(err);
    });
  });
  it("Express: Add post route", function (done) {
    server.post("/post", function (req, res) {
      res.send(random);
    });
    axios.post("http://localhost:" + sjs.options.port + "/post").then(function (res) {
      if (res.data == random) {
        done(false);
      } else {
        done(new Error("Post route failed"));
      }
    }).catch(function (err) {
      done(err);
    });
  });
  it("Express: Add middleware", function (done) {
    server.use(function (req, res, next) {
      req.session.dif = random;
      next();
    });
    server.get("/middleware", function (req, res) {
      res.send(req.session.dif.toString());
    });
    axios.get("http://localhost:" + sjs.options.port + "/middleware").then(function (res) {
      if (res.data && res.data == random) {
        done(false);
      } else {
        done(new Error("Middleware failed"));
      }
    }).catch(function (err) {
      done(err);
    });
  });
  it("Socket: Add route", function (done) {
    server.get("/socket", function (req, res) {
      res.sendFile(__dirname + "/views/socket.html");
    });
    done();
  });
  it("Socket: Connect", function (done) {
    io.on("connection", function () {
      done();
    });
    io.on("test", function () {
      done();
    });
    process.platform == "darwin" ? opn("http://localhost:" + sjs.options.port + "/socket") : done(); // For circleci and travis
  });
  if (process.platform == "darwin") {
    it("Database: Set/Get database key", function (done) {
      database.set("Test", random);
      var got = database.get("Test");

      if (got == random) {
        done();
      } else {
        done(new Error("Key is incorrect"));
      }
    });
    it("Database: Delete database key", function (done) {
      database.delete("Test");
      var got = database.get("Test");

      if (!got) {
        done();
      } else {
        done(new Error("Key is incorrect"));
      }
    });
  }
});
if (process.platform == "darwin") {
  describe("SpringJS-cli", function () {
    var run = require("child_process").exec;
    it("Link", function (done) {
      run("sudo npm link", function (err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Initialize", function (done) {
      run("spring-dev init", function (err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Run", function (done) {
      run("cd src/test/springjs; sudo npm i --save; npm start", function (err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Delete", function (done) {
      run("sudo rm -rf src/test/springjs", function (err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Unlink", function (done) {
      run("sudo npm unlink", function (err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
}