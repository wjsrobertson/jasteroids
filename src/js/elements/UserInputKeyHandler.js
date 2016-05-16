var Jasteroids = Jasteroids || {};

Jasteroids.UserInputKeyHandler = function (container, userInputProcessor) {
    this.pressedKeys = {};
    this.userInputProcessor = userInputProcessor;

    var pressedKeys = this.pressedKeys;

    container.addEventListener('keydown',
        function (event) {
            pressedKeys[event.keyCode] = true;
        }
    );

    container.addEventListener('keyup',
        function (event) {
            pressedKeys[event.keyCode] = false;

            if (Jasteroids.UserInputKeyHandler.Keys.S_KEY == event.keyCode) {
                userInputProcessor.toggleSound();
            } else if (Jasteroids.UserInputKeyHandler.Keys.N_KEY == event.keyCode) {
                userInputProcessor.newGame();
            } else if (Jasteroids.UserInputKeyHandler.Keys.A_KEY == event.keyCode) {
                userInputProcessor.toggleApeshit();
            } else if (Jasteroids.UserInputKeyHandler.Keys.F_KEY == event.keyCode) {
                userInputProcessor.toggleFullscreen();
            }
        }
    );
};

Jasteroids.UserInputKeyHandler.prototype.tick = function () {
    if (this.pressedKeys[Jasteroids.UserInputKeyHandler.Keys.LEFT_KEY]) {
        this.userInputProcessor.left();
    } else if (this.pressedKeys[Jasteroids.UserInputKeyHandler.Keys.RIGHT_KEY]) {
        this.userInputProcessor.right();
    }

    if (this.pressedKeys[Jasteroids.UserInputKeyHandler.Keys.UP_KEY]) {
        this.userInputProcessor.forward();
    } else if (this.pressedKeys[Jasteroids.UserInputKeyHandler.Keys.DOWN_KEY]) {
        this.userInputProcessor.back();
    }

    if (this.pressedKeys[Jasteroids.UserInputKeyHandler.Keys.SPACE_KEY]) {
        this.userInputProcessor.shoot();
    }
};

Jasteroids.UserInputKeyHandler.Keys = Object.freeze({
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    UP_KEY: 38,
    DOWN_KEY: 40,
    SPACE_KEY: 32,
    S_KEY: 83,
    N_KEY: 78,
    A_KEY: 65,
    F_KEY: 70
});