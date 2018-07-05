var firebase = require('firebase');
var firebaseSettings = require('./firebase_settings.json');

firebase.initializeApp(firebaseSettings);

var ref = firebase.app().database().ref();
ref.once('value')
    .then(function (snap) {
        console.log('snap.val()', snap.val());
    });
