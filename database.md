# Database

You can access the database through the module \(1\) or on startup in the constructor \(2\)

```javascript
// 1
const database = require("spring.js").database;

// 2
const { database } new SpringJS({ name: "test" });
```

{% hint style="info" %}
We recommend for multiple files by starting up in a main file and accessing the database using the first method
{% endhint %}

## Example usage

```javascript
const SpringJS = require("spring.js");
const { database } new SpringJS({ name: "test" });

database.set("DanCodes", "Spring.js");

console.log("DanCodes wrote " + database.get("DanCodes") + "!");
```

