var mongoose = require("mongoose");
var addblogSchema = new mongoose.Schema({
   body: String,
   title: String
});

module.exports = mongoose.model("Add", addblogSchema);
