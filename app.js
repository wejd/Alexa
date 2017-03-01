'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    verify = require('./verify'),
    forecaster = require('./forecaster'),
    https=require('https'),
    fs=require('fs');

    var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

app.all('/',function(req,res){
	console.log('hello inside server ');
	res.json({message:'monster puppet'})
})
/*
app.get('/', function(req, res) {
    res.json({ message: 'The Process is up and running.', since: (new Date()).toString() });
});
app.post('/avempace', verify, forecaster);*/

var server = https.createServer(options,app);

server.listen(3000);

server.on('listening', onListening);



/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log(" Lisening on "+bind)
}
