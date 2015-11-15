var Jasteroids = Jasteroids || {};

Jasteroids.Triangle2D = function (a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this._boundsChanged = true;
    this.boundingRectangle = new Jasteroids.BoundingRectangle();
};

/*
 * TODO - all intersections just use the bounding rectangle, they should compute based on actual triangle edges
 */
Jasteroids.Triangle2D.prototype = {
    getBoundingRectangle: function () {
        this._recalculateIfRequired();
        return this.boundingRectangle;
    },

    containsVector: function (vector) {
        return this.getBoundingRectangle().containsVector(vector);
    },

    intersectsLine: function (line) {
        return this.getBoundingRectangle().intersectsRectangle(line.getBoundingRectangle());
    },

    intersectsTriangle: function (triangle) {
        return this.getBoundingRectangle().intersectsRectangle(triangle.getBoundingRectangle());
    },

    _recalculateIfRequired: function () {
        if (this._boundsChanged) {
            this._recalculate();
        }
    },

    _recalculate: function () {
        this._recalculateBoundingRectangle();
        this._boundsChanged = false;
    },

    _recalculateBoundingRectangle: function () {
        if (this.a === undefined || this.b === undefined || this.c === undefined) {
            return;
        }

        var minX = Math.min(this.a.x, this.b.x, this.c.x);
        var maxX = Math.max(this.a.x, this.b.x, this.c.x);
        var minY = Math.min(this.a.y, this.b.y, this.c.y);
        var maxY = Math.max(this.a.y, this.b.y, this.c.y);

        this.boundingRectangle = new Jasteroids.BoundingRectangle(minX, minY, Math.abs(maxX - minX), Math.abs(maxY - minY));

    }
};