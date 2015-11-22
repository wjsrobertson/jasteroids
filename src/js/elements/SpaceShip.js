var Jasteroids = Jasteroids || {};

Jasteroids.SpaceShip = function () {
    Jasteroids.FloatingObject.call(this);

    this.setMaxSpeed(Jasteroids.Settings.SPACE_SHIP_MAX_SPEED);
    this.age = 0;
    this.rotation = Math.PI;
    this.thrust = new Jasteroids.Vector2D(0, 0);

    var vertices = [
        new Jasteroids.Vector2D(0, -2 * Jasteroids.Settings.SPACE_SHIP_SCALE), // nose
        new Jasteroids.Vector2D(-Jasteroids.Settings.SPACE_SHIP_SCALE, 2 * Jasteroids.Settings.SPACE_SHIP_SCALE), // base left
        new Jasteroids.Vector2D(0, 1.5 * Jasteroids.Settings.SPACE_SHIP_SCALE), // booster
        new Jasteroids.Vector2D(Jasteroids.Settings.SPACE_SHIP_SCALE, 2 * Jasteroids.Settings.SPACE_SHIP_SCALE) // base right
    ];
    this.polygon = new Jasteroids.Polygon2D(vertices);
};

Jasteroids.SpaceShip.prototype = Object.create(Jasteroids.FloatingObject.prototype);

Jasteroids.SpaceShip.prototype.constructor = Jasteroids.SpaceShip;

Jasteroids.SpaceShip.prototype.onUpdate = function () {
    this.age = this.age + 1;
};

Jasteroids.SpaceShip.prototype.getAge = function () {
    return this.age;
};

Jasteroids.SpaceShip.prototype.getDirection = function () {
    var direction = new Jasteroids.Vector2D(-1 * Math.sin(this.rotation), Math.cos(this.rotation));
    direction.normalise();

    return direction;
};

Jasteroids.SpaceShip.prototype.getRotation = function () {
    return this.rotation.clone();
};

Jasteroids.SpaceShip.prototype.getPolygon = function () {
    return this.polygon;
};

Jasteroids.SpaceShip.prototype.forwardThrust = function () {
    this.thrust.setXY(
        -Jasteroids.Settings.SPACE_SHIP_THRUST * Math.sin(this.rotation),
        Jasteroids.Settings.SPACE_SHIP_THRUST * Math.cos(this.rotation)
    );
    this.impulseForce(this.thrust);
};

Jasteroids.SpaceShip.prototype.reverseThrust = function () {
    this.thrust.setXY(
        Jasteroids.Settings.SPACE_SHIP_REVERSE_THRUST * Math.sin(this.rotation),
        -Jasteroids.Settings.SPACE_SHIP_REVERSE_THRUST * Math.cos(this.rotation)
    );
    this.impulseForce(this.thrust);
};

Jasteroids.SpaceShip.prototype.rotate = function(angle) {
    this.rotation = this.rotation - angle;

    this.polygon.rotate(
        this.polygon.getMidPoint(),
        angle
    );
};