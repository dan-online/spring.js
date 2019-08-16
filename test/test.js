const SpringJS = require("../index");
const axios = require("axios");
const opn = require("opn");
const random = Math.random().toString();
process.env.TEST = true;
var sjs = {};
var server = {};
var database = {};
var io = {};
var connection;
describe("SpringJS", function() {
  it("Module: Construct server", function(done) {
    sjs = new SpringJS({
      name: "test",
      exited: done,
      log: false,
      port: 8080,
      mongo: "mongodb://localhost:27017/",
      viewsDir: "test/views",
      publicDir: "test/public"
    });
    server = sjs.app;
    database = sjs.database;
    io = sjs.socket;
  });
  it("Module: Check for options", function(done) {
    done(server.options == {});
  });
  it("Express: Add get route", function(done) {
    server.get("/get", function(req, res) {
      res.send(random);
    });
    axios
      .get("http://localhost:" + sjs.options.port + "/get")
      .then(function(res) {
        if (res.data == random) {
          done(false);
        } else {
          done(new Error("Get route failed"));
        }
      })
      .catch(function(err) {
        done(err);
      });
  });
  it("Express: Add post route", function(done) {
    server.post("/post", function(req, res) {
      res.send(random);
    });
    axios
      .post("http://localhost:" + sjs.options.port + "/post")
      .then(function(res) {
        if (res.data == random) {
          done(false);
        } else {
          done(new Error("Post route failed"));
        }
      })
      .catch(function(err) {
        done(err);
      });
  });
  it("Express: Add middleware", function(done) {
    server.use(function(req, res, next) {
      req.session.dif = random;
      next();
    });
    server.get("/middleware", function(req, res) {
      res.send(req.session.dif.toString());
    });
    axios
      .get("http://localhost:" + sjs.options.port + "/middleware")
      .then(function(res) {
        if (res.data && res.data == random) {
          done(false);
        } else {
          done(new Error("Middleware failed"));
        }
      })
      .catch(function(err) {
        done(err);
      });
  });
  it("Socket: Add route", function(done) {
    server.get("/socket", function(req, res) {
      res.sendFile(__dirname + "/views/socket.html");
    });
    done();
  });
  it("Socket: Connect", function(done) {
    io.on("connection", function(user) {
      done();
    });
    console.log(process.platform);
    process.platform != "linux"
      ? opn("http://localhost:" + sjs.options.port + "/socket")
      : done(); // For circleci
  });
  it("Database: Set/Get database key", function(done) {
    database.set("Test", random);
    const got = database.get("Test");
    if (got == random) {
      done();
    } else {
      done(new Error("Key is incorrect"));
    }
  });
  it("Database: Delete database key", function(done) {
    database.delete("Test");
    const got = database.get("Test");
    if (!got) {
      done();
    } else {
      done(new Error("Key is incorrect"));
    }
  });
});
