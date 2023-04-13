'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');


const secret = "erfi";
const repo = "/home/www/IOTserver";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;



var app = module.exports = express();

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());
 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:GRTEl8wDRbDu107LxHAEwhFp@gina.iran.liara.ir:32995/my-app?authSource=admin";



// example: http://localhost:3000/api/users/?api-key=foo
app.get('/', function (req, res) {
    res.send("AAAAcccc12345");
  });

  app.get('/add', function (req, res) {

    

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("gh");
      dbo.createCollection("customers", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
        res.end("saved")
      });
    });
    //res.setHeader('Content-Type', 'text/plain')
    //res.write('you posted:\n')
    //res.end(JSON.stringify(req.body))
  });



app.get('/webhook',function (req, res) {
    //exec('cd ' + repo + ' git pull origin main --no-edit', (err, stdout, stderr) => {
    exec('git pull --no-edit', (err, stdout, stderr) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
     });
     res.end()
    });


// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Sorry, can't find that" })
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}