//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

//lodash module of express or node is to convert all string irrespective of any case size sign in between to all lower case
const { functionsIn } = require("lodash");


const homeStartingContent = "Welcome to my personal blog website! This website was created as a project to showcase my skills in web development using Node.js, Express, and various frontend technologies. The site features a clean and modern design, with an easy-to-use interface for browsing and reading posts. Additionally, the website is fully responsive, ensuring that it looks great on any device. I hope you enjoy exploring the site and reading my posts. Thank you for visiting!";
const aboutContent = "Welcome to my personal blog! My name is Akash Singh and I am currently a 2nd year student at National Institute of Technology, Rourkela. I am an enthusiast for web development and outdoor games. I created this blog as a way to share my thoughts and experiences on various topics related to web development, as well as to document my progress and learning journey. I hope you enjoy reading my posts and learning about my interests and passions. Thank you for visiting my blog!";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const posts = [];



app.get("/", function(req, res) {

    
      

    res.render("home", {
      homeStartingContent : homeStartingContent ,
      posts : posts
    })

    
})



app.get("/about", function(req, res) {

     res.render("about", {
      aboutContent : aboutContent
     })

})

app.get("/contact", function(req, res) {

  res.render("contact")

})

app.get("/compose", function(req, res) {

   res.render("compose");
        
});

app.post("/compose", function(req, res) {

     

       const post = {
        title : req.body.postTitle ,
        content : req.body.postBody 
       };

      
       
       

       posts.push(post);
       
         
       
          
       res.redirect("/");

});



app.get("/posts/:postName", function(req, res) {
         
       

     posts.forEach(post => {

      const ourInput = _.lowerCase(post.title);
       const webInput = _.lowerCase(req.params.postName);

      if(ourInput == webInput)
      {         
             res.render("display", {
                  heading : post.title,
                  content : post.content
             }) 
      }
      else{
        console.log("No Match Found");
      }
      
     });

});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
