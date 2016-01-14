var Jasteroids = Jasteroids || {};

Jasteroids.CanvasView = function (canvas, model, bounds) {
    this.graphics = canvas.getContext("2d");
    this.model = model;
    this.bounds = bounds;
};

Jasteroids.CanvasView.prototype.draw = function () {
    var g = this.graphics;

    g.fillStyle = "#000000";
    g.strokeStyle = "#000000";
    g.fillRect(0, 0, this.bounds.width, this.bounds.height);

    g.fillStyle = "#FFFFFF";
    g.strokeStyle = "#FFFFFF";
    this.model.stars.forEach(function (star) {
        g.beginPath();
        g.arc(star.getPosition().getX(), star.getPosition().getY(), star.getRadius(), 0, 2 * Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
    });

    this.model.asteroids.forEach(function (asteroid) {
        g.beginPath();

        var vertices = asteroid.getPolygon().getVertices();
        g.moveTo(asteroid.getPosition().getX() + vertices[0].getX(), asteroid.getPosition().getY() + vertices[0].getY());
        vertices.forEach(function (vertex) {
            g.lineTo(asteroid.getPosition().getX() + vertex.getX(), asteroid.getPosition().getY() + vertex.getY());
        });
        g.closePath();

        g.strokeStyle = "#000000";
        g.stroke();

        g.fillStyle = "#FFFFFF";
        g.fill();
    });

};