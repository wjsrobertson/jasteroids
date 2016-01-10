var Jasteroids = Jasteroids || {};

Jasteroids.PositionController = function (model, bounds, notifyListeners) {
    this.model = model;
    this.bounds = bounds;
    this._notifyListeners = notifyListeners;
};

Jasteroids.PositionController.prototype.tick = function () {
    if (this.model.missile) {
        this.model.missile.update();
        this._correctPosition(missile);
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

