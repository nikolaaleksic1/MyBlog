var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

router.get("/home", function(req, res){
   res.render("blog/home"); 
});
router.get("/about", function(req, res){
   res.render("blog/about"); 
});

router.get("/contact", function(req, res) {
   res.render("blog/contact"); 
});
//find all created blogs

router.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
       if(err){
           console.log("cant find allBlogs");
       } else {
           res.render("blog/index", {blogs: allBlogs, currentUser: req.user});    
       }
    });
});

//create new blog page

router.get("/blogs/new",middleware.isLoggedIn, function(req, res) {
    req.flash("success", "Succesfully Added Blog");
    res.render("blog/new"); 
});

router.post("/blogs",middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var familyname = req.body.familyname;
    var image = req.body.image;
    var description = req.body.description;
    var year = req.body.year;
    var work = req.body.work;
    var city = req.body.city;
    var body = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBlog = {name: name, familyname: familyname, image: image, description: description, year: year, work: work, city: city, body:body, author: author};
    Blog.create(newBlog, function(err, createBlog){
        if(err){
            console.log("cant create blog");
        }else {
            res.redirect("/blogs");
        }   
   }); 
});
//show blog page 

router.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id).populate("comments adds").exec(function(err, findShow){
     if(err){
         console.log(err);
     } else {
        req.flash("success", "Welcome to the Blog Page!");
        res.render("blog/show", {blog: findShow});
     } 
  });
});

//edit routes
router.get("/blogs/:id/edit",middleware.checkBlogOwnership, function(req, res) {
   Blog.findById(req.params.id, function(err, findEdit){
      if(err){
        console.log("cant findEdit");
      } else {
        res.render("blog/edit", {blog: findEdit});
      }
   }); 
});

router.put("/blogs/:id", middleware.checkBlogOwnership, function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
      if(err){
          console.log(err);
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

//edit description

router.get("/blogs/:id/editdesc",middleware.checkBlogOwnership, function(req, res) {
   Blog.findById(req.params.id, function(err, findEditDesc) {
       if(err){
           console.log("cant findEditDesc");
       }else {
           res.render("blog/editdesc", {blog: findEditDesc});
       }
   }); 
});

router.delete("/blogs/:id",middleware.checkBlogOwnership, function(req,res){
   Blog.findByIdAndRemove(req.params.id, function(err, deleteBlog){
      if(err){
        console.log("cant deleteBlog");
      } else {
        req.flash("success", "Blog has been Deleted!");
        res.redirect("/blogs");
      }
   }); 
});


 
module.exports = router;