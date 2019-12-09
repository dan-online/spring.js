module.exports.start = function(options) {
  const log = require("../../tests/logger");
  if (options.mongo && options.mongo != "" && !options.forceNulldb) {
    const Enmap = require("enmap");
    const EnmapMongo = require("enmap-mongo");
    var db = new Enmap({
      provider: new EnmapMongo({
        name: options.name,
        url: options.mongo
      })
    });
    db.defer.then(() => db.set("hello", "world") && log("database"));
  } else {
    var db = {};
    log("database");
  }
  module.exports = db;

  return db;
};
