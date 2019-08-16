# Startup

```javascript
new SpringJS({ name: "test" });
```

### Options

* [Name](startup.md#name)
* [Port](startup.md#port)
* [Log](startup.md#log)
* [Mongo](startup.md#mongo)
* [Views directory](startup.md#views-directory)
* [Public directory](startup.md#public-directory)

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

{% hint style="info" %}
We suggest port 8080 for development but you are free to use any port number between 0 and 65536
{% endhint %}

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

{% hint style="success" %}
Logging will show path of request, speed and status code sent
{% endhint %}

#### Mongo

* Kind: String
* Example: mongo: "mongodb://localhost:27017/"
* Description: Mongo server to connect to your database

```javascript
new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/"
});
```

{% hint style="warning" %}
We use enmap and enmap-mongo for connecting and using your mongo database both of which work but are no longer supported.
{% endhint %}

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

{% hint style="info" %}
We recommend this option only if you are setting a view engine like ejs or pug
{% endhint %}

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



