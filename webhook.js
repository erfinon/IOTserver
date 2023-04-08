const secret = "your_secret_here";
const repo = "~/home/www/IOTserver";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    exec('cd ' + repo + ' && git pull');
    });
    res.end();
}).listen(8080);