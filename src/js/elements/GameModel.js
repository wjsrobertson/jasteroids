var Jasteroids = Jasteroids || {};

Jasteroids.GameModel = function () {
    this.spaceShip = new Jasteroids.SpaceShip();
    this.missile = null;
    this.saucerMissile = null;
    this.saucer = null;
    this.asteroids = [];
    this.explosions = [];
    this.stars = [];
    this.livesRemaining = Jasteroids.Settings.NUM_LIVES_START;
    this.score = 0;
    this.level = 1;
    this.deadTimer = -1;
    this.thrusterOn = false;
    this.createShipTimer = 0;
};