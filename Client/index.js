var backend = require('./backend.js');
var button = require('./button.js')
var buttonLed = require('./led.js')

backend.setDeviceId('db-1');
backend.startListen();

buttonLed.setPin(20);
button.setPin(18);
button.setCallback(onButtonPressed);
button.startListen();

// TODO: make sure that pressing the button mutiple times doesn't break things.
function onButtonPressed() {
    // TODO: buttonLed.blink();
    var eventId = backend.sendEvent('x');
    console.log('onButtonPressed. EventID: ', eventId);
    // TODO: if( backend.getConfig()['gong'] === true ) gong.bang();
    // TODO: send image (with eventId as its name)
    // TODO: backend.setEventImageAvailable(eventId);
}
