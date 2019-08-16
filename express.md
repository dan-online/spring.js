---
description: How to access the express server started by spring.js
---

# Express

You can access the express server through the module \(1\) or on startup in the constructor \(2\)

```javascript
// 1
const app = require("spring.js").app;

// 2
const { app } new SpringJS({ name: "test" });
```

{% hint style="info" %}
We recommend for multiple files by starting up in a main file and accessing the express app using the first method
{% endhint %}



