var Jasteroids = Jasteroids || {};

Jasteroids.UserInputGamepadHandler = function (userInputProcessor) {

    var axisThreshold = 0.3;

    var buttons = {
        left: [14],
        right: [15],
        up: [12],
        down: [13],
        shoot: [0, 2, 6, 7],
        newGame: [9]
    };

    var axes = {
        horizontal: [0],
        vertical: [1]
    };

    function getGamepad() {
        if (navigator.getGamepads() && navigator.getGamepads().length && navigator.getGamepads()[0]) {
            return navigator.getGamepads()[0];
        } else {
            return null;
        }
    }

    function isButtonPressed(buttonIds) {
        var gamepad = getGamepad();
        return buttonIds.some(function(buttonId) {
            return gamepad && gamepad.buttons[buttonId] && gamepad.buttons[buttonId].pressed;
        });
    }

    function isAxisNegative(axisIds) {
        var gamepad = getGamepad();
        return axisIds.some(function(axisId) {
            return gamepad && gamepad.axes[axisId] < -axisThreshold;
        });
    }


    function isAxisPositive(axisIds) {
        var gamepad = getGamepad();
        return axisIds.some(function(axisId) {
            return gamepad && gamepad.axes[axisId] > axisThreshold;
        });
    }

    function handleGamepad() {
        if (isButtonPressed(buttons.left) || isAxisNegative(axes.horizontal)) {
            userInputProcessor.left();
        } else if (isButtonPressed(buttons.right)  || isAxisPositive(axes.horizontal)) {
            userInputProcessor.right();
        }

        if (isButtonPressed(buttons.up) || isAxisNegative(axes.vertical)) {
            userInputProcessor.forward();
        } else if (isButtonPressed(buttons.down) || isAxisPositive(axes.vertical)) {
            userInputProcessor.back();
        }

        if (isButtonPressed(buttons.shoot)) {
            userInputProcessor.shoot();
        }

        if (isButtonPressed(buttons.newGame)) {
            userInputProcessor.newGame();
        }
    }

    return {
        tick: function() {
            if (getGamepad()) {
                handleGamepad();
            }
        }
    }
};