var Gpio = require('pigpio').Gpio;

const cFadeFreq = 100;  // 100 Hz

var outLed;

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
        outLed.pwmWrite(this.mDuty);
    }

    fadein() {
        this.setPwm(0);
        // TODO: Set fade-in pwm settings
        // TODO: fadein using PWM :)
        this.setPwm(this.mBrightness);
    }

    blink(duration, leaveState) {
        // TODO: Start PWM signal for provided duration. Leave LED in state provided as leaveState.
    }
}

const instance = new Led();
//Object.freeze(instance);

module.exports = instance;
