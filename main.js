'use strict'

/**
 * Module dependencies.
 */

var express = require('express');

const secret = "erfi";
const repo = "~/home/www/IOTserver";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;



var app = module.exports = express();





// example: http://localhost:3000/api/users/?api-key=foo
app.get('/', function (req, res) {
    res.send("AAAAcccc");
  });




  
app.get('/webhook', function (req, res) {
    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
        }
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