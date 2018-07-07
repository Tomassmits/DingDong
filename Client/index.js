console.log('Starting...');
var backend = require('./backend.js');
var button = require('./button.js')
var buttonLed = require('./led.js')
var bell = require('./bell.js')
var config = require('./config.json');

backend.setDeviceId(config.deviceId);
buttonLed.setPin(config.ledPin);
button.setPin(config.buttonPin);
bell.setPin(config.bellPin);

button.setCallback(onButtonPressed);

backend.startListen();
button.startListen();

var startTick = 0;
var endTick = 0;
var eventId;

// TODO: make sure that pressing the button multiple times in a row (so that the button gets triggered when the system is still processing the previous action) doesn't break things. Perhaps make the visual LED feedback wait at least for the process to finish (upload of image and all)?
function onButtonPressed(level, tick) {
    if( level == 0 ) {
        startTick = tick;
        buttonLed.blink(3000, 400, 0, 100, 100);

        eventId = backend.sendEvent('x');
        console.log('onButtonPressed. EventID: ', eventId);
        if( backend.getBellEnabled() === true ) bell.chime();
        // TODO: get image from camera
        // TODO: send image (with eventId as its name)
        // TODO: backend.setEventImageAvailable(eventId);
    } else {
        console.log('onButtonReleased. EventID: ', eventId);
        //buttonLed.setBrightness(100);
        var duration = (tick >> 0) - (startTick >> 0);  // in microSeconds.
        // TODO: backend.setButtonDuration(eventId, duration);
    }
}

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    process.exit();
});
