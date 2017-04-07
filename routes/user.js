var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/register", function(req, res){
   res.render("user/register"); 
});

router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, registerBlog){
      if(err){
        console.log(err);
        return res.render("user/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to the Blog Page! " + registerBlog.username);
          res.redirect("/blogs"); 
       });
      }
   });
});




router.get("/login", function(req, res){
   res.render("user/login"); 
});

router.post("/login", passport.authenticate("local",{
   successRedirect: "/blogs",
   failureRedirect: "/login"
}), function(req, res){
    req.flash("success", "Logged You In!");
});



router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect("/blogs");
});

module.exports = router;