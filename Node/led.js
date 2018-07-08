var Gpio = require('pigpio').Gpio;

var outLed;
var doBlink = false;

class Led {
    constructor() {
        this.mPin = -1;
        this.mBrightness = 50;    // 50 %
    }

    setPin(pin) {
        this.mPin = pin;
        outLed = new Gpio(pin, {mode: Gpio.OUTPUT})
    }

    setBrightness(brightness) {
        this.mBrightness = brightness;
        outLed.pwmWrite(this.mBrightness);
    }

    fadein() {
        var brightness = 0;
        var fadeInterval = setInterval( function(aim) {
            if( brightness > aim ) {
                clearInterval(fadeInterval);
            }
            outLed.pwmWrite(brightness++);
        }, 20, this.mBrightness);
    }

    blink(duration, speed, lowState, highState, leaveState) {
        var state = true;
        doBlink = true;
        outLed.pwmWrite(lowState);
        var blinkInterval = setInterval( function() {
            if( doBlink === true ) outLed.pwmWrite(state ? highState : lowState);
            state = !state;
        }, speed);

        setTimeout( function() {
            doBlink = false;
            clearInterval(blinkInterval);
            outLed.pwmWrite(leaveState);
        }, duration);
    }

    turnOff() {
        this.setBrightness(0);
    }
}

const instance = new Led();
//Object.freeze(instance);

module.exports = instance;
