var Jasteroids = Jasteroids || {};

Jasteroids.SaucerController = function (model, bounds, soundPlayer) {
    this.model = model;
    this.bounds = bounds;
    this.soundPlayer = soundPlayer;
};

Jasteroids.SaucerController.prototype.tick = function () {
    this._createSaucerRandomly();
    this._fireSaucerMissileRandomly();
};

Jasteroids.SaucerController.prototype._createSaucerRandomly = function () {
    if (this.model.saucer == null
        && this.model.gameInProgress
        && Jasteroids.random(1, Jasteroids.Settings.SAUCER_ACTIVITY) == 1) {

        var type = this._getRandomType();
        var position = this._getStartPositionForType(type);

        this.model.saucer = new Jasteroids.FlyingSaucer(position, type);
        this.soundPlayer.playSaucerSound();
    }
};

Jasteroids.SaucerController.prototype._getRandomType = function () {
    if (Jasteroids.random(1, 2) == 2) {
        return Jasteroids.FlyingSaucer.TYPE.RIGHT;
    } else {
        return Jasteroids.FlyingSaucer.TYPE.LEFT;
    }
};

Jasteroids.SaucerController.prototype._getStartPositionForType = function (type) {
    if (type == Jasteroids.FlyingSaucer.TYPE.RIGHT) {
        return new Jasteroids.Vector2D(this.bounds.getWidth() - 1, 30);
    } else {
        return new Jasteroids.Vector2D(0, 30);
    }
};

Jasteroids.SaucerController.prototype._fireSaucerMissileRandomly = function () {
    if (this.model.saucer != null
        && this.model.spaceShip
        && this.model.saucerMissile == null
        && this.model.saucer.getAge() > Jasteroids.Settings.SAUCER_AGE_BEFORE_SHOOTING
        && Jasteroids.random(1, 100) <= Jasteroids.Settings.SAUCER_MISSILE_ACTIVITY) {

        this.model.saucerMissile = this._createSaucerMissile();
        this.soundPlayer.playShootSound();
    }
};

Jasteroids.SaucerController.prototype._createSaucerMissile = function () {
    var missile = new Jasteroids.Missile();
    missile.setPosition(this.model.saucer.getPosition().clone());
    var velocity = this.model.spaceShip.getPosition().clone();
    velocity.subtract(this.model.saucer.getPosition().clone());
    velocity.normalise();
    velocity.scaleBy(Jasteroids.Settings.SAUCER_MISSILE_MAX_SPEED);
    missile.setVelocity(velocity);

    return missile;
};