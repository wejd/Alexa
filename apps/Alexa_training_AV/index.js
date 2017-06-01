module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('Alexa_training_AV');
var req = require('request-promise')
    /*var http = require('http')*/
var http = require('bluebird').promisifyAll(require('request'), { multiArgs: true });
var getlistspeakerperuser = function(req, res, callback) {
    return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {
        callback(listspeakerConnected)
    })

}

app.launch(function(request, response) {
    console.log(request)
    response.say('Welcome to allplay. With this skill ,you can voice control any  allplay device with your AMAZON echo or echo dot . Account linking is required . For instructions, please refer to your alexa app')
});


app.error = function(exception, request, response) {

    response.say('Sorry an error occured ' + error.message);
};

app.intent('which', {
        "utterances": [
            "which device is connected",
        ]

    },

    function(request, response) {


        return http.getAsync({ url: 'http://164.132.196.179:5050/getConnectedDevice', json: true }).spread(function(result, body) {
            if (result.statusCode == 200) {
                if (body != false) {
                    response.say('the Device ' + body + ' is selected')
                    response.send()
                } else {
                    response.say('No allplay device have been selected!')
                    response.send()
                }




            } else {

                response.say('No allplay device have been selected!')
                response.send()
            }







        })


    }
);

app.intent('nothing', {
        "utterances": [
            "nothing",
        ]

    },

    function(request, response) {
        response.say('')
        response.send()

    }
);

app.intent('none', {
        "utterances": [
            "none",
        ]

    },

    function(request, response) {
        response.say('')
        response.send()

    }
);

app.intent('no', {
        "utterances": [
            "no",
        ]

    },

    function(request, response) {
        response.say('')
        response.send()

    }
);

app.intent('noone', {
        "utterances": [
            "no one",
        ]

    },

    function(request, response) {
        response.say('')
        response.send()

    }
);

app.intent('anyone', {
        "utterances": [
            "any one",
        ]

    },

    function(request, response) {
        return http.postAsync({ url: 'http://164.132.196.179:5050/linktoanyone', form: { key: 'anyone' } },
            function(error, res, body) {
                if (!error && res.statusCode == 200) {

                    response.say('Device ' + body + ' has been selected.')
                    response.send()


                };


            })

    });




app.intent('search', {
        "utterances": [
            "search speakers",
        ]

    },
    function(request, response) {
        accessToken = request.sessionDetails.accessToken;
        console.log('accessToken  ', accessToken)
        reqheader = 'Bearer ' + accessToken;

        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {




            console.log('listspeakerConnected', listspeakerConnected)

            var i = 0

            var speakerListString = ''
            for (i = 0; i < listspeakerConnected.length; i++) {

                if (i == 0) {


                    speakerListString = listspeakerConnected[0].name
                }
                if (i > 0) {
                    if (i == listspeakerConnected.length - 1) {
                        speakerListString = speakerListString + ' and ' + listspeakerConnected[i].name
                    } else {
                        speakerListString = speakerListString + ',' + listspeakerConnected[i].name
                    }

                }
            }

            console.log('list device ', speakerListString)
            if (listspeakerConnected.length == 1) {
                var session = request.getSession()
                session.set('lastCommande', "search")
                session.set('speaker', listspeakerConnected[0].name)
                session.set('speaker_numSerie', listspeakerConnected[0].num_serie)

                if (listspeakerConnected[0].linked == true) {
                    response.say(' You have  ' + listspeakerConnected.length + ' allplay device available, ' + listspeakerConnected[0].name + ' and it is already connected')
                    response.send()
                } else {
                    response.say('You have  ' + listspeakerConnected.length + ' allplay device available, ' + speakerListString + '. Do you want to select it! ').reprompt('sorry repeat again !').shouldEndSession(false);
                    response.send()
                }

            } else {

                response.say('You have  ' + listspeakerConnected.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                response.send()

            }





        });
    })



/*
app.intent('search', {
        "utterances": [
            "search speakers",
        ]

    },
    function(request, response) {
        return http.getAsync({ url: 'http://164.132.196.179:5050/getConnectedDevice', json: true }).spread(function(statusCodesError, nameSpeakerconnected) {




            console.log('nameSpeakerConnected', nameSpeakerconnected)




            return http.getAsync({ url: 'http://164.132.196.179:5050', json: true }).spread(function(eroorStatusCode, result) {

                console.log(result.list.length)
                if (result.list.length == 0) {

                    response.say('No allplay devices have been discovered!')
                    response.send()
                } else {
                    var speakerListString = ''
                    for (i = 0; i < result.list.length; i++) {

                        if (i == 0) {


                            speakerListString = result.list[0]
                        }
                        if (i > 0) {
                            if (i == result.list.length - 1) {
                                speakerListString = speakerListString + ' and ' + result.list[i]
                            } else {
                                speakerListString = speakerListString + ',' + result.list[i]
                            }

                        }
                    }


                    if (result.list.length == 1) {
                        var session = request.getSession()
                        session.set('lastCommande', "search")
                        session.set('speaker', result.list[0])

                        if (nameSpeakerconnected != false) {
                            response.say(' You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + ' and it is already connected')
                            response.send()
                        } else {
                            response.say('You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '. Do you want to select it! ').reprompt('sorry repeat again !').shouldEndSession(false);
                            response.send()
                        }

                    } else {

                        response.say('You have  ' + result.list.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                        response.send()

                    }

                }

            })
        })

    }
);
*/


app.intent('listspeaker', {
        "utterances": [
            "list devices",
        ]

    },
    function(request, response) {
        return http.getAsync({ url: 'http://164.132.196.179:5050/getConnectedDevice', json: true }).spread(function(statusCodesError, nameSpeakerconnected) {



            console.log('nameSpeakerConnected', nameSpeakerconnected)




            return http.getAsync({ url: 'http://164.132.196.179:5050', json: true }).spread(function(eroorStatusCode, result) {

                console.log(result.list.length)
                if (result.list.length == 0) {

                    response.say('No allplay devices have been discovered!')
                    response.send()
                } else {
                    var speakerListString = ''
                    for (i = 0; i < result.list.length; i++) {

                        if (i == 0) {


                            speakerListString = result.list[0]
                        }
                        if (i > 0) {
                            if (i == result.list.length - 1) {
                                speakerListString = speakerListString + ' and ' + result.list[i]
                            } else {
                                speakerListString = speakerListString + ',' + result.list[i]
                            }

                        }
                    }


                    if (result.list.length == 1) {
                        var session = request.getSession()
                        session.set('lastCommande', "search")
                        session.set('speaker', result.list[0])

                        if (nameSpeakerconnected != false) {
                            response.say(' You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + ' and it is already connected')
                            response.send()
                        } else {
                            response.say('You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '. Do you want to select it! ').reprompt('sorry repeat again !').shouldEndSession(false);
                            response.send()
                        }

                    } else {

                        response.say('You have  ' + result.list.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                        response.send()

                    }

                }

            })
        })

    }
);

app.intent('yes', {
        "utterances": [
            "play next",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            var lastCommande = session.get('lastCommande')
            var val = session.get('speaker')
            var numSerie = session.get('speaker_numSerie')
        }
        if (lastCommande == 'search') {


            return http.postAsync({ url: 'http://164.132.196.179:5050', form: { key: numSerie } },
                function(error, res, body) {
                    if (!error && res.statusCode == 200) {

                        if (body == 'found') {


                            response.say(val + ' has been selected ')
                            response.send()

                        } else {
                            console.log('not found', numSerie)
                            response.say('I was unable to select ' + val + ' . Please try again later')
                            response.send()

                        }

                    }

                });



        }

        if (lastCommande == 'control') {

            return http.getAsync({ url: 'http://164.132.196.179:5050', json: true }).spread(function(statusCode, result) {
                console.log(result)
                console.log(result.list.length)
                if (result.list.length == 0) {

                    response.say('No allplay devices have been discovered!')
                    response.send()
                } else {
                    var speakerListString = ''
                    for (i = 0; i < result.list.length; i++) {

                        if (i == 0) {
                            console.log('inside if egale a zero')
                            speakerListString = result.list[i]
                        }
                        if (i > 0) {
                            if (i == result.list.length - 1) {
                                speakerListString = speakerListString + ' and ' + result.list[i]
                            } else {
                                speakerListString = speakerListString + ',' + result.list[i]
                            }

                        }
                    }
                    if (result.list.length == 1) {
                        var session = request.getSession()
                        session.set('lastCommande', "search")
                        session.set('speaker', result.list[0])
                        response.say('You have  ' + result.list.length + ' allplay device available, ' + result.list + '. Do you want to link it! ').reprompt('sorry repeat again !').shouldEndSession(false);
                        response.send()
                    } else {
                        response.say('You have  ' + result.list.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                        response.send()

                    }

                }

            })





        }



    }
);

app.intent('next', {
        "utterances": [
            "play next",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/playnext', form: { key: val } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , play next! ");
                    response.send();
                }

            })

    }
);

app.intent('prev', {
        "utterances": [
            "play previous",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/playprevious', form: { key: val } },
            function(error, res, body) {


                var obj = JSON.parse(body);


                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok play previous! ");
                    response.send();
                }



            })

    }
);

app.intent('play', {
        "utterances": [
            "play",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/playtrack', form: { key: val } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , play!!! ");
                    response.send();
                }

            })

    }
);

app.intent('incr', {
        "utterances": [
            "increase volume ",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/incrvolume', form: { key: val } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , increase!!! ");
                    response.send();
                }

            })

    }
);


app.intent('decr', {
        "utterances": [
            "decrease volume ",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/decrevolume', form: { key: val } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , decrease !!! ");
                    response.send();
                }

            })

    }
);


app.intent('increase', {
        "slots": {
            "number": "AMAZON.NUMBER",

        },
        "utterances": [
            "increase volume by  {number}",
        ]

    },
    function(request, response) {
        var valueToIncrease = request.slot('number')
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/increasevolume', form: { key: val, nb: valueToIncrease } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , increase by  " + valueToIncrease);
                    response.send();
                }

            })

    }
);

app.intent('decrease', {
        "slots": {
            "number": "AMAZON.NUMBER",

        },
        "utterances": [
            "decrease volume by {number}",
        ]

    },
    function(request, response) {
        var valueToDecrease = request.slot('number')
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/decreasevolume', form: { key: val, nb: valueToDecrease } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok , decrease by " + valueToDecrease);
                    response.send();
                }

            })

    }
);

app.intent('pause', {
        "utterances": [
            "pause",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
        }
        return http.postAsync({ url: 'http://164.132.196.179:5050/pause', form: { key: val } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok, pause! ");
                    response.send();
                }

            })

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


        console.log('**-*-*-*', request.slot('NAMED'));
        console.log('**-*-*-*', request.sessionDetails)
        var namespeakerfromalexa = request.slot('NAMED');
        session.set('name', namespeakerfromalexa);

        accessToken = request.sessionDetails.accessToken;
        reqheader = 'Bearer ' + accessToken;
        console.log('------------------------------', reqheader);
        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {
            console.log('nameSpeakerConnected', listspeakerConnected)
            i = 0
            listspeakerConnected.forEach(function(speaker) {
                console.log('speaker ', speaker)
                if (speaker.name == namespeakerfromalexa) {
                    i++;
                    return http.postAsync({ url: 'http://164.132.196.179:5050/', json: true, form: { key: speaker.num_serie } },

                        function(error, res, body) {

                            if (!error && res.statusCode == 200) {

                                if (body == 'found') {
                                    console.log('found')

                                    response.say(nameToRepeat + ' has been selected ')
                                    response.send()

                                } else {

                                    console.log('not found')
                                    response.say('I was unable to select ' + nameToRepeat + ' . Please try again later')
                                    response.send()

                                }

                            }

                        });

                }
            })

            if (i == 0) {
                console.log('not found')
                response.say('I was unable to select ' + nameToRepeat + ' . Please try again later')
                response.send()


            }







        });

    }
);


app.intent('help', {
        "utterances": [
            "help",
        ]

    },

    function(request, response) {
        response.say(' you can start by asking . Alexa ask allplay to list devices! to search device connected . and then select the device by saying . Alexa link to device you want to select. once selected you can voice control your device')
        response.send()

    }
);


app.intent('start', {
        "utterances": [
            "start",
        ]

    },

    function(request, response) {
        response.say('Welcome to allplay. With this skill ,you can voice control any  allplay device with your AMAZON echo or echo dot . Account linking is required . For instructions, please refer to your alexa app')

        response.send()


    }
);



module.exports = app;