var backend = require('./backend.js');
var button = require('./button.js')

backend.setDeviceId('db-1');
backend.startListen();

button.setPin(18);
button.setCallback(onButtonPressed);
button.startListen();

function onButtonPressed() {
    console.log('onButtonPressed');
}
