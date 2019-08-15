const SpringJS = require("../index");
const axios = require("axios");
const random = Math.random().toString();
process.env.TEST = true;
var server = {};
var database = {};
describe("SpringJS", function() {
  it("Module: Construct server", function(done) {
    const sjs = new SpringJS({
      name: "test",
      exited: done,
      log: false,
      port: 8080,
      mongo: "mongodb://localhost:27017/",
      viewsDir: "./views",
      publicDir: "./public"
    });
    server = sjs.app;
    database = sjs.database;
  });
  it("Module: Check for options", function(done) {
    done(server.options == {});
  });
  it("Express: Add get route", function(done) {
    server.get("/get", function(req, res) {
      res.send(random);
    });
    axios
      .get("http://localhost:8080/get")
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
      .post("http://localhost:8080/post")
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
      .get("http://localhost:8080/middleware")
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
