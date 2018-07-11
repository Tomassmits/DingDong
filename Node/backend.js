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

        this.mBellEnabled = false;
    }

    setDeviceId( id ) {
        console.log('Identifying with Firebase as device \'' + id + '\'.');
        this.mDeviceId = id
        this.mDbDeviceRef = this.mDbRef.child('devices').child(id);
        this.mDbEventsRef = this.mDbDeviceRef.child('events');
        this.mDbConfigRef = this.mDbDeviceRef.child('config');
    }

    startListen() {
        console.log('Starting configuration listener.');
        this.mDbConfigRef.on('value', function (snap) {
            if( snap.val() != null ) {
                instance.setBellEnabled( snap.val()['bell'] === true ? true : false );
            } else {
                console.log("Bell configuration not found. Please setup the config tree in the database.");
            }
        });
    }

    sendEvent(deviceId) {
        return this.mDbEventsRef.push(
            {
                'image' : false,
                'timestamp': (new Date()).getTime(),
                'pushDuration': -1
            }).key;
    }

    setBellEnabled( enabled ) {
        if( this.mBellEnabled !== enabled ) {
            this.mBellEnabled = enabled;
            console.log("Config::Bell: " + enabled);
        }
    }

    getBellEnabled() {
        return this.mBellEnabled;
    }

    setButtonDuration(deviceId, eventId, duration) {
        this.mDbEventsRef.child(eventId).update({"pushDuration" : duration});
    }

    setEventImageAvailable(deviceId, eventId) {
        this.mDbEventsRef.child(eventId).update({"image" : true});
    }
}

const instance = new Backend();
//Object.freeze(instance);

module.exports = instance;
