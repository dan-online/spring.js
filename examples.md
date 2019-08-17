# Examples

## Advanced example

```javascript
const SpringJS = require("./index");
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
const SpringJS = require("./index");
const { app, database } = new SpringJS({
  name: "advanced",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./views",
  publicDir: "./public"
});

app.set("views engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", { time: new Date()});
});

```



