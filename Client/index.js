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

// TODO: make sure that pressing the button mutiple times doesn't break things.
function onButtonPressed() {
    // TODO: buttonLed.blink();
    var eventId = backend.sendEvent('x');
    console.log('onButtonPressed. EventID: ', eventId);
    if( backend.getBellEnabled() === true ) bell.chime();
    // TODO: get image from camera
    // TODO: send image (with eventId as its name)
    // TODO: backend.setEventImageAvailable(eventId);
}
