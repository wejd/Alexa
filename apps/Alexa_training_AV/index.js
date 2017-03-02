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
      "link to Speaker {NAMED} "
    ]
  },
  function(request, response) {
  	var nameToRepeat= request.slot('NAMED')
    
  	
  
    val=0


   myfnToCallWebServic(nameToRepeat,function(){
         console.log(val)
        
         return val

   

     })
      
       say2(response,nameToRepeat,function(r){
        
        console.log('inside say function found')
     
        
     
    })  
  

   



});

function say2(response,nameToRepeat,callback){
response.say('i am know looking for your device in the cloud')
  response.say('Please wait')
  console.log("*******",val)
  if (val ==1){
     callback( response.say(nameToRepeat+ " Speaker linked"));
      }
      else  {
        callback(response.say(nameToRepeat+ " Speaker Not Found please check if the Speaker is connected"));
    
    }
   

}

function say(response,nameToRepeat,callback){

  req.post({url:'http://localhost:5000', form:{key:nameToRepeat}},
   function(error, res, body) {
   if (!error && res.statusCode == 200) {
      console.log(body)
    if (body=='found'){
      console.log('found')
     
     callback("found");
      
      
 
       
    }else {
      console.log('not found')
      
      callback('not found')

     
    }
    
  }
          
          });

}

function myfnToCallWebServic(nameToRepeat,callback){

    req.post({url:'http://localhost:5000', form:{key:nameToRepeat}},
   function(error, res, body) {
   if (!error && res.statusCode == 200) {
      console.log(body)
    if (body=='found'){
      console.log('found')
     
      callback(val=1)
      
 
       
    }else {
      console.log('not found')
        callback(val =0)
      


     
    }
    
  }
          
          });

}





module.exports = app;
