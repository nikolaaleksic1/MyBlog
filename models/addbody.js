var mongoose = require("mongoose");
var addblogSchema = new mongoose.Schema({
   body: String,
   title: String,
   image: String
});

module.exports = mongoose.model("Add", addblogSchema);
