var Gpio = require('pigpio').Gpio;

const bounceTimeout = 50000;    // 50ms

class Button {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
    }

    startListen() {
        var buttonGpio = new Gpio(this.mPin, {
            mode: Gpio.INPUT,
            pullUpDown: Gpio.PUD_UP,
            alert: true
          });

        buttonGpio.glitchFilter(bounceTimeout);

        buttonGpio.on('alert', (level, tick) => {
            this.mCallback(level, tick);
        });

    }

    setCallback(callback) {
        this.mCallback = callback;
    }
}

const instance = new Button();
//Object.freeze(instance);

module.exports = instance;
