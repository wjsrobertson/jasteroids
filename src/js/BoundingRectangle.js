var Jasteroids = Jasteroids || {};

Jasteroids.BoundingRectangle = function (x, y, height, width) {
    this.position = new Jasteroids.Vector2D();
    this.set(x, y, height, width);
}

Jasteroids.BoundingRectangle.prototype = {
    set: function (x, y, height, width) {
        this.position.x = x;
        this.position.y = y
        this.height = height;
        this.width = width;
    },

    containsVector: function (vector) {
        return vector.x > this.position.x
            && vector.y > this.position.y
            && vector.x < (this.position.x + this.width)
            && vector.y < (this.position.y + this.height);
    },

    intersectsRectangle: function (rectangle) {
        return !( this.position.x >= rectangle.position.x + rectangle.width
            || rectangle.position.x >= this.position.x + this.width
            || this.position.y >= rectangle.position.y + this.height
            || rectangle.position.y >= this.position.y + this.height );
    }
}
