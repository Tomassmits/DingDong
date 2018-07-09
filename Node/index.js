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
var processing = false; // Whether we're processing a button event
var suppressing = false; // Whether we're supressing successive events (so we're receiving events while we're still processing the previous one).

function onButtonPressed(level, tick) {
    if( level == 0 ) {
        if( ! processing ) {
            processing = true;
            suppressing = false;
            startTick = tick;
            buttonLed.blink(config.minInterval, 400, 0, config.ledBrightness, config.ledBrightness);
            setTimeout( function() { processing = false }, config.minInterval );

            eventId = backend.sendEvent(config.deviceId);
            console.log('onButtonPressed. EventID: ', eventId);
            if( backend.getBellEnabled() === true ) bell.chime();
            // TODO: get image from camera
            // TODO: backend.sendImage(eventId, image);
        } else {
            suppressing = true;
            console.log("Button is being pressed too quickly in succession.");
        }
    } else {
        if( ! suppressing ) {
            console.log('onButtonReleased. EventID: ', eventId);
            var duration = (tick >> 0) - (startTick >> 0);  // in microSeconds.
            backend.setButtonDuration(config.deviceId, eventId, duration);
        }
    }
}

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    buttonLed.turnOff();
    bell.turnOff();
    process.exit();
});
