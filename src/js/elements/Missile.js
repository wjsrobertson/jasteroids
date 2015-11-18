var Jasteroids = Jasteroids || {};

Jasteroids.Missile = function () {
    Jasteroids.FloatingObject.call(this);
    this.age = 0;
};

Jasteroids.Missile.prototype = Object.create(Jasteroids.FloatingObject.prototype);
Jasteroids.Missile.prototype.constructor = Jasteroids.Missile;

Jasteroids.Missile.prototype.onUpdate = function() {
    this.age = this.age + 1;
};

Jasteroids.Missile.prototype.getAge = function() {
    return this.age;
};

