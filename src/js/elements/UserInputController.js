var Jasteroids = Jasteroids || {};

Jasteroids.UserInputController = function (container, model) {
    this.model = model;
    this.pressedKeys = {};

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

        if (! this.model.missile) {
            if (this.pressedKeys[Jasteroids.UserInputController.Keys.SPACE_KEY]) {
                var missile = new Jasteroids.Missile();
                missile.setPosition(this.model.spaceShip.getPosition().clone());
                var velocity = this.model.spaceShip.getDirection().clone();
                velocity.scaleBy(missile.getMaxSpeed());
                missile.setVelocity(velocity);
                this.model.missile = missile;
            }
        }
    }
};

Jasteroids.UserInputController.Keys = {
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    UP_KEY: 38,
    DOWN_KEY: 40,
    SPACE_KEY: 32
};

Object.freeze(Jasteroids.UserInputController.Keys);
