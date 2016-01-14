var jsdom = require("jsdom").jsdom;
var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
global.jQuery = require('jquery');

var jsonfile = require('jsonfile')
var util = require('util')
var fs = require('fs');   


app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// parse application/json
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/',function(req,res){
//   res.sendFile('newBlogPost.html');
//   //It will find and locate index.html from View or Scripts
// });

 app.get('/newPost',function(req,res){
   res.sendFile('createNewPost.html', {'root': __dirname+ '/views'});
   console.log("Request accepted");
});

app.post('/saveArticle',function(req,res){
   
   //console.log('Inside save article');
   
   console.log(req.body);
   //var obj = require(__dirname +"/data/json/posts.json");
   //var file = __dirname +"/data/json/posts.json"
   //var fileData = jsonfile.readFileSync(file);
   //console.log('File data '+ JSON.stringify(fileData));
   //var jsonData = JSON.parse(fileData);
   //var finalData = fileData.push(req.body);

   var jsonArray = "["+JSON.stringify(req.body)+"]";
   //console.log('Array is; '+ jsonArray);
   jsonfile.writeFileSync(__dirname +"/data/json/posts.json", JSON.parse(jsonArray), {spaces: 2});
   res.sendFile('index.html', {'root': __dirname+ '/views'});
});

// app.get('/newPost',function(req,res){
//   res.sendFile('index.html');

//   //It will find and locate index.html from View or Scripts
// });

app.listen(3000);

console.log("Running at Port 3000");