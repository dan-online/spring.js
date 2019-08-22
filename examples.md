# Examples

## Advanced example

```javascript
const SpringJS = require("js-spring");
const { app, database } = new SpringJS({
  name: "advanced",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./views",
  publicDir: "./public"
});

app.get("/", function(req, res) {
  database.set("Startup", new Date());
  res.send("You visited at " + database.get("Startup"));
});
```

## EJS

```javascript
const SpringJS = require("js-spring");
const { app, database } = new SpringJS({
  name: "advanced",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./views",
  publicDir: "./public"
});

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", { time: new Date() });
});
```

## Session

```javascript
const SpringJS = require("js-spring");
const { app, database } = new SpringJS({
  name: "advanced",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./views",
  publicDir: "./public"
});

app.set("view engine", "ejs");
app.use(function(req, res, next) {
  req.session.username = "Tester";
  next();
});

app.get("/", function(req, res) {
  res.render("index", { name: req.session.username });
});
```
