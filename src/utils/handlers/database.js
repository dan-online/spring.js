module.exports.start = function(options) {
  const log = require("../../tests/logger");
  const Enmap = require("enmap");
  const EnmapMongo = require("enmap-mongo");
  const db = new Enmap({
    provider: new EnmapMongo({
      name: options.name,
      url: options.mongo
    })
  });
  db.defer.then(() => db.set("hello", "world") && log("database"));
  module.exports = db;
  return db;
};
