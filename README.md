---
description: Making launching nodejs servers quick and easy for any developer.
---

# Welcome to Spring.js

![](.gitbook/assets/logo%20%281%29.png)

## Spring.js

![](https://circleci.com/gh/dan-online/spring.js.svg?style=svg&circle-token=f474a522a9749f7c41056ba4c2f1044cc3f65bf3) ![](https://david-dm.org/dan-online/spring.js.svg)   
![](https://api.codacy.com/project/badge/Grade/d6edf679d05f4da183d94b9ffcfc5dff) 

## Basic Use

```javascript
const SpringJS = require("./index");
const { app, database } = new SpringJS({ name: "test" });
```

## Documentation

* [Startup](startup.md)
  * [Options](startup.md#options)
  * [Name](startup.md#name)
  * [Port](startup.md#port)
  * [Log](startup.md#log)
  * [Mongo](startup.md#mongo)
  * [Views directory](startup.md#views-directory)
  * [Public directory](startup.md#public-directory)
* [Express](./#express)
* [Database](./#database)

## Express

You can access express via the module

```javascript
const app = require("spring.js").app;
```

## Database

You can access the database via the module which is using enmap and enmap-mongo.

```javascript
const db = require("spring.js").database;
```

## License

\(The MIT License\)

Copyright \(c\) 2019 DanCodes [dan@dancodes.online](mailto:dan@dancodes.online)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files \(the 'Software'\), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

&lt;/p&gt;

