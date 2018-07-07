//var gpio = require....

class Bell {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
    }

    chime() {
        // TODO: Chime the bell
    }
}

const instance = new Bell();
//Object.freeze(instance);

module.exports = instance;
