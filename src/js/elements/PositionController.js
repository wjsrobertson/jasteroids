var Jasteroids = Jasteroids || {};

Jasteroids.PositionController = function (model, bounds, notifyListeners) {
    this.model = model;
    this.bounds = bounds;
    this._notifyListeners = notifyListeners;
};

Jasteroids.PositionController.prototype.tick = function () {
    if (this.model.missile) {
        this.model.missile.update();
        this._correctPosition(this.model.missile);
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

        if (saucer.getPosition().getX() > this.bounds.width) {
            this.model.saucer = null;
        } else if (saucer.getPosition().getX() < 0) {
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

    if (position.getX() > this.bounds.width) {
        position.setX(0);
    } else if (position.getX() < 0) {
        position.setX(this.bounds.width);
    }

    if (position.getY() > this.bounds.height) {
        position.setY(0);
    } else if (position.getY() < 0) {
        position.setY(this.bounds.height);
    }
};

