'use strict';

var AlexaAppServer = require( 'alexa-app-server' );

var server = new AlexaAppServer( {
	
	httpsEnabled: true,
  privateKey: 'private-key.pem',
  certificate: 'certificate.pem',
	httpsPort: 443,
  
  
} );

server.start();

//port: process.env.PORT || 3000,
