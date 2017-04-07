// var mongoose = require("mongoose");

// var blogSchema = new mongoose.Schema({
//    name: String,
//    familyname: String,
//    year: String,
//    city: String,
//    work: String,
//    image: String,
//    description: String,
//    created: {type: Date, default: Date.now},
//    author: {
//       id:{
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User"
//       },
//       username: String
//    },
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//       ],
//    adds: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref:"Add"
//       }
//       ]
// });

// module.exports = mongoose.model("Blog", blogSchema);


var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
   name: String,
   familyname: String,
   year: String,
   city: String,
   work: String,
   image: String,
   description: String,
   created: {type: Date, default: Date.now},
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ],
   adds: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:"Add"
      }
      ]
});

module.exports = mongoose.model("Blog", blogSchema);