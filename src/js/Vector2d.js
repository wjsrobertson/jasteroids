var Jasteroids = Jasteroids || {};

Jasteroids.Vector2D = function (x, y) {
    this.x = x;
    this.y = y;
};

Jasteroids.Vector2D.prototype.set = function (other) {
    if (! Jasteroids.hasValue(other)) {
        return;
    }

    this.x = other.x;
    this.y = other.y;
};

Jasteroids.Vector2D.prototype.setXY = function (x, y) {
    if (! Jasteroids.hasValue(x) || ! Jasteroids.hasValue(y)) {
        return;
    }

    this.x = x;
    this.y = y;
};

Jasteroids.Vector2D.prototype.add = function (other) {
    if (! Jasteroids.hasValue(other)) {
        return;
    }

    this.x += other.getX();
    this.y += other.getY();
};

Jasteroids.Vector2D.prototype.subtract = function (other) {
    if (! Jasteroids.hasValue(other)) {
        return;
    }

    this.x -= other.x;
    this.y -= other.y;
};

Jasteroids.Vector2D.prototype.clone = function () {
    return new Jasteroids.Vector2D(this.x, this.y);
};

Jasteroids.Vector2D.prototype.scaleBy = function (scale) {
    if (! Jasteroids.hasValue(scale)) {
        return;
    }

    this.x *= scale;
    this.y *= scale;
};

Jasteroids.Vector2D.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Jasteroids.Vector2D.prototype.truncate = function (maxLength) {
    if (! Jasteroids.hasValue(maxLength)) {
        return;
    }

    var length = this.magnitude();

    if (length > 0 && length > maxLength) {
        this.scaleBy(maxLength / length);
    }
};

Jasteroids.Vector2D.prototype.normalise = function () {
    this.truncate(1);
};

Jasteroids.Vector2D.prototype.dotProduct = function (vector) {
    if (! Jasteroids.hasValue(vector)) {
        return;
    }

    return this.x * vector.x + this.y * vector.y;
};

Jasteroids.Vector2D.prototype.interpolate = function (ratio, vector) {
    if (! Jasteroids.hasValue(ratio) || ! Jasteroids.hasValue(ratio)) {
        return;
    }

    this.x = this.x + (ratio * (vector.x - this.x));
    this.y = this.y + (ratio * (vector.y - this.y));
};

// TODO - do this inline without the clone
Jasteroids.Vector2D.prototype.distance = function (vector) {
    var copy = vector.clone();
    copy.subtract(this);
    return copy.magnitude();
};


// TODO - use this throughout instead of .x
Jasteroids.Vector2D.prototype.getX = function () {
    return this.x;
};

// TODO - use this throughout instead of .y
Jasteroids.Vector2D.prototype.getY = function () {
    return this.y;
};

Jasteroids.Vector2D.prototype.toString = function () {
    return "(" + this.getX() + "," + this.getY() + ")";
};

Jasteroids.Vector2D.prototype.isEqualTo = function(vector) {
    if (! Jasteroids.hasValue(vector)) {
        return false;
    }

    return Jasteroids.eq(this.getX(), vector.getX())
        && Jasteroids.eq(this.getY(), vector.getY())
};