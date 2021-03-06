var Jasteroids = Jasteroids || {};

Jasteroids.GameModel = function () {
    this.spaceShip = null;
    this.missile = null;
    this.saucerMissile = null;
    this.saucer = null;
    this.asteroids = [];
    this.explosions = [];
    this.stars = [];
    this.livesRemaining = null;
    this.score = 0;
    this.level = 1;
    this.deadTimer = 0;
    this.gameInProgress = false;
    this.createShipTimer = 0;
    this.apeshitMode = false;
};

Jasteroids.GameModel.prototype.addToScore = function (numPoints) {
    this.score = this.score + numPoints;
};
