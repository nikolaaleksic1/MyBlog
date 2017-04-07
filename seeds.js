var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment   = require("./models/comment");
var Add = require("./models/addbody");

var data = [
    {
        name: "Marina", 
        familyname: "Trkulja",
        city: "Barcelona",
        work: "Tourist Guide",
        year: "11.07.1982",
        image: "https://static.pexels.com/photos/90754/woman-portrait-girl-color-90754.jpeg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        author: {
                id: "58c4380b8bc47014b3bb8566", 
                username:"Marina"
                }
    },
    {
        name: "Ana", 
        familyname: "Lobric",
        city: "New York",
        work: "Manager",
        year: "11.07.1985",
        image: "https://40winksaday.files.wordpress.com/2014/01/a-happy-woman.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        author: {
                id: "58c4380b8bc47014b3bb8562", 
                username:"Ana"
                }
    }
];

function seedDB(){
   //Remove all campgrounds
   Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Blog.create(seed, function(err, blog){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a blog");
                    //add blogbody
                    Add.create({
                        body: "This place is great, but I wish there was internet",
                        title: "Text1"
                    }, function(err, add){
                       if(err){
                           console.log("cant add");
                       } else {
                           blog.adds.push(add);
                           blog.save();
                           console.log("added blog");
                       }
                    });
                    
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: 
                                {
                                id: "58c4380b8bc47014b3bb8566", 
                                username:"Ana"
                                }
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                blog.comments.push(comment);
                                blog.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
