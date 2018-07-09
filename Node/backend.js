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
    }

    startListen() {
        console.log('Starting configuration listener.');
        this.mDbRef.child('conf').child(this.mDeviceId).on('value', function (snap) {
            instance.setBellEnabled( snap.val()['bell'] === true ? true : false );
        });
    }

    sendEvent(deviceId) {
        return this.mDbRef.child('events').child(deviceId).push(
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
        this.mDbRef.child('events').child(deviceId).child(eventId).update({"pushDuration" : duration});
    }

    sendImage(eventId, imageUrl) {
        var fileRef = this.storageRef.child("image.jpg");


        // TODO: send image (with eventId as its name)
        // TODO: backend.setEventImageAvailable(eventId);
    }

    setEventImageAvailable(deviceId, eventId) {
        this.mDbRef.child('events').child(deviceId).child(eventId).update({"image" : true});
    }
}

const instance = new Backend();
//Object.freeze(instance);

module.exports = instance;
