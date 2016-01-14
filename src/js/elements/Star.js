var Jasteroids = Jasteroids || {};

Jasteroids.Star = function (position, radius) {
    this.radius = radius;
    this.position = position;
};

Jasteroids.Star.prototype.getRadius = function() {
    return this.radius;
};

Jasteroids.Star.prototype.getPosition = function() {
    return this.position;
};
