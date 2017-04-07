var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
   author: String,
   text: String,
   date: {type: Date, default: Date.now},
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Comment", commentSchema);