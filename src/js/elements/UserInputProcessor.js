var Jasteroids = Jasteroids || {};

Jasteroids.UserInputProcessor = function (model, soundPlayer, gameController) {
    return {
        left: function () {
            if (model.spaceShip) {
                model.spaceShip.rotate(Jasteroids.Settings.SPACE_SHIP_ROTATION_ANGLE);
            }
        },
        right: function () {
            if (model.spaceShip) {
                model.spaceShip.rotate(-Jasteroids.Settings.SPACE_SHIP_ROTATION_ANGLE);
            }
        },
        forward: function () {
            if (model.spaceShip) {
                model.spaceShip.forwardThrust();
            }
        },
        back: function () {
            if (model.spaceShip) {
                model.spaceShip.reverseThrust();
            }
        },
        shoot: function () {
            if (model.spaceShip && !model.missile) {
                if (model.spaceShip.getAge() >= Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE) {
                    soundPlayer.playShootSound();
                    var missile = new Jasteroids.Missile();
                    missile.setPosition(model.spaceShip.getPosition().clone());
                    var velocity = model.spaceShip.getDirection().clone();
                    velocity.scaleBy(Jasteroids.Settings.SPACE_SHIP_MISSILE_MAX_SPEED);
                    missile.setVelocity(velocity);
                    model.missile = missile;
                }
            }
        },
        toggleSound: function() {
            soundPlayer.toggleSound();
        },
        newGame: function() {
            gameController.newGame();
        },
        toggleApeshit: function() {
            model.apeshitMode = !model.apeshitMode;
        }
    }

};