var jsdom = require("jsdom").jsdom;
var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
global.jQuery = require('jquery');

var jsonfile = require('jsonfile')
var util = require('util')
var fs = require('fs');

//MongoDB client setup
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://192.168.6.130:27017/test';
var dbConnect= null;


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// parse application/json of request body.
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded of request body
app.use(bodyParser.urlencoded({ extended: true }));

 app.get('/newPost',function(req,res){
   res.sendFile('createNewPost.html', {'root': __dirname+ '/views'});
   console.log("Request accepted");
});

app.get(['/', '/viewPosts'],function(req,res){
   res.sendFile('posts.html', {'root': __dirname+ '/views'});
   console.log("Request Angular post accepted");
});

app.get('/getPosts',function(req,res){
   console.log("Get posts");
   var cursor = dbConnect.collection('usercollection').find().sort({$natural:-1}).limit(10);
   
   var jsonDocs = [];
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         jsonDocs.push(doc.data[0]);
      }else{
        returnJson(res,jsonDocs)
      }
   });

});

//Save blog post in database
app.post('/saveArticle',function(req,res){
   
   console.log(req.body);

   var jsonArray = "["+JSON.stringify(req.body)+"]";
   //console.log('Array is; '+ jsonArray);
   var data = JSON.parse(jsonArray);
   data[0].createdDate = new Date().toString().split(' ').splice(1,3).join(' ');
   //console.log(data)
   insertDocument(dbConnect, data, function() {
     console.log('Record stored successfully!!!');
   });

   res.sendFile('posts.html', {'root': __dirname+ '/views'});
});

//Establish connection with MongoDB on app startup
mongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  //db.close();
  dbConnect = db;
});

var insertDocument = function(db, data, callback) {
   db.collection('usercollection').insertOne({data
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

function returnJson(res, jsonDocs){
  //console.dir(jsonDocs);
  res.json(jsonDocs);
}

app.listen(3000);
console.log("Running at Port 3000");