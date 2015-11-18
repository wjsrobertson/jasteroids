var Jasteroids = Jasteroids || {};

Jasteroids.Polygon2D = function (vertices) {
    if (! Jasteroids.hasValue(vertices)) {
        throw new Error("Polygod2D requires vertices");
    }

    this.vertices = vertices;
    this.triangles = [];
    this.edges = [];
    this.boundingRectangle = null;
    this.gradient = 0;
    this.yOffset = 0;
    this.midPoint = null;

    this._flagAsModified();
};

Jasteroids.Polygon2D.prototype = {
    getBoundingRectangle: function () {
        this._generateBoundingRectangle();

        return this.boundingRectangle;
    },

    getMidPoint: function () {
        this._recalculateMidPoint();

        return this.midPoint;
    },

    getEdges: function () {
        this._generateEdges();

        return this.edges;
    },

    getTriangles: function () {
        this._calculateTriangles();

        return this.triangles;
    },

    getVertices: function () {
        return this.vertices;
    },

    translate: function (offset) {
        this.vertices.forEach(
            function (vertex) {
                vertex.add(offset);
            }
        );

        this._flagAsModified();
    },

    addVertex: function (vertex) {
        this.vertices.push(vertex);

        this._flagAsModified();
    },

    containsVector: function (point) {
        var bounds = this.getBoundingRectangle();
        if (!bounds.containsVector(point)) {
            return false;
        }

        var verticalRay = new Jasteroids.Line2D(
            point, new Jasteroids.Vector2D(point.x, Infinity)
        );
        var intersectionCount = 0;
        var contains = false;

        this._generateEdges();

        this.edges.forEach(
            function (testLine) {
                var maxY = Math.max(testLine.getStart().x, testLine.getEnd().x);
                var minY = Math.min(testLine.getStart().y, testLine.getEnd().y);

                if (testLine.getGradient() === Infinity) {
                    if (point.getX() == testLine.getStart().getX()
                        && point.getY() >= minY
                        && point.getY() <= maxY) {
                        contains = true;
                    }
                } else {
                    if (verticalRay.intersectsLine(testLine)) {
                        intersectionCount++;
                    }
                }
            }
        );

        return (contains || (intersectionCount % 2 == 1));
    },

    rotate: function (point, angle) {
        var theta = -angle;
        this.vertices.forEach(
            function (vertex) {
                // translate to origin
                var tmpX = vertex.getX() - point.getX();
                var tmpY = vertex.getY() - point.getY();

                // rotate
                var sin = Math.sin(theta);
                var cos = Math.cos(theta);

                var newX = tmpX * cos - tmpY * sin;
                var newY = tmpX * sin + tmpY * cos;

                // translate back to old location
                newX += point.getX();
                newY += point.getY();

                // set the point to be where we calculated it should be
                vertex.setXY(newX, newY);
            }
        );

        this._flagAsModified();
    },

    intersectsLine: function (line) {
        /*
        TODO - optimisation - bounding rectangle does not yet support 0 width, so horizontal line intersection detection is wrong

        var bounds = this.getBoundingRectangle();
        if (!bounds.intersectsRectangle(line.getBoundingRectangle())) {
            return false;
        }
        */

        var edges = this.getEdges();
        var intersects = false;
        edges.forEach(
            function(edge) {
                if (edge.intersectsLine(line)) {
                    intersects = true;
                }
            }
        );

        return intersects || contains(line.getStart()) || contains(line.getEnd());
    },

    intersectsPolygon: function (polygon) {
        var bounds = this.getBoundingRectangle();
        if (!bounds.intersectsRectangle(polygon.getBoundingRectangle())) {
            return false;
        }

        var edges = this.getEdges();
        var otherEdges = polygon.getEdges();
        var intersects = false;
        edges.forEach(
            function(edge) {
                otherEdges.forEach(
                    function(otherEdge) {
                        if (edge.intersectsLine(otherEdge)) {
                            intersects = true;
                        }
                    }
                );
            }
        );

        return intersects;
    },

    _calculateTriangles: function () {
        if (!this._triangulationChanged) {
            return false;
        }
        if (this.vertices < 2) {
            return;
        }

        var triangles = [];
        var midPoint = this.getMidPoint();
        for (var i=1; i<this.vertices.length ; i++) {
            var previousVertex = this.vertices[i-1];
            var vertex = this.vertices[i];

            var triangle = new Jasteroids.Triangle2D(previousVertex, midPoint, vertex);
            triangles.push(triangle);
        }

        var lastVertex = this.vertices[this.vertices.length - 1];
        var firstVertex = this.vertices[0];
        triangle = new Jasteroids.Triangle2D(lastVertex, midPoint, firstVertex);
        triangles.push(triangle);

        this.triangles = triangles;
        this._triangulationChanged = false;
    },

    _generateBoundingRectangle: function () {
        if (!this._boundsChanged) {
            return;
        }
        if (this.vertices < 2) {
            return;
        }

        var minX = this.vertices[0].getX();
        var maxX = this.vertices[0].getX();
        var minY = this.vertices[0].getY();
        var maxY = this.vertices[0].getY();

        this.vertices.forEach(function (vertex) {
            minX = Math.min(minX, vertex.getX());
            maxX = Math.max(maxX, vertex.getX());
            minY = Math.min(minY, vertex.getY());
            maxY = Math.max(maxY, vertex.getY());
        });

        this.boundingRectangle = new Jasteroids.BoundingRectangle(
            minX, minY, Math.abs(maxX - minX), Math.abs(maxY - minY)
        );

        this._boundsChanged = false;
    },

    _generateEdges: function () {
        if (!this._edgesChanged) {
            return;
        }
        if (this.vertices.length < 2) {
            return;
        }

        var edges = [];
        for (var i = 1; i < this.vertices.length; i++) {
            var start = this.vertices[i - 1];
            var end = this.vertices[i];
            var edge = new Jasteroids.Line2D(start, end);
            edges.push(edge);
        }

        var lastVertex = this.vertices[this.vertices.length - 1];
        var firstVertex = this.vertices[0];
        var lastEdge = new Jasteroids.Line2D(lastVertex, firstVertex);
        edges.push(lastEdge);

        this.edges = edges;
        this._edgesChanged = false;
    },

    _flagAsModified: function () {
        this._edgesChanged = true;
        this._boundsChanged = true;
        this._triangulationChanged = true;
        this._midPointRecalculationRequired = true;
    },

    _recalculateMidPoint: function () {
        if (!this._midPointRecalculationRequired) {
            return;
        }

        var x = 0;
        var y = 0;

        this.vertices.forEach(
            function (vertex) {
                x += vertex.getX();
                y += vertex.getY();
            }
        );

        this.midPoint = new Jasteroids.Vector2D(x / this.vertices.length, y / this.vertices.length);

        this._midPointRecalculationRequired = false;
    }

};