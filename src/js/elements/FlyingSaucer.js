var Jasteroids = Jasteroids || {};

Jasteroids.FlyingSaucer = function (position, type) {
    Jasteroids.FloatingObject.call(this);
    this.setPosition(position);
    this.age = 0;
    this.type = type;
    this.setVelocity(new Jasteroids.Vector2D(this.type.xDirection * 3, 0));

    var scale = Jasteroids.Settings.SAUCER_SCALE;
    var vertices = [
        new Jasteroids.Vector2D(0, -2 * scale),   // tip
        new Jasteroids.Vector2D(-1 * scale, -1 * scale),
        new Jasteroids.Vector2D(-2 * scale, -1 * scale),   // base right
        new Jasteroids.Vector2D(-3 * scale, 0),   // base right
        new Jasteroids.Vector2D(-2 * scale, scale),   // base right
        new Jasteroids.Vector2D(0, scale),   // base right
        new Jasteroids.Vector2D(2 * scale, scale),   // base right
        new Jasteroids.Vector2D(3 * scale, 0),   // base right
        new Jasteroids.Vector2D(2 * scale, -1 * scale),   // base right
        new Jasteroids.Vector2D(scale, -1 * scale)
    ];

    this.polygon = new Jasteroids.Polygon2D(vertices);
};

Jasteroids.FlyingSaucer.prototype = Object.create(Jasteroids.FloatingObject.prototype);

Jasteroids.FlyingSaucer.prototype.constructor = Jasteroids.FlyingSaucer;

Jasteroids.FlyingSaucer.prototype.getPolygon = function () {
    return this.polygon;
};

Jasteroids.FlyingSaucer.prototype.getAge = function () {
    return this.age;
};

Jasteroids.FlyingSaucer.prototype.onUpdate = function () {
    this.age = this.age + 1;

    var y = 30 + 10 *  Math.sin(this.getPosition().getX()* 0.1);
    this.getPosition().setY(y);
};

Jasteroids.FlyingSaucer.TYPE = {
    LEFT: {xDirection: 1},
    RIGHT: {xDirection: -1}
};
