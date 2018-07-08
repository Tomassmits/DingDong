var doBlink = false;

class Led {
    constructor() {
        this.mBrightness = 50;    // 50 %
    }

    setPin(pin) {
        this.mPin = pin;
        console.log("MOCK::Led#setPin(" + pin + ")");
    }

    setBrightness(brightness) {
        console.log("MOCK::Led#setBrightness(" + brightness + ")");
    }

    fadein() {
        console.log("MOCK::Led#fadein()");
    }

    blink(duration, speed, lowState, highState, leaveState) {
        var state = true;
        doBlink = true;
        console.log("MOCK:Led#blink - LED state: " + lowState );
        var blinkInterval = setInterval( function() {
            if( doBlink === true ) console.log("MOCK:Led#blink - LED state: " + (state ? highState : lowState) );
            state = !state;
        }, speed);

        setTimeout( function() {
            doBlink = false;
            clearInterval(blinkInterval);
            console.log("MOCK:Led#blink - LED state: " + leaveState );
        }, duration);
    }

    turnOff() {
        this.setBrightness(0);
    }
}

const instance = new Led();
//Object.freeze(instance);

module.exports = instance;
