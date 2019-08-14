module.exports.start = function(url) {
  const mongoose = require("mongoose");
  const config = require("../../../package");

  const log = require("../../tests/logger");
  mongoose
    .connect(url + config.name, {
      useNewUrlParser: true
    })
    .then(O_o => {
      if (mongoose.connection.readyState === 1) {
        log("database");
      }
    });
  var Db = require("../models/document");

  const functions = {
    getAll(cb) {
      Db.find({}).exec((err, docs) => {
        if (err) {
          return cb(err, false);
        }
        if (docs) {
          return cb(null, docs);
        } else {
          return cb(null, false);
        }
      });
    },

    set(key, value, cb) {
      if (!key || !value) {
        return false;
      }
      var newDoc = new Db({ key, value });
      console.log(JSON.stringify(newDoc));
      newDoc.save();
      cb(true);
    },

    get(key, cb) {
      Db.findOne({ key }, function(err, res) {
        if (err) {
          return cb(err, false);
        }
        if (res) {
          return cb(null, res);
        } else {
          return cb(null, false);
        }
      });
    }
  };
  module.exports = functions;
};
