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
const uri = "mongodb://root:GRTEl8wDRbDu107LxHAEwhFp@gina.iran.liara.ir:32995/my-app?authSource=admin";
const client = new MongoClient(uri);


// example: http://localhost:3000/api/users/?api-key=foo
app.get('/', function (req, res) {
    res.send("AAAAcccc12345");
  });

  app.get('/anomalyboard', function (req, res) {
    res.sendFile(__dirname+"/anomalyboard.htm");
  });

  app.get('/currentstate', function (req, res) {
    res.sendFile(__dirname+"/currentstate.htm");
  });

  app.post('/add', async function (req, res) {
      try {
        const database = client.db("gh");
        const haiku = database.collection("weather");
        // create a document to insert
        var _doc = req.body;
        _doc["timestamp"] = new Date();
        const doc = _doc;
        
        const result = await haiku.insertOne(doc);
    
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        console.log("weather added.");


        const haiku1 = database.collection("LASTweather");
        const temp = _doc["metaData"];;//_doc["metaData"];
        const result1 = await haiku1.updateOne({"_id":"1"},{$set: {"temperatures":temp}})
        console.log(`A LASTweather document was inserted with the _id: ${result1.insertedId}`);
      } finally {
        //await client.close();
      }
    //res.setHeader('Content-Type', 'text/plain')
    //res.write('you posted:\n')
    res.end("pass.");
  });

  app.get('/getLASTweather',async function (req, res) {
    try {
      const database = client.db("gh");
      const haiku = database.collection("LASTweather");
      
    //const cursor = await haiku.find({"title":"title"});
    const cursor = haiku.find({"_id":"1"});
    for await (const doc of cursor) {
      res.write(JSON.stringify(doc));
      res.write("\n\n\n\n")
    }
  }finally {
    //await client.close();
    }
  res.end();
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




    app.post('/logAnomaly',async function (req, res) {
      try {
        const database = client.db("gh");
        const haiku = database.collection("anomaly_logs");
        /*
          anomaly format in json to store logs :
          {
            "_id":"",
            "title":"",
            "level":0,
            "desc":"",
            "detectorID":"", --> refers to the detector's deviceID
            "forwardedHead":"" --> refers to detector device's incoming head
            "spotTime":"",
            "retrieveTime":""
            "metadata":"",
            "logStatus":"" --> ADD,DEL
            "logDesc":""
          }
        */
        var _doc = req.body;
        _doc["retrieveTime"] = new Date();
        const doc = _doc;
        const result = await haiku.insertOne(doc);
    
        console.log(`A document (anomaly log) was inserted with the _id: ${result.insertedId}`);
      } finally {
        //await client.close();
      }
    res.end("pass.")
      });


      app.get('/delAnomaly',async function (req, res) {
        try {
          const database = client.db("gh");
          const haiku = database.collection("anomaly_board");
          /*
            anomaly format in json to delete :
            {
              "_id":"",
              "title":"",
              "level":0,
              "desc":"",
              "detectorID":"",
              "forwardedHead":"" --> refers to detector device's incoming head
              "spotTime":"",
              "retrieveTime":""
              "metadata":""
            }
          */
          var _doc = req.body;
          _doc["retrieveTime"] = new Date();
          _doc["incomingHead"] = "ANOMALY ALERT";
          const doc = _doc;
          const result = await haiku.insertOne(doc);
          
          console.log(`A document (anomaly set_log) was inserted with the _id: ${result.insertedId}`);
        } finally {
          //await client.close();
        }
      res.end("pass.")
        });





        app.get('/getAnomalyBoard',async function (req, res) {
          try {
            const database = client.db("gh");
            const haiku = database.collection("anomaly_board");
            /*
              anomaly format in json to store logs :
              {
                "_id":"",
                "title":"",
                "level":0,
                "desc":"",
                "detectorID":"", --> refers to the detector's deviceID
                "forwardedHead":"" --> refers to detector device's incoming head
                "spotTime":"",
                "retrieveTime":""
                "metadata":"",
                "logStatus":"" --> ADD,DEL
                "logDesc":""
              }
            */
            
          //const cursor = await haiku.find({"title":"title"});
          const cursor = haiku.find({});
          console.log("async");
          for await (const doc of cursor) {
            res.write(JSON.stringify(doc));
            res.write("\n\n\n\n")
          }

          } finally {
            //await client.close();
          }
          res.end();
          });
    
    




          app.get('/Status',async function (req, res) {
            try {
              const database = client.db("gh");
              const haiku = database.collection("STATUS");
              
            //const cursor = await haiku.find({"title":"title"});
            const cursor = haiku.find({"_id":"1"});
            console.log("Status added.");
            for await (const doc of cursor) {
              res.write(JSON.stringify(doc));
              res.write("\n\n\n\n")
            }
          }finally {
            //await client.close();
            }
          res.end();
          });
          
        
          app.post('/changeStatus',async function (req, res) {
            // sending STATUS in json, Upper-case
              try {
                const database = client.db("gh");
                const haiku = database.collection("HISTORY");
                
                var _doc = req.body;
                delete _doc["_id"];
                _doc["retrieveTime"] = new Date();
                _doc["incomingHead"] = "STATUSCHANGE";
                const doc = _doc;
                const result = await haiku.insertOne(doc);
                
                const haiku1 = database.collection("STATUS");
                const temp = _doc["status"];
                const result1 = await haiku1.updateOne({"_id":"1"},{$set: {"status":temp}})

                
              }
              finally {
            //await client.close();
            }
            res.end("pass.");
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

        