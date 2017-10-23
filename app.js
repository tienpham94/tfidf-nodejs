var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var WordSchema = require("./Word.model")

var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var string1 = 'this document is about node.'

tfidf.addDocument(string1);
tfidf.addDocument('this document is about ruby.');
tfidf.addDocument('this document is about ruby and node.')
tfidf.addDocument('this document is about node. it has node examples');

var stringArr = ["node","ruby"]

stringArr.forEach(function(element){
  tfidf.tfidfs(element, function(i, measure) {
    WordSchema.create({
      word: element,
      tfidf: measure
    }).then(function(err, word){
      console.log(err, word);
    })
  });
});

tfidf.tfidfs('ruby', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});



var db = "mongodb://localhost/words"

mongoose.connect(db)

app.get("/", function(req,res){
  res.send("Happy to be here")
})

app.get("/words",function(req,res){
  console.log("Getting all books");
  WordSchema.find({})
    .exec(function(err,words){
      if(err){
        res.send("Error has occured")
      } else {
        console.log(words);
        res.json(words)
      }
    })
})


var port = 3000;

app.listen(port,function(){
  console.log("app listen " + port);
})
