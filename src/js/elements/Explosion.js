var Jasteroids = Jasteroids || {};

Jasteroids.Explosion = function (rotatingLines) {
    Jasteroids.FloatingObject.call(this);

    this.rotatingLines = rotatingLines;
    this.age = 0;
};

Jasteroids.Explosion.prototype = Object.create(Jasteroids.FloatingObject.prototype);

Jasteroids.Explosion.prototype.constructor = Jasteroids.Explosion;

Jasteroids.Explosion.prototype.onUpdate = function() {
    this.age = this.age + 1;

    this.rotatingLines.forEach(function(line) {
        line.update();
    });
};

Jasteroids.Explosion.prototype.getAge = function() {
    return this.age;
};

Jasteroids.Explosion.prototype.getRotatingLines = function() {
    return this.rotatingLines;
};


