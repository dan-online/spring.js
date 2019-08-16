---
description: How to access the express server started by spring.js
---

# Express

You can access the express server through the module \(1\) or on startup in the constructor \(2\)

```javascript
// 1
const app = require("spring.js").app;

// 2
const SpringJS = require("spring.js");
const { app } new SpringJS({ name: "test" });
```

{% hint style="info" %}
We recommend for multiple files by starting up in a main file and accessing the express app using the first method
{% endhint %}

## Example usage

```javascript
const SpringJS = require("spring.js");
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

