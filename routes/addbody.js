var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Add = require("../models/addbody");
var middleware = require("../middleware");

router.get("/blogs/:id/adds/new",middleware.isLoggedIn, function(req, res){
  Blog.findById(req.params.id, function(err, findBlog){
      if(err){
        console.log("cant find and add");
      } else {
        res.render("add/new.ejs", {blog: findBlog});
      }
  }); 
});

router.post("/blogs/:id/adds",middleware.isLoggedIn, function(req, res){
  Blog.findById(req.params.id, function(err, blog){
      if(err){
        console.log("cant find blog");
      } else {
        Add.create(req.body.add, function(err, add){
          if(err){
              console.log("cant create add");
          } else {
             blog.adds.push(add);
             blog.save();
             req.flash("success", "Succesfully Added Text!");
             res.redirect("/blogs/" + req.params.id);
          }
        });
      }
  }); 
});



module.exports = router;