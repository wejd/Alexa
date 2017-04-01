module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'Alexa_training_AV' );
var req= require('request-promise')




app.launch( function( request, response ) {
    
	response.say( 'Welcome to allplay. With this skill ,you can voice control any  allplay device with your AMAZON echo or echo dot . Account linking is required . For instructions, please refer to your alexa app' )
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('which',
  {"utterances":[ 
    "which device is connected",
    ]
    
  },
  
  function(request,response) {
            req.get({url:'http://vps341573.ovh.net:5050/getConnectedDevice',json:true}).then(function(result){
                   if (result) {
                   
                      response.say('the Device '+result+' is selected')
                      response.send()
                       
                    
                          
                          }else{

                                  response.say('No allplay device have been selected!')
                                    response.send()
                          }

                 
                  
   

   
     
                      })
               return false
     
  }
);



app.intent('nothing',
  {"utterances":[ 
    "nothing",
    ]
    
  },
  
  function(request,response) {
              response.say('')
              response.send()
     
  }
);

app.intent('none',
  {"utterances":[ 
    "none",
    ]
    
  },
  
  function(request,response) {
              response.say('')
              response.send()
     
  }
);

app.intent('no',
  {"utterances":[ 
    "no",
    ]
    
  },
  
  function(request,response) {
              response.say('')
              response.send()
     
  }
);

app.intent('noone',
  {"utterances":[ 
    "no one",
    ]
    
  },
  
  function(request,response) {
              response.say('')
              response.send()
     
  }
);

app.intent('anyone',
  {"utterances":[ 
    "any one",
    ]
    
  },
  
  function(request,response) {
              req.post({url:'http://vps341573.ovh.net:5050/linktoanyone', form:{key:'anyone'}},
                   function(error, res, body) {
                   if (!error && res.statusCode == 200) {
                   
                      response.say('Device '+body+' has been selected.')
                      response.send()
                       
                    
                          
                          };


                 
                  
   

   
     
                      })
               return false
});

app.intent('search',
  {"utterances":[ 
		"search speakers",
		]
		
  },
  function(request,response) {
    req.get({url:'http://vps341573.ovh.net:5050/getConnectedDevice',json:true}).then(function(nameSpeakerconnected){
                   
                 
                  
   

   
     
                      
     req.get({url:'http://vps341573.ovh.net:5050',json:true}).then(function(result){
          console.log(result)
          console.log(result.list.length)
          if (result.list.length ==0){

              response.say('No allplay devices have been discovered!')
              response.send()
          }else{
              var speakerListString=''
              for (i=0;i<result.list.length;i++){
             
                if (i==0){
                  console.log('inside if egale a zero')
                  speakerListString=result.list[i]
                }
                if (i>0){
                    if(i==result.list.length-1){
                      speakerListString=speakerListString +' and '+result.list[i]
                    }
                    else{
                      speakerListString=speakerListString +','+result.list[i]
                    }

                }
              }
              if(result.list.length==1){
                   var session = request.getSession()
                  session.set('lastCommande', "search")
                  session.set('speaker', result.list[0])
                  if(nameSpeakerconnected){
                      response.say(' You have  '+result.list.length  +' allplay device available, '+nameSpeakerconnected+' and it is already connected')
                    response.send()
                  }else {
                    response.say('You have  '+result.list.length  +' allplay device available, '+result.list +'. Do you want to select it! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()
                  }
                  
              }
              else{

                   response.say('You have  '+result.list.length  +' allplay devices available '+speakerListString +' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()

              }
           
          }
          
        })
     })
        return false
  }
);

app.intent('listspeaker',
  {"utterances":[ 
    "list devices",
    ]
    
  },
  function(request,response) {
    req.get({url:'http://vps341573.ovh.net:5050/getConnectedDevice',json:true}).then(function(nameSpeakerconnected){
                                    
     req.get({url:'http://vps341573.ovh.net:5050',json:true}).then(function(result){
          console.log(result)
          console.log(result.list.length)
          if (result.list.length ==0){

              response.say('No allplay devices have been discovered!')
              response.send()
          }else{
              var speakerListString=''
              for (i=0;i<result.list.length;i++){
             
                if (i==0){
                  console.log('inside if egale a zero')
                  speakerListString=result.list[i]
                }
                if (i>0){
                    if(i==result.list.length-1){
                      speakerListString=speakerListString +' and '+result.list[i]
                    }
                    else{
                      speakerListString=speakerListString +','+result.list[i]
                    }

                }
              }
              if(result.list.length==1){
                   var session = request.getSession()
                  session.set('lastCommande', "search")
                  session.set('speaker', result.list[0])
                  if(nameSpeakerconnected){
                      response.say(' You have  '+result.list.length  +' allplay device available, '+nameSpeakerconnected+' and it is already connected')
                    response.send()
                  }else {
                    response.say('You have  '+result.list.length  +' allplay device available, '+result.list +'. Do you want to select it! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()
                  }
                  
              }
              else{

                   response.say('You have  '+result.list.length  +' allplay devices available '+speakerListString +' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()

              }
           
          }
          
        })
     })
        return false
  }
);


app.intent('yes',
  {"utterances":[ 
    "play next",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      var lastCommande=session.get('lastCommande')
      var val=session.get('speaker')

    }
    if(lastCommande=='search'){

         req.post({url:'http://vps341573.ovh.net:5050', form:{key:val}},
         function(error, res, body) {
         if (!error && res.statusCode == 200) {
            console.log(body)
           if (body=='found'){
            console.log('found')
           
            response.say(nameToRepeat+' has been selected ')
            response.send()
             
          }else {
            console.log('not found')
                response.say('I was unable to select '+nameToRepeat+ ' . Please try again later')
                response.send()
           
          }
          
        }
                
                });


        return false
    }

    if(lastCommande =='control'){

      req.get({url:'http://vps341573.ovh.net:5050',json:true}).then(function(result){
          console.log(result)
          console.log(result.list.length)
          if (result.list.length ==0){

              response.say('No allplay devices have been discovered!')
              response.send()
          }else{
              var speakerListString=''
              for (i=0;i<result.list.length;i++){
             
                if (i==0){
                  console.log('inside if egale a zero')
                  speakerListString=result.list[i]
                }
                if (i>0){
                    if(i==result.list.length-1){
                      speakerListString=speakerListString +' and '+result.list[i]
                    }
                    else{
                      speakerListString=speakerListString +','+result.list[i]
                    }

                }
              }
              if(result.list.length==1){
                   var session = request.getSession()
                  session.set('lastCommande', "search")
                  session.set('speaker', result.list[0])
                  response.say('You have  '+result.list.length  +' allplay device available, '+result.list +'. Do you want to link it! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()
              }
              else{
                   response.say('You have  '+result.list.length  +' allplay devices available '+speakerListString +' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession( false );
                    response.send()

              }
           
          }
          
        })
        return false




    }
  

  
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
      var obj =JSON.parse(body);
      if (obj.status=="no"){
         session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
        response.send();
      }else {
        response.say("ok !!! ");
        response.send();
      }

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
     
    console.log('response for playprevious ', body)
    var obj =JSON.parse(body);
 
      console.log('response for playprevious ', obj.status)
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
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
    var obj =JSON.parse(body);
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }

      })
  return false;  
  }
);

app.intent('incr',
  {"utterances":[ 
    "increase volume ",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/incrvolume', form:{key:val}},
   function(error, res, body) {
    var obj =JSON.parse(body);
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }

      })
  return false;  
  }
);


app.intent('decr',
  {"utterances":[ 
    "decrease volume ",
    ]
    
  },
  function(request,response) {
    if(request.hasSession()){
      var session = request.getSession()
      console.log(session.get('name'))
      var val=session.get('name')
    }
    req.post({url:'http://vps341573.ovh.net:5050/decrevolume', form:{key:val}},
   function(error, res, body) {
    var obj =JSON.parse(body);
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }

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
    var obj =JSON.parse(body);
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }

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
      var obj =JSON.parse(body);
      if (obj.status=="no"){
          session.set('lastCommande', "control")
          
          response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
        response.send();
      }else {
        response.say("ok !!! ");
        response.send();
      }

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
    var obj =JSON.parse(body);
    if (obj.status=="no"){
        session.set('lastCommande', "control")
        
        response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession( false );;
      response.send();
    }else {
      response.say("ok !!! ");
      response.send();
    }

      })
  return false;  
  }
);

app.intent("link", {
    "slots": {
      "NAMED": "AMAZON.LITERAL",
      
    },
    "utterances": [
      "select {NAMED} "
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
           
            response.say(nameToRepeat+' has been selected ')
            response.send()
             
          }else {
            console.log('not found')
                response.say('I was unable to select '+nameToRepeat+ ' . Please try again later')
                response.send()
           
          }
          
        }
                
                });


        return false
        
  
});





module.exports = app;
