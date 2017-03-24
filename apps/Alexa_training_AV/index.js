module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'Alexa_training_AV' );
var req= require('request-promise')




app.launch( function( request, response ) {
    
	response.say( 'Welcome to avempace  skill please tell me what should i do ?' ).reprompt('sorry repeat again !').shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};


app.intent('avempace',
  {"utterances":[ 
		"search speakers",
		]
		
  },
  function(request,response) {
     req.get({url:'http://vps341573.ovh.net:5050',json:true}).then(function(result){
          console.log(result)
          response.say('the list of speaker are '+result.list +' please choose one ').reprompt('sorry repeat again !').shouldEndSession( false );
          response.send()
        })
        return false
  }
);

app.intent('wirless',
  {"utterances":[ 
		"play next",
		]
		
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/playnext', form:{key:val}},
   function(error, res, body) {
    response.say("ok !!! ");
    response.send();

      })
  return false;  
  }
);



app.intent("name", {
    "slots": {
      "NAMED": "AMAZON.LITERAL",
      
    },
    "utterances": [
      "link to Speaker {NAMED} "
    ]
  },
  function(request, response) {
  	var nameToRepeat= request.slot('NAMED')
     var session = request.getSession()
    session.set('name', nameToRepeat)


req.post({url:'http://vps341573.ovh.net:5050', form:{key:nameToRepeat}},
   function(error, res, body) {
   if (!error && res.statusCode == 200) {
      console.log(body)
    if (body=='found'){
      console.log('found')
     
      response.say('Speaker '+nameToRepeat+' linked you can know play musique. what do you want to do ?').shouldEndSession( false );
      response.send()
       
    }else {
      console.log('not found')
          response.say(name+ '  Player not found')
          response.send()
     
    }
    
  }
          
          });


  return false
  
   

   



});





module.exports = app;
