console.log('Starting...');
var config = require('./config.json');
var backend = require('./backend.js');
if( config.mock ) {
    console.log("MOCKING GPIO!");
    var button = require('./button_mock.js')
    var buttonLed = require('./led_mock.js')
    var bell = require('./bell_mock.js')
} else {
    var button = require('./button.js')
    var buttonLed = require('./led.js')
    var bell = require('./bell.js')
}

backend.setDeviceId(config.deviceId);
buttonLed.setPin(config.pins.led);
button.setPin(config.pins.button);
bell.setPin(config.pins.bell);

button.setCallback(onButtonPressed);

backend.startListen();
button.startListen();
buttonLed.setBrightness(config.ledBrightness);
//buttonLed.fadein()

var startTick = 0;
var endTick = 0;
var eventId;

// TODO: make sure that pressing the button multiple times in a row (so that the button gets triggered when the system is still processing the previous action) doesn't break things. Perhaps make the visual LED feedback wait at least for the process to finish (upload of image and all)?
function onButtonPressed(level, tick) {
    if( level == 0 ) {
        startTick = tick;
        buttonLed.blink(config.minInterval, 400, 0, config.ledBrightness, config.ledBrightness);

        eventId = backend.sendEvent('x');
        console.log('onButtonPressed. EventID: ', eventId);
        if( backend.getBellEnabled() === true ) bell.chime();
        // TODO: get image from camera
        // TODO: backend.sendImage(eventId, image);
    } else {
        console.log('onButtonReleased. EventID: ', eventId);
        var duration = (tick >> 0) - (startTick >> 0);  // in microSeconds.
        backend.setButtonDuration(eventId, duration);
    }
}

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    buttonLed.turnOff();
    bell.turnOff();
    process.exit();
});
