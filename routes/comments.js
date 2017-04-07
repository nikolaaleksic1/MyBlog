var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/blogs/:id/comments/new",middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, findBlog){
      if(err){
         console.log("cant find blogcomment");
      } else {
        res.render("comment/new", {blog: findBlog});
      }
   }); 
});

router.post("/blogs/:id/comments",middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, blog){
      if(err){
        console.log("cant findBlog post");
      } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
              console.log("cant create comment");
           } else {
             //add user
             comment.author.id = req.user._id;
             comment.author.username = req.user.username;
             comment.save();
             blog.comments.push(comment);
             blog.save();
             req.flash("success", "Comment is Added!");
             res.redirect("/blogs/" + req.params.id);
           }
        });
      }
   });
});


//edit routes
router.get("/blogs/:id/comments/:comment_id/edit",middleware.checkCommentOwnerShip, function(req, res){
   Comment.findById(req.params.comment_id, function(err, editComment) {
       if(err){
        console.log("cant editComment");
       }else {
         res.render("comment/edit", {blog_id: req.params.id, comment: editComment});
       }
   }); 
});

router.put("/blogs/:id/comments/:comment_id",middleware.checkCommentOwnerShip, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
       if(err){
        console.log("cant update");
       } else {
         req.flash("success", "Comment is Updated!");
         res.redirect("/blogs/" + req.params.id);
       }
    }); 
});

//delete comment

router.delete("/blogs/:id/comments/:comment_id",middleware.checkCommentOwnerShip, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err, deleteComment){
      if(err){
        console.log("cant deleteComment");
      } else {
         req.flash("success", "Comment is Deleted!");
         res.redirect("/blogs/" + req.params.id);
      }
   }); 
});

  

module.exports = router;