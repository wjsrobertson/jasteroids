var Jasteroids = Jasteroids || {};

Jasteroids.GameController = function (model, bounds, listeners) {
    this.model = model;
    this.bounds = bounds;
    this.listeners = listeners || [];
};

Jasteroids.GameController.prototype.newGame = function () {
    this.model = new Jasteroids.GameModel();

    this._initStars();
    this._initSpaceShip();
    this._initAsteroids(1);

    this._notifyListeners(Jasteroids.EventTypes.GAME_START);
};

Jasteroids.GameController.prototype._initStars = function () {
    var stars = [];

    for (var i = 0; i < Jasteroids.Settings.NUM_STARS; i++) {
        var width = 3 * Math.random();
        var x = this.bounds.gameWidth * Math.random();
        var y = this.bounds.gameHeight * Math.random();
        var position = new Jasteroids.Vector2D(x, y);
        var star = new Jasteroids.Star(position, width);

        stars.push(star);
    }

    this.model.stars = stars;
};

Jasteroids.GameController.prototype._initSpaceShip = function () {
    var ship = this.model.spaceShip;

    ship.reset();
    ship.setPosition(this.bounds.gameMaxX / 2, this.bounds.gameMaxY / 2);
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
        var xPosition = Math.random() * (this.bounds.gameMaxX - this.bounds.gameMinX);
        var yPosition = Math.random() * (this.bounds.gameMaxY - this.bounds.gameMinY);

        var asteroid = Jasteroids.AsteroidFactory.create();
        asteroid.set(new Vector2D(xPosition, yPosition), new Vector2D(xVelocity, yVelocity), 3);
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

Jasteroids.GameController.prototype.tick = function () {
    this._updateFloatingObjects();
    this.collisionCheck();
    this.nextLevelCheck();
    this.saucerBehaviour();
    this.gameOverCheck();
};
