var Jasteroids = Jasteroids || {};

Jasteroids.UserInputGamepadHandler = function (userInputProcessor) {

    function handleGamepad(gamepad) {
        if (gamepad.buttons[14].pressed || gamepad.axes[0] < -0.3) {
            userInputProcessor.left();
        } else if (gamepad.buttons[15].pressed || gamepad.axes[0] > 0.3) {
            userInputProcessor.right();
        }

        if (gamepad.buttons[12].pressed || gamepad.axes[1] < -0.3) {
            userInputProcessor.forward();
        } else if (gamepad.buttons[13].pressed || gamepad.axes[1] > 0.3) {
            userInputProcessor.back();
        }

        if (gamepad.buttons[0].pressed || gamepad.buttons[2].pressed || gamepad.buttons[6].pressed || gamepad.buttons[7].pressed) {
            userInputProcessor.shoot();
        }

        if (gamepad.buttons[9].pressed) {
            userInputProcessor.newGame();
        }
    }

    return {
        tick: function() {
            if (navigator.getGamepads() && navigator.getGamepads().length) {
                var gamepad = navigator.getGamepads()[0];
                handleGamepad(gamepad);
            }
        }
    }

};