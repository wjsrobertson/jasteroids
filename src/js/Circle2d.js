var Jasteroids = Jasteroids || {};

Jasteroids.Circle2D = function (center, radius) {
    this.centre = centre;
    this.radius = radius;
    this._boundsChanged = true;
    this.boundingRectangle = new Jasteroids.BoundingRectangle();
};

Jasteroids.Circle2D.prototype = {
    getBoundingRectangle: function() {
        return this.boundingRectangle;
    },

    getCentre: function() {
        return this.centre;
    },

    getRadius: function() {
        return this.radius;
    },

    containsVector: function(point) {
        return this.boundingRectangle.containsVector(point);
    },

    intersectsLine: function(line) {
        return this.boundingRectangle.intersectsRectangle(line.getBoundingRectangle());
    },

    intersectsCircle: function(circle) {
        if (! this.boundingRectangle.intersectsCircle(circle.getBoundingRectangle())) {
            return false;
        }

        return (this.radius + circle.getRadius()) > this.center.distance( circle.getCentre() );
    }
};