var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var Add = require("./models/addbody");
var User = require("./models/user");
var blogRoutes = require("./routes/blogs");
var commentRoutes = require("./routes/comments");
var addbodyRoutes = require("./routes/addbody");
var userRoutes = require("./routes/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");

//seedDB();
//mongoose.connect("mongodb://localhost/myBlog");
mongoose.connect("mongodb://alex:alex@ds155150.mlab.com:55150/myblog");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//passport configuration
app.use(require("express-session")({
    secret: "Once Astor is the best dog ever",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//Define Routes 
app.use(blogRoutes);
app.use(commentRoutes);
app.use(addbodyRoutes);
app.use(userRoutes);

app.get("/", function(req, res){
    res.render("welcome");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Started!"); 
});