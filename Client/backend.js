var fs = require('fs');
if (!fs.existsSync('./firebase_settings.json')) {
    console.log("Please create a firebase_settings.json file. Check firebase_settings.json.template for more information.")
    process.exit()
}
var firebase = require('firebase');
var firebaseSettings = require('./firebase_settings.json');

firebase.initializeApp(firebaseSettings);

class Backend {
    constructor() {
        this.mDbRef;
    }

    startListen() {
        var ref = firebase.app().database().ref();
        ref.on('value', function (snap) {
            console.log( 'Data changed: ' + snap.val()['blabla']); // Keep the local user object synced with the Firebase userRef
        /*    snap.forEach(function (childSnap) {
                console.log('user', childSnap.val());
            });*/
        });
    }
}

const instance = new Backend();
Object.freeze(instance);

module.exports = instance;
