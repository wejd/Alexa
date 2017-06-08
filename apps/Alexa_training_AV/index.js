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

app.pre = function(request, response, type) {
    if (!request.sessionDetails.accessToken) {
        // fail ungracefully 
        console.log('no access token')
        response.say('account linking is required to start using our skill ')

        response.send()
        throw "Invalid applicationId";

        // `return response.fail("Invalid applicationId")` will also work 
    }
};

app.error = function(exception, request, response) {
    console.log(exception)
    response.say('Sorry an error occured ');
};

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
            console.log('list length is ', speakerListString.length)
            if (speakerListString == 0) {
                response.say('I have no allplay device detected. Please try again later !')
                response.send()

            }



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


            }

            if (speakerListString.indexOf(',') !== -1 || speakerListString.indexOf(' and ') !== -1) {

                response.say('You have  ' + listspeakerConnected.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                response.send()

            }




        });


    })






app.intent('listspeaker', {
        "utterances": [
            "list devices",
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
            console.log('list length is ', speakerListString.length)
            if (speakerListString == 0) {
                response.say('I have no allplay device detected. Please try again later !')
                response.send()

            }



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


            }

            if (speakerListString.indexOf(',') !== -1 || speakerListString.indexOf(' and ') !== -1) {

                response.say('You have  ' + listspeakerConnected.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                response.send()

            }




        });
    }


);

app.intent('which', {
        "utterances": [
            "which device is connected",
        ]

    },

    function(request, response) {
        accessToken = request.sessionDetails.accessToken;
        console.log('accessToken  ', accessToken)
        reqheader = 'Bearer ' + accessToken;

        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {
            console.log(listspeakerConnected)
            i = 0
            listspeakerConnected.forEach(function(speaker) {
                if (speaker.linked == true) {

                    i++
                    response.say('the Device ' + speaker.name + ' is selected')
                    response.send()
                }

            })
            if (i == 0) {
                response.say('No allplay device have been selected!')
                response.send()
            }

        })



    })





app.intent('anyone', {
        "utterances": [
            "any one",
        ]

    },

    function(request, response) {
        accessToken = request.sessionDetails.accessToken;
        console.log('accessToken  ', accessToken)
        reqheader = 'Bearer ' + accessToken;

        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {
            console.log(listspeakerConnected)
            if (listspeakerConnected[0].linked) {
                response.say('device ' + listspeakerConnected[0].name + ' is already selected')
            } else {
                return http.postAsync({ url: 'http://vps341573.ovh.net:5050', form: { key: listspeakerConnected[0].num_serie } },
                    function(error, res, body) {
                        if (!error && res.statusCode == 200) {

                            if (body == 'found') {

                                session.set('speaker_numSerie', listspeakerConnected[0].num_serie)
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


        })




    });

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


            return http.postAsync({ url: 'http://vps341573.ovh.net:5050', form: { key: numSerie } },
                function(error, res, body) {
                    if (!error && res.statusCode == 200) {

                        if (body == 'found') {

                            session.set('speaker_numSerie', numSerie)
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
                console.log('list length is ', speakerListString.length)
                if (speakerListString == 0) {
                    response.say('I have no allplay device detected. Please try again later !')
                    response.send()

                }



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


                }

                if (speakerListString.indexOf(',') !== -1 || speakerListString.indexOf(' and ') !== -1) {

                    response.say('You have  ' + listspeakerConnected.length + ' allplay devices available ' + speakerListString + ' . please choose one ! ').reprompt('sorry repeat again !').shouldEndSession(false);
                    response.send()

                }





            });





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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/playnext', form: { key: numSerie } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/playprevious', form: { key: numSerie } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/playtrack', form: { key: numSerie } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/incrvolume', form: { key: numSerie } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/decrevolume', form: { key: numSerie } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/increasevolume', form: { key: numSerie, nb: valueToIncrease } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/decreasevolume', form: { key: numSerie, nb: valueToDecrease } },
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
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/pause', form: { key: numSerie } },
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


app.intent('stop', {
        "utterances": [
            "stop",
        ]

    },
    function(request, response) {
        if (request.hasSession()) {
            var session = request.getSession()
            console.log(session.get('name'))
            var val = session.get('name')
            var numSerie = session.get('speaker_numSerie')
        }
        return http.postAsync({ url: 'http://vps341573.ovh.net:5050/pause', form: { key: numSerie } },
            function(error, res, body) {
                var obj = JSON.parse(body);
                if (obj.status == "no") {
                    session.set('lastCommande', "control")

                    response.say("I have no allplay device selected. would you like to launch discovery ? ").shouldEndSession(false);;
                    response.send();
                } else {
                    response.say("ok, stop! ");
                    response.send();
                }

            })

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
var RSVP = require('rsvp')

app.intent("link", {
        "slots": {
            "NAMED": "AMAZON.LITERAL",

        },
        "utterances": [
            "select {NAMED} "
        ]
    },
    function(request, response) {



        var namespeakerfromalexa = request.slot('NAMED');


        accessToken = request.sessionDetails.accessToken;
        reqheader = 'Bearer ' + accessToken;
        i = 0
        str = ''
        speakerName = ''
        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {


            listspeakerConnected.forEach(function(speaker) {

                if (speaker.name == namespeakerfromalexa) {
                    var promise = new RSVP.Promise(function(fulfill, reject) {
                        str = http.postAsync({ url: 'http://vps341573.ovh.net:5050/', json: true, form: { key: speaker.num_serie } },

                            function(error, resul, body) {

                                if (!error && resul.statusCode == 200) {
                                    speakerName = speaker.name
                                    if (body == 'found') {
                                        i++;
                                        console.log('found')
                                        return str = 'found'



                                    } else {

                                        console.log('unabble to linik');
                                        return str = 'not found'
                                    }

                                }
                            });
                        console.log(str)
                        if (str === 'found') {
                            fulfill(str)
                        }
                        if (str === 'not found') {
                            reject(str)
                        }
                    });

                    promise.then(function(toss) {
                        response.say(namespeakerfromalexa + ' has been selected ')
                        response.send()
                    }, function(toss) {
                        response.say('I was unable to select ' + namespeakerfromalexa + ' . Please try again later')
                        response.send()

                    });






                }

            })


            /*
                        console.log('i is ', i)
                        console.log('str is ', str)
                        console.log('speakzrname is ', speakerName)

                        if (i == 0) {
                            console.log('not found and i equal zeo')
                            response.say('I was unable to select ' + namespeakerfromalexa + ' . Please try again later')
                            response.send()


                        } else {
                            response.say(namespeakerfromalexa + ' has been selected ')
                            response.send()

                        }
            */





        });

    });
/*app.intent("link", {
        "slots": {
            "NAMED": "AMAZON.LITERAL",

        },
        "utterances": [
            "select {NAMED} "
        ]
    },
    function(request, response) {



        var namespeakerfromalexa = request.slot('NAMED');


        accessToken = request.sessionDetails.accessToken;
        reqheader = 'Bearer ' + accessToken;
        i = 0
        j = 0
        str = ''
        speakerName = ''
        return http.getAsync({ url: 'https://oauth20.herokuapp.com/api/speakers', headers: { 'Authorization': reqheader }, json: true }).spread(function(statusCodesError, listspeakerConnected) {
            var fnSelect = function(speaker, str, i, callback) {

                http.postAsync({ url: 'http://vps341573.ovh.net:5050/', json: true, form: { key: speaker.num_serie } },

                    function(error, resul, body) {

                        if (!error && resul.statusCode == 200) {
                            speakerName = speaker.name
                            if (body == 'found') {
                                i++;
                                console.log('found', i)
                                callback(
                                    str = 'found')



                            } else {
                                console.log('unabble to linik');
                                callback(
                                    str = 'not found')




                            }

                        }

                    })
            }


            listspeakerConnected.forEach(function(speaker) {

                if (speaker.name == namespeakerfromalexa) {


                    var strR = fnSelect(speaker, str, i, function(result) {
                        console.log('i is ', result)



                        return result



                    })
                    if (strR === 'found') {
                        j++
                        console.log('inside if respose')
                        response.say(namespeakerfromalexa + ' has been selected ')
                        return response.send()

                    }
                    if (strR === 'not found') {
                        j++
                        console.log('inside if respose')
                        response.say('I was unable to select ' + namespeakerfromalexa + ' . Please try again later')

                        return response.send()
                    }



                }










            })




        });


    });
*/



module.exports = app;