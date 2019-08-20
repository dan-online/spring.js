"use strict";

module.exports.start = function (options) {
  var log = require("../../tests/logger");
  var Enmap = require("enmap");
  var EnmapMongo = require("enmap-mongo");
  var db = new Enmap({
    provider: new EnmapMongo({
      name: options.name,
      url: options.mongo
    })
  });

  db.defer.then(function () {
    return db.set("hello", "world") && log("database");
  });
  module.exports = db;

  return db;
};