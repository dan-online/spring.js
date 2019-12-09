const axios = require("axios");
const opn = require("open");

const random = Math.random().toString();
const SpringJS = require("../index");

process.env.TEST = true;
let sjs = {};
let server = {};
let database = {};
let io = {};

describe("Spring.js", () => {
  it("Module: Construct server", done => {
    sjs = new SpringJS({
      name: "test",
      internalLog: true,
      exited: done,
      port: 8000,
      mongo: process.platform != "win32" ? "mongodb://localhost:27017/" : null,
      viewsDir: `${__dirname}/views`,
      publicDir: `${__dirname}/public`,
      routes: [
        {
          url: "/api",
          router: require("./routes/api")
        }
      ]
    });
    server = sjs.app;
    database = sjs.database;
    io = sjs.socket;
  });
  it("Module: Check for options", done => {
    done(server.options == {});
  });
  it("Express: Add get route", done => {
    server.get("/get", (req, res) => {
      res.send(random);
    });
    axios
      .get(`http://localhost:${sjs.options.port}/get`)
      .then(res => {
        if (res.data == random) {
          done(false);
        } else {
          done(new Error("Get route failed"));
        }
      })
      .catch(err => {
        done(err);
      });
  });
  it("Express: Test route", done => {
    axios
      .get(`http://localhost:${sjs.options.port}/api`)
      .then(res => {
        if (res.data == "It's working!") {
          done(false);
        } else {
          done(new Error("API route failed"));
        }
      })
      .catch(err => {
        done(err);
      });
  });
  it("Express: Add post route", done => {
    server.post("/post", (req, res) => {
      res.send(random);
    });
    axios
      .post(`http://localhost:${sjs.options.port}/post`)
      .then(res => {
        if (res.data == random) {
          done(false);
        } else {
          done(new Error("Post route failed"));
        }
      })
      .catch(err => {
        done(err);
      });
  });
  it("Express: Add middleware", done => {
    server.use((req, res, next) => {
      req.session.dif = random;
      next();
    });
    server.get("/middleware", (req, res) => {
      res.send(req.session.dif.toString());
    });
    axios
      .get(`http://localhost:${sjs.options.port}/middleware`)
      .then(res => {
        if (res.data && res.data == random) {
          done(false);
        } else {
          done(new Error("Middleware failed"));
        }
      })
      .catch(err => {
        done(err);
      });
  });
  it("Socket: Add route", done => {
    server.get("/socket", (req, res) => {
      res.sendFile(`${__dirname}/views/socket.html`);
    });
    done();
  });
  it("Socket: Connect", done => {
    io.on("connection", () => {
      done();
    });
    io.on("test", () => {
      done();
    });
    process.platform == "darwin"
      ? opn(`http://localhost:${sjs.options.port}/socket`)
      : done(); // For circleci and travis
  });
  if (process.platform == "darwin") {
    it("Database: Set/Get database key", done => {
      database.set("Test", random);
      const got = database.get("Test");

      if (got == random) {
        done();
      } else {
        done(new Error("Key is incorrect"));
      }
    });
    it("Database: Delete database key", done => {
      database.delete("Test");
      const got = database.get("Test");

      if (!got) {
        done();
      } else {
        done(new Error("Key is incorrect"));
      }
    });
  }
});
if (process.platform == "darwin") {
  describe("SpringJS-cli", function() {
    const run = require("child_process").exec;
    it("Link", function(done) {
      run("sudo npm link", function(err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Initialize", function(done) {
      run("spring-dev init", function(err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Run", function(done) {
      run("cd src/test/springjs; sudo npm i --save; npm start", function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Delete", function(done) {
      run("sudo rm -rf src/test/springjs", function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("Unlink", function(done) {
      run("sudo npm unlink", function(err, stdout) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
}
