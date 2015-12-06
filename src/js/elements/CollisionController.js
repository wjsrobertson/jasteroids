var Jasteroids = Jasteroids || {};

Jasteroids.CollisionController = function (model, bounds, notifyListeners) {
    this.model = model;
    this.bounds = bounds;
    this._notifyListeners = notifyListeners;
};

Jasteroids.PositionController.prototype.collisionCheck = function () {
    if (this.isSpaceShipMortal()) {
        this.model.asteroids.forEach(function (asteroid) {
            if (Jasteroids.CollisionDetector.areItemsColliding(asteroid, this.model.spaceShip)) {
                shipDeath();
            }

        }, this);

        if (Jasteroids.CollisionDetector.isItemCollidingWithMissile(this.model.spaceShip, this.model.missile)) {
            shipDeath();
        }
    }
};

Jasteroids.PositionController.prototype.isSpaceShipMortal = function () {
    return this.model.spaceShip != null && this.model.spaceShip.getAge() > Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE;
};