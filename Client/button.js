//var gpio = require....
var timers = require('timers');

class Button {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
    }

    startListen() {
        this.TESTbuttonPressInterval();
        // TODO: Start listening here
    }

    setCallback(callback) {
        this.mCallback = callback;
    }

    TESTbuttonPressInterval() {
        timers.setInterval(this.mCallback, 2000);
    }
}

const instance = new Button();
//Object.freeze(instance);

module.exports = instance;
