const SpringJS = require("./index");
const { app } = new SpringJS({
  name: "test",
  port: 8080,
  log: true,
  mongo: "mongodb://localhost:27017/",
  viewsDir: __dirname + "/views",
  publicDir: __dirname + "/public",
  cdn: {
    domain: "cdn.your-domain.com",
    bucket: "bucket-name",
    key: "amazon-s3-key",
    secret: "amazon-s3-secret",
    hostname: "localhost",
    port: 1337,
    ssl: false,
    production: true
  },
  routes: [{ url: "/", router: require("./test/routes/api") }]
});

app.get("/test", function(req, res) {
  res.send("SpringJS is the best");
});
