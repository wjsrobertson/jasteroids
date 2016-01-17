var Jasteroids = Jasteroids || {};

Jasteroids.GameController = function (model, bounds, listeners, controllers, soundPlayer) {
    this.model = model;
    this.bounds = bounds;
    this.listeners = listeners || [];
    this.controllers = controllers || [];
    this.soundPlayer = soundPlayer;
};

Jasteroids.GameController.prototype.newGame = function () {
    this.model.livesRemaining  = Jasteroids.Settings.NUM_LIVES_START;
    this.model.deadTimer = 0;
    this.model.createShipTimer = 0;

    this._initStars();
    this._initSpaceShip();
    this._initAsteroids(3);

    this.soundPlayer.playGameStartSound();
    this._notifyListeners(Jasteroids.EventTypes.GAME_START);
};

Jasteroids.GameController.prototype.tick = function () {
    this.controllers.forEach(function (controller) {
        controller.tick();
    });

    this._handleAging();
    this._nextLevelCheck();
    this._gameOverCheck();
};

Jasteroids.GameController.prototype._initStars = function () {
    var stars = [];

    for (var i = 0; i < Jasteroids.Settings.NUM_STARS; i++) {
        var width = 3 * Math.random();
        var x = this.bounds.width * Math.random();
        var y = this.bounds.height * Math.random();
        var position = new Jasteroids.Vector2D(x, y);
        var star = new Jasteroids.Star(position, width);

        stars.push(star);
    }

    this.model.stars = stars;
};

Jasteroids.GameController.prototype._initSpaceShip = function () {
    this.model.spaceShip = new Jasteroids.SpaceShip();
    this.model.spaceShip.setPosition(new Jasteroids.Vector2D(this.bounds.width / 2, this.bounds.getHeight() / 2));
};

Jasteroids.GameController.prototype._initAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
        var xVelocity = 2 * Math.random() + 1;
        if (Math.random() >= 0.5) {
            xVelocity = -xVelocity;
        }
        var yVelocity = 2 * Math.random() + 1;
        if (Math.random() >= 0.5) {
            yVelocity = -yVelocity;
        }

        var xPosition = Math.random() * this.bounds.getWidth();
        var yPosition = Math.random() * this.bounds.getHeight();
        var position = new Jasteroids.Vector2D(xPosition, yPosition);
        var velocity = new Jasteroids.Vector2D(xVelocity, yVelocity);

        var asteroid = Jasteroids.AsteroidFactory.create(position, velocity, Jasteroids.AsteroidFactory.LARGE_SIZE);
        this.model.asteroids.push(asteroid);
    }
};

Jasteroids.GameController.prototype._initSaucer = function () {
// TODO - no saucer yet
};

Jasteroids.GameController.prototype._notifyListeners = function (eventType) {
    this.listeners.forEach(function (listener) {
        listener(eventType);
    });
};

Jasteroids.GameController.prototype._nextLevelCheck = function () {
    if (this.model.asteroids.length == 0 && this.model.livesRemaining > 0) {
        this.model.level = this.model.level + 1;
        this._initAsteroids(this.model.level);
        this._initSpaceShip();
        this._notifyListeners(Jasteroids.EventTypes.NEW_LEVEL);
    }
};

Jasteroids.GameController.prototype._handleAging = function () {
    this.model.explosions.forEach(function (explosion, index) {
        if (explosion.getAge() > Jasteroids.Settings.EXPLOSION_MAX_AGE) {
            this.model.explosions.splice(index, 1);
        }
    }, this);

    if (this.model.missile) {
        if (this.model.missile.getAge() > Jasteroids.Settings.MISSLE_MAX_AGE_SHIP) {
            this.model.missile = null;
        }
    }

    if (this.model.saucerMissile) {
        if (this.model.saucerMissile.getAge() > Jasteroids.Settings.MISSLE_MAX_AGE_SAUCER) {
            this.model.saucerMissile = null;
        }
    }

    if (this.model.spaceShip) {
        if (this.model.spaceShip.getAge() == Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE) {
            this._notifyListeners(Jasteroids.EventTypes.SHIP_MORTAL);
        }
    } else {
        this.model.deadTimer = this.model.deadTimer + 1;
        this.model.createShipTimer = this.model.createShipTimer + 1;
        if (this.model.createShipTimer > Jasteroids.Settings.CREATE_SHIP_WAIT && this.model.livesRemaining > 0) {
            this._initSpaceShip();
        }
    }
};

Jasteroids.GameController.prototype._gameOverCheck = function () {
    if (this.model.livesRemaining == 0) {
        this.model.deadTimer = this.model.deadTimer + 1;

        if (this.model.deadTimer > Jasteroids.Settings.DEAD_GAMEOVER_WAIT) {
            this._notifyListeners(Jasteroids.EventTypes.GAME_END);
        }

        this.soundPlayer.playGameOverSound();
    }
};
