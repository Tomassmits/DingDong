const cFadeFreq = 100;  // 100 Hz

class Bell {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
        console.log("MOCK::Bell#setPin(" + pin + ")");
    }

    chime() {
        console.log('Bell is ringing.');
        setTimeout(this.write, 1000, 0);
        setTimeout(this.write, 2000, 1);
        setTimeout(this.write, 3000, 0);
        this.write(1);
    }

    write(level) {
        console.log("MOCK:Bell#blink - Bell level: " + level);
    }

    turnOff() {
        this.write(0);
    }
}

const instance = new Bell();
//Object.freeze(instance);

module.exports = instance;
