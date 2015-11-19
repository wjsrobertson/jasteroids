var Jasteroids = Jasteroids || {};

Jasteroids.RotatingLine = function (line, angularVelocity, velocity) {
    Jasteroids.Line2D.call(this, line.getStart(), line.getEnd());

    this.angularVelocity = angularVelocity;
    this.velocity = velocity;
};

Jasteroids.RotatingLine.prototype = Object.create(Jasteroids.Line2D.prototype);

Jasteroids.RotatingLine.prototype.constructor = Jasteroids.RotatingLine;

Jasteroids.RotatingLine.prototype.update = function() {
    this.rotate(this.getMidPoint(), this.angularVelocity);

    this.getStart().add(this.velocity);
    this.getEnd().add(this.velocity);
};

