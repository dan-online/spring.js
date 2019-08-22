---
description: >-
  We use express to start a web server and to control it. We also use body
  parsing, cookie parsing and helmet to keep the server secure and functional so
  you don't have to.
---

# Express

You can access the express server through the module \(1\) or on startup in the constructor \(2\)

```javascript
// 1
const app = require("js-spring").app;

// 2
const SpringJS = require("js-spring");
const { app } new SpringJS({ name: "test" });
```

{% hint style="info" %}
We recommend for multiple files by starting up in a main file and accessing the express app using the first method
{% endhint %}

## Example usage

```javascript
const SpringJS = require("js-spring");
const { app } new SpringJS({ name: "test" });

app.use(function(req, res, next) {
    req.session.name = "DanCodes";
    console.log("Middleware rocks! just like Spring.js");
    next();
});

app.get("/", function(req, res) {
    res.status(200).send("I'm awake!");
});

app.post("/body", function(req, res) {
    res.status(200).send(req.body);
});

app.get("/session", function(req, res) {
    res.status(200).send(req.session.name)
});
```
