var fs = require('fs');
if (!fs.existsSync('./firebase_settings.json')) {
    console.log("Please create a firebase_settings.json file. Check firebase_settings.json.template for more information.")
    process.exit()
}
var firebase = require('firebase');
var firebaseSettings = require('./firebase_settings.json');

class Backend {
    constructor() {
        console.log('Initializing Firebase app.');
        firebase.initializeApp(firebaseSettings);

        this.mDbRef = firebase.app().database().ref();

        this.mGongEnabled = false;
    }

    setDeviceId( id ) {
        console.log('Identifying with Firebase as device \'' + id + '\'.');
        this.mDeviceId = id
    }

    startListen() {
        console.log('Starting configuration listener.');
        this.mDbRef.child('conf').child(this.mDeviceId).on('value', function (snap) {
            instance.setGongEnabled( snap.val()['gong'] === true ? true : false );
        });
    }

    sendEvent(event) {
        return this.mDbRef.child('events').push({'image' : 'false', 'timestamp': ''}).key;
    }

    setGongEnabled( enabled ) {
        if( this.mGongEnabled !== enabled ) {
            this.mGongEnabled = enabled;
            console.log("Config::Gong: " + enabled);
        }
    }

    getGongEnabled() {
        return this.mGongEnabled;
    }
}

const instance = new Backend();
//Object.freeze(instance);

module.exports = instance;
