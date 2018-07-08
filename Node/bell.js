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
        console.log('Bell is ringing.');
        this.write(1);
        setTimeout(this.write, 1000, 0);
        setTimeout(this.write, 2000, 1);
        setTimeout(this.write, 3000, 0);
    }

    write(level) {
        bellOut.digitalWrite(level);
    }

    turnOff() {
        this.write(0);
    }
}

const instance = new Bell();
//Object.freeze(instance);

module.exports = instance;
