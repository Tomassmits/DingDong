/**
    Simulates a GPIO button call, where the button is pressed at random times.
    The button is being "pressed" every 10 to 15s (randomly between these values) after the last button release.
    The button is pressed for a period between 0s and 5s.
**/
var buttonCallback;

class Button {
    constructor() {
        this.mPin = -1;
    }

    setPin(pin) {
        this.mPin = pin;
        console.log("MOCK::Button#setPin(" + pin + ")");
    }

    startListen() {
        var level = 0;
        this.newButtonCallAfterRandom(1);
    }

    newButtonCallAfterRandom(level) {
        var delay = Math.floor(Math.random() * 5000 ) + (10000 * level);
        console.log("MOCK:Button#nextButtonEvent in " + delay + "ms" );
        setTimeout(
            function(level, tick) {
                console.log("MOCK:Button#onButtonEvent: " + (level == 1 ? "UP" : "DOWN") +  ", tick: " + tick );
                buttonCallback(level, tick);
                instance.newButtonCallAfterRandom(level);
            },
            delay,
            level ^ 1,
            new Date().getTime() * 1000
        );
    }

    setCallback(callback) {
        buttonCallback = callback;
    }
}

const instance = new Button();
//Object.freeze(instance);

module.exports = instance;
