var Jasteroids = Jasteroids || {};

Jasteroids.UserInputController = function (container, model, soundPlayer, gameController) {
    this.model = model;
    this.pressedKeys = {};
    this.soundPlayer = soundPlayer;

    container.addEventListener('keydown',
        (function (pressedKeys) {
            return function (event) {
                if (event) {
                    pressedKeys[event.keyCode] = true;
                }
            };
        })(this.pressedKeys)
    );

    container.addEventListener('keyup',
        (function (pressedKeys) {
            return function (event) {
                if (event) {
                    pressedKeys[event.keyCode] = false;
                }
            };
        })(this.pressedKeys)
    );

    container.addEventListener('keyup',
        (function (soundPlayer) {
            return function (event) {
                if (event && Jasteroids.UserInputController.Keys.S_KEY == event.keyCode) {
                    soundPlayer.toggleSound();
                }
            };
        })(soundPlayer)
    );

    container.addEventListener('keyup',
        (function (model, gameController) {
            return function (event) {
                if (event && Jasteroids.UserInputController.Keys.N_KEY == event.keyCode) {
                    //if (! model.gameInProgress) {
                        gameController.newGame();
                    //}
                }
            };
        })(this.model, gameController)
    );
};

Jasteroids.UserInputController.prototype.tick = function () {
    if (this.model.spaceShip) {
        if (this.pressedKeys[Jasteroids.UserInputController.Keys.LEFT_KEY]) {
            this.model.spaceShip.rotate(Jasteroids.Settings.SPACE_SHIP_ROTATION_ANGLE);
        } else if (this.pressedKeys[Jasteroids.UserInputController.Keys.RIGHT_KEY]) {
            this.model.spaceShip.rotate(-Jasteroids.Settings.SPACE_SHIP_ROTATION_ANGLE);
        }

        if (this.pressedKeys[Jasteroids.UserInputController.Keys.UP_KEY]) {
            this.model.spaceShip.forwardThrust();
        } else if (this.pressedKeys[Jasteroids.UserInputController.Keys.DOWN_KEY]) {
            this.model.spaceShip.reverseThrust();
        }

        if (!this.model.missile) {
            if (this.pressedKeys[Jasteroids.UserInputController.Keys.SPACE_KEY]) {
                if (this.model.spaceShip.getAge() >= Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE) {
                    this.soundPlayer.playShootSound();
                    var missile = new Jasteroids.Missile();
                    missile.setPosition(this.model.spaceShip.getPosition().clone());
                    var velocity = this.model.spaceShip.getDirection().clone();
                    velocity.scaleBy(Jasteroids.Settings.SPACE_SHIP_MISSILE_MAX_SPEED);
                    missile.setVelocity(velocity);
                    this.model.missile = missile;
                }
            }
        }
    }
};

Jasteroids.UserInputController.Keys = {
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    UP_KEY: 38,
    DOWN_KEY: 40,
    SPACE_KEY: 32,
    S_KEY: 83,
    N_KEY: 78
};

Object.freeze(Jasteroids.UserInputController.Keys);
