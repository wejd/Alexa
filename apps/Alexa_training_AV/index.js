module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'Alexa_training_AV' );
var req= require('request')


app.launch( function( request, response ) {
  console.log('this is the request', request.data.session.user)
	response.say( 'Welcome to avempace test skill please tell me what should i do' ).reprompt('sorry repeat again !').shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};


app.intent('avempace',
  {"utterances":[ 
		"start recording",
		]
		
  },
  function(request,response) {
    
    response.say("recording started!!! ");
  }
);

app.intent('wirless',
  {"utterances":[ 
		"stop recording",
		]
		
  },
  function(request,response) {
    
    response.say("recording stopped!!! ");
    //response.audioPlayerPlayStream('http://radio.mosaiquefm.net:8000/mosalive')
  }
);


app.intent("name", {
    "slots": {
      "NAMED": "AMAZON.US_FIRST_NAME",
      
    },
    "utterances": [
      "my name is {NAMED} "
    ]
  },
  function(request, response) {
  	var nameToRepeat= request.slot('NAMED')
  	console.log('na',nameToRepeat)

/*
    req({
  uri: "http://localhost:5000/",
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,

}, function(error, res, body) {
   if (!error && res.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
          
          });*/

    req.post({url:'vps341573.ovh.net:5050', form:{key:nameToRepeat}},
   function(error, res, body) {
   if (!error && res.statusCode == 200) {
    if (body=='found'){
       response.say(nameToRepeat+ " Speaker linked")
    }else {

      response.say(nameToRepeat+ " Speaker Not Found please check if the Speaker is connected")
    }
    
  }
          
          });



   
  	


   }
);





module.exports = app;
