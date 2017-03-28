module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'Alexa_training_AV' );
var req= require('request-promise')




app.launch( function( request, response ) {
    
	response.say( 'Welcome to allplay  skill. please tell me what should i do ?' ).reprompt('sorry repeat again !').shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};


app.intent('search',
  {"utterances":[ 
		"search speakers",
		]
		
  },
  function(request,response) {
     req.get({url:'http://vps341573.ovh.net:5050',json:true}).then(function(result){
          console.log(result)
          console.log(result.list.length)
          if (result.list.length ==0){

              response.say('Theire are no speaker connected ! please recheck your configuration ')
              response.send()
          }else{
              response.say('the list of speaker are '+result.list +' please choose one ').reprompt('sorry repeat again !').shouldEndSession( false );
              response.send()

          }
          
        })
        return false
  }
);




app.intent('next',
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

app.intent('prev',
  {"utterances":[ 
    "play previous",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/playprevious', form:{key:val}},
   function(error, res, body) {
    var obj =JSON.parse(body);
    console.log('response for playprevious ', obj.status)
    console.log('response for playprevious ', body)
    
    if (obj.status=="no"){
      response.say("No speaker linked. Please link to speaker! ");
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }
    
    

      })
  return false;  
  }
);

app.intent('play',
  {"utterances":[ 
    "play",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/playtrack', form:{key:val}},
   function(error, res, body) {
    response.say("ok !!! ");
    response.send();

      })
  return false;  
  }
);

app.intent('increase',
  {
    "slots": {
      "number": "AMAZON.NUMBER",
      
    },"utterances":[ 
    "increase volume by  {number}",
    ]
    
  },
  function(request,response) {
    var valueToIncrease= request.slot('number')
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/increasevolume', form:{key:val,nb:valueToIncrease}},
   function(error, res, body) {
    response.say("ok !!! ");
    response.send();

      })
  return false;  
  }
);

app.intent('decrease',
  {
    "slots": {
      "number": "AMAZON.NUMBER",
      
    },"utterances":[ 
    "decrease volume by {number}",
    ]
    
  },
  function(request,response) {
    var valueToDecrease= request.slot('number')
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/decreasevolume', form:{key:val,nb:valueToDecrease}},
   function(error, res, body) {
    response.say("ok !!! ");
    response.send();

      })
  return false;  
  }
);

app.intent('pause',
  {"utterances":[ 
    "pause",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/pause', form:{key:val}},
   function(error, res, body) {
    response.say("ok !!! ");
    response.send();

      })
  return false;  
  }
);

app.intent("link", {
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
     
      response.say('Speaker '+nameToRepeat+' linked . what do you want to do ?').shouldEndSession( false );
      response.send()
       
    }else {
      console.log('not found')
          response.say(nameToRepeat+ '  Player not found')
          response.send()
     
    }
    
  }
          
          });


  return false
  
   

   



});





module.exports = app;
