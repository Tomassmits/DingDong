/**
    Preparations
**/
var fs = require('fs');
if (!fs.existsSync('./firebase_settings.json')) {
    console.log("Please create a firebase_settings.json file.")
    process.exit()
}

var firebase = require('firebase');
var firebaseSettings = require('./firebase_settings.json');

firebase.initializeApp(firebaseSettings);

var ref = firebase.app().database().ref();
ref.once('value')
    .then(function (snap) {
        console.log('snap.val()', snap.val());
    });
