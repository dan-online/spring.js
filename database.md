---
description: >-
  We use enmap to connect to your mongo database as it is fast and easy to use.
  Because of deprecation we use enmap 3 and enmap-mongo.
---

# Database

All commands can be found here: [https://enmap.evie.dev/v/3/](https://enmap.evie.dev/v/3/)

You can access the database through the module \(1\) or on startup in the constructor \(2\)

```javascript
// 1
const database = require("js-spring").database;

// 2
const { database } new SpringJS({ name: "test" });
```

{% hint style="info" %}
We recommend for multiple files by starting up in a main file and accessing the database using the first method
{% endhint %}

## Example usage

```javascript
const SpringJS = require("js-spring");
const { database } new SpringJS({ name: "test" });

database.set("DanCodes", "Spring.js");

console.log("DanCodes wrote " + database.get("DanCodes") + "!");
```
