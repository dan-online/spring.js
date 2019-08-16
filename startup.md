# Startup

```javascript
new SpringJS({ name: "test" });
```

### Options

* [Name](./#name)
* [Port](./#port)
* [Log](./#log)
* [Mongo](./#mongo)
* [Views directory](./#Views%20Directory)
* [Public directory](./#Public%20Directory)

#### Name

* Kind: String
* Example: name: "test"
* Description: This will be used just for logging purposes

```javascript
new SpringJS({ name: "test" });
```

#### Port

* Kind: Integer \(0-65536\)
* Example: port: 8080
* Description: What port to run the web server on

```javascript
new SpringJS({
  name: "test",
  port: 8080
});
```

#### Log

* Kind: Boolean
* Example: log: true
* Description: Whether or not to log requests to the console

```javascript
new SpringJS({
  name: "test",
  port: 8080,
  log: true
});
```

#### Mongo

* Kind: String
* Example: mongo: "mongodb://localhost:27017/"
* Description: Mongo server to connect to for database

```javascript
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/"
});
```

#### Views Directory

* Kind: String
* Example: viewsDir: "./test/views"
* Description: The views directory

```javascript
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views"
});
```

#### Public Directory

* Kind: String
* Example: publicDir: "./test/views"
* Description: The public directory for express

```javascript
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: "./test/views",
  publicDir: "./test/public"
});
```



