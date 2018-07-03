'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var cors = require('cors');

var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
var short = 1;
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true}, () => {
  console.log("DB connected");
});

const urlSchema = new Schema({
  originalUrl: String,
  shortUrl: String
});

const shortenUrl = mongoose.model('shortenUrl', urlSchema);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', (req, res) => {
  var longUrl = req.body.url;
  if(regex.test(longUrl)) {
    res.json({original_url: longUrl,short_url: short});
    var input = new shortenUrl({originalUrl: longUrl, shortUrl: short.toString()});
    input.save((err) => {
      if(err) {
        return res.send("Error Saving");
      }
    });
    short++;
  } else {
    res.json({error: "invalid URL"});
  }
});  

// your first API endpoint... 
app.get("/api/shorturl/:inputUrl(*)", (req, res) => {
  shortenUrl.findOne({'shortUrl': req.params.inputUrl}, (err, data) => {
    if(err) {
      return err;
    } 
    res.redirect(301, data.originalUrl);
  });
});


app.listen(port,  () => {
  console.log('Node.js listening ...');
});