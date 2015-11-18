var Jasteroids = Jasteroids || {};

Jasteroids.Asteroid = function (vertices) {
    Jasteroids.FloatingObject.call(this);

    this.polygon = new Jasteroids.Polygon2D(vertices);
    this.angularVelocity = 0;
    this.size = 3;
};

Jasteroids.Asteroid.prototype = Object.create(Jasteroids.FloatingObject.prototype);

Jasteroids.Asteroid.prototype.constructor = Jasteroids.Asteroid;

Jasteroids.Asteroid.prototype.getPolygon = function () {
    return this.polygon;
};

Jasteroids.Asteroid.prototype.getSize = function () {
    return this.size;
};

Jasteroids.Asteroid.prototype.setSize = function (size) {
    this.size = size;
};

Jasteroids.Asteroid.prototype.setAngularVelocity = function (angularVelocity) {
    this.angularVelocity = angularVelocity;
};

Jasteroids.Asteroid.prototype.getAngularVelocity = function () {
    return this.angularVelocity;
};

Jasteroids.Asteroid.prototype.rotate = function() {
    var midPoint = this.polygon.getMidPoint();
    this.polygon.rotate(midPoint, this.angularVelocity);
};

Jasteroids.Asteroid.prototype.onUpdate = function() {
    this.rotate();
};