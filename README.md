<p align="center">
  <img src="./docs/logo.png" style="width:200px;">
  <h1>Spring.js</h1>
  Reducing your code from 1000 lines to 2 lines is sure to put a spring in your step!
  <br><br>
  By <a href="https://dancodes.online" target="_blank">DanCodes</a>
  <hr>
</p>

# Basic Use

```js
const SpringJS = require("./index");
const { app, database } = new SpringJS({ name: "test" });
```

# Documentation

- [Startup](#startup)
  - [Options](#options)
  - [Name](#name)
  - [Port](#port)
  - [Log](#log)
  - [Mongo](#mongo)
  - [Views directory](#Views%20Directory)
  - [Public directory](#Public%20Directory)

* [Express](#express)
* [Database](#database)

## Startup

```js
new SpringJS({ name: "test" });
```

## Options

- [Name](#name)
- [Port](#port)
- [Log](#log)
- [Mongo](#mongo)
- [Views directory](#Views%20Directory)
- [Public directory](#Public%20Directory)

### Name

- Kind: String
- Example: name: "test"
- Description: This will be used just for logging purposes

```js
new SpringJS({ name: "test" });
```

### Port

- Kind: Integer (0-65536)
- Example: port: 8080
- Description: What port to run the web server on

```js
new SpringJS({
  name: "test",
  port: 8080
});
```

### Log

- Kind: Boolean
- Example: log: true
- Description: Whether or not to log requests to the console

```js
new SpringJS({
  name: "test",
  port: 8080,
  log: true
});
```

### Mongo

- Kind: String
- Example: mongo: "mongodb://localhost:27017/"
- Description: Mongo server to connect to for database

```js
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/"
});
```

### Views Directory

- Kind: String
- Example: viewsDir: "./test/views"
- Description: The views directory

```js
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views"
});
```

### Public Directory

- Kind: String
- Example: publicDir: "./test/views"
- Description: The public directory for express

```js
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views",
  publicDir: "./test/public"
});
```

# Express

You can access express via the module

```js
const app = require("spring.js").app;
```

# Database

You can access the database via the module which is using enmap and enmap-mongo.

```js
const db = require("spring.js").database;
```

# License

(The MIT License)

Copyright (c) 2019 DanCodes <dan@dancodes.online>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

```

```

```
