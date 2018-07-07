var Gpio = require('pigpio').Gpio;

const cFadeFreq = 100;  // 100 Hz

var bellOut;

class Bell {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
        bellOut = new Gpio(pin, {mode: Gpio.OUTPUT})
    }

    chime() {
        setTimeout(this.write, 1000, 0);
        setTimeout(this.write, 2000, 1);
        setTimeout(this.write, 3000, 0);
        this.write(1);
    }

    write(level) {
        bellOut.digitalWrite(level);
    }
}

const instance = new Bell();
//Object.freeze(instance);

module.exports = instance;
