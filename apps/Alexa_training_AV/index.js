module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'Alexa_training_AV' );


app.launch( function( request, response ) {
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
  }
);


app.intent("name", {
    "slots": {
      "NAME": "AMAZON.US_FIRST_NAME",
      
    },
    "utterances": [
      "my name is {NAME} "
    ]
  },
  function(request, response) {
  	var nameToRepeat= request.slot('NAME')
  	console.log('na',nameToRepeat)
  	response.say("Hello  "+nameToRepeat+ " do you want to be my freind")


   }
);





module.exports = app;
