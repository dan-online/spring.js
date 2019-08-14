var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    key: mongoose.Schema.Types.Mixed,
    value: mongoose.Schema.Types.Mixed
}, {
    strict:false
});

module.exports = mongoose.model("database", schema);
