var Blog = require("../models/blog");
var Comment = require("../models/comment");
var Add = require("../models/addbody");

var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, findBlog){
            if(err){
                console.log("cant do middlewareBlog");
                req.flash("error", "You don't have permission to Do that!");
                res.redirect("back");
            } else {
                if(findBlog.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to Do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You don't have permission to Do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnerShip = function(req, res, next){
   if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id, function(err, findComment){
          if(err){
            console.log("cant do commnetMiddleware");
            req.flash("error", "You don't have permission to Do that!");
            res.redirect("back");
          } else{
              if(findComment.author.id.equals(req.user._id)){
                  next();
              } else{
                  req.flash("error", "You don't have permission to Do that!");
                  res.redirect("back");
              }
          }
       });
   }else {
       req.flash("error", "You don't have permission to Do that!");
       res.redirect("back");
   }  
};



// middlewareObj.checkAddOwnership = function(req, res, next){
//   if(req.isAuthenticated()){
//     Add.findById(req.params.id, function(err, findAdd) {
//       if(err){
//           console.log("cant do addmiddleware");
//           res.redirect("back");
//       } else {
//           if(findAdd.author.id.equals(req.user._id)){
//               next();
//           } else {
//               res.redirect("back");
//           }
//       }
//     });
//   }  
// };


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You need to be LoggeIn to Do that!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;