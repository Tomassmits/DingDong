//var gpio = require....

const cFadeFreq = 100;  // 100 Hz

class Led {
    constructor() {
        this.mPin = -1;
        this.mDuty = 50;    // 50 %
        this.mFreq = 2;     // 2 Hz
    }

    setPin(pin) {
        this.mPin = pin;
    }

    setPwm(duty, frequency) {
        this.mDuty = duty;
        this.mFreq = frequency;
        // TODO: Set the provided PWM to GPIO
    }

    fadein() {
        this.setPwm(0, cFadeFreq);
        // TODO: Set fade-in pwm settings
        // TODO: fadein using PWM :)
        this.setPwm(this.mDuty, this.mFreq);
    }

    blink(duration, leaveState) {
        // TODO: Start PWM signal for provided duration. Leave LED in state provided as leaveState.
    }
}

const instance = new Led();
//Object.freeze(instance);

module.exports = instance;
