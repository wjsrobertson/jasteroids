var Jasteroids = Jasteroids || {};

Jasteroids.Polygon2d = function (start, end) {
    this.vertices = [];
    this.triangles = [];
    this.edges = [];
    this.boundingRectangle = new Jasteroids.BoundingRectangle();
    this.gradient = 0;
    this.yOffset = 0;
    this.recalculationRequired = true;
    this.midPoint = new Jasteroids.Vector2D();
};
