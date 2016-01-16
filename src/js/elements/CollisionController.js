var Jasteroids = Jasteroids || {};

Jasteroids.CollisionController = function (model, bounds, notifyListeners) {
    this.model = model;
    this.bounds = bounds;
    this._notifyListeners = notifyListeners;
};

Jasteroids.CollisionController.prototype.tick = function () {
    this._collisionCheck();
};

Jasteroids.CollisionController.prototype._collisionCheck = function () {
    if (this.isSpaceShipMortal()) {
        this.model.asteroids.forEach(function (asteroid) {
            if (Jasteroids.CollisionDetector.areItemsColliding(asteroid, this.model.spaceShip)) {
                this._shipDeath();
            }

        }, this);

        if (Jasteroids.CollisionDetector.isItemCollidingWithMissile(this.model.spaceShip, this.model.saucerMissile)) {
            this._shipDeath();
        }

        if (Jasteroids.CollisionDetector.areItemsColliding(this.model.spaceShip, this.model.saucer)) {
            this._shipDeath();
        }
    }

    for (var i = 0; i < this.model.asteroids.length; i++) {
        var asteroid = this.model.asteroids[i];
        if (Jasteroids.CollisionDetector.areItemsColliding(this.model.spaceShip, asteroid)) {
            if (this.isSpaceShipMortal()) {
                this._shipDeath();
            }
        }

        if (Jasteroids.CollisionDetector.isItemCollidingWithMissile(asteroid, this.model.missile)) {
            this._asteroidDeath(i);
            this.model.missile = null;
        }

        if (Jasteroids.CollisionDetector.isItemCollidingWithMissile(asteroid, this.model.saucerMissile)) {
            this.model.saucerMissile = null;
        }
    }

};

Jasteroids.CollisionController.prototype.isSpaceShipMortal = function () {
    return this.model.spaceShip != null
        && this.model.spaceShip.getAge() > Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE;
};

Jasteroids.CollisionController.prototype._shipDeath = function () {
    var explosion = Jasteroids.ExplosionFactory.create(this.model.spaceShip);
    this.model.explosions.push(explosion);

    this.model.livesRemaining = this.model.livesRemaining - 1;
    this.model.createShipTimer = 0;
    this.model.spaceShip = null;
};

Jasteroids.CollisionController.prototype._asteroidDeath = function (asteroidIndex) {
    var asteroid = this.model.asteroids[asteroidIndex];

    // remove the asteroid
    this.model.asteroids.splice(asteroidIndex, 1);

    // add child asteroids
    var childAsteroids = Jasteroids.AsteroidFactory.createChildAsteroids(asteroid);
    this.model.asteroids = this.model.asteroids.concat(childAsteroids);

    // add explosion
    var explosion = Jasteroids.ExplosionFactory.create(asteroid);
    this.model.explosions.push(explosion);

    this.model.addToScore(Jasteroids.Settings.ASTEROID_HIT_POINTS);

};
