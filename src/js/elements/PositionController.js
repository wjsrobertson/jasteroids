var Jasteroids = Jasteroids || {};

Jasteroids.PositionController = function (model, bounds, notifyListeners) {
    this.model = model;
    this.bounds = bounds;
    this._notifyListeners = notifyListeners;
};

Jasteroids.PositionController.prototype.updateFloatingObjects = function () {
    if (this.model.missile) {
        this.model.missile.update();
        this._correctPosition(missile);
        if (this.model.missile.getAge() > Jasteroids.Settings.MISSLE_MAX_AGE_SHIP) {
            this.model.missile = null;
        }
    }

    if (this.model.saucerMissile) {
        this.model.saucerMissile.update();
        if (this.model.saucerMissile.getAge() > Jasteroids.Settings.MISSLE_MAX_AGE_SAUCER) {
            this.model.saucerMissile = null;
        }
    }

    for (var i = 0; i < this.model.asteroids.length; i++) {
        var asteroid = this.model.asteroids[i];
        asteroid.update();
        this._correctPosition(asteroid);
    }

    this.model.explosions.forEach(function (explosion, index) {
        explosion.update();
        if (explosion.getAge() > Jasteroids.Settings.EXPLOSION_MAX_AGE) {
            this.model.explosions[i].splice(index, 1);
        }
        this._correctPosition(explosion);
    }, this);

    if (this.model.saucer) {
        this.model.saucer.update();

        if (saucer.getPosition().getX() > this.bounds.gameMaxX) {
            this.model.saucer = null;
        } else if (saucer.getPosition().getX() < this.bounds.gameMinX) {
            this.model.saucer = null;
        }
    }

    if (this.model.spaceShip) {
        this.model.spaceShip.update();
        this._correctPosition(this.model.spaceShip);
        if ( spaceShip.getAge() == Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE ) {
            this._notifyListeners(Jasteroids.EventTypes.SHIP_MORTAL);
        }
    } else {
        this.model.createShipTimer = this.model.createShipTimer + 1;
        if (this.model.createShipTimer > Jasteroids.Settings.CREATE_SHIP_WAIT && this.model.livesRemaining > 0) {
            this._initSpaceShip();
        }
    }
};

Jasteroids.PositionController.prototype._correctPosition = function (object) {
    var position = object.getPosition();

    if (position.getX() > this.bounds.gameMaxX) {
        position.setX(this.bounds.gameMinX);
    } else if (position.getX() < this.bounds.gameMinX) {
        position.setX(this.bounds.gameMaxX);
    }

    if (position.getY() > this.bounds.gameMaxY) {
        position.setY(this.bounds.gameMinY);
    } else if (position.getY() < this.bounds.gameMinY) {
        position.setY(this.bounds.gameMaxY);
    }
};

