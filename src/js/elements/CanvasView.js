var Jasteroids = Jasteroids || {};

Jasteroids.CanvasView = function (canvas, model, bounds) {
    this.graphics = canvas.getContext("2d");
    this.model = model;
    this.bounds = bounds;
};

Jasteroids.CanvasView.prototype.draw = function () {
    var g = this.graphics;

    // clear background
    g.fillStyle = "#000000";
    g.strokeStyle = "#000000";
    g.fillRect(0, 0, this.bounds.width, this.bounds.height);

    // draw stars
    g.fillStyle = "#FFFFFF";
    g.strokeStyle = "#FFFFFF";
    this.model.stars.forEach(function (star) {
        g.beginPath();
        g.arc(star.getPosition().getX(), star.getPosition().getY(), star.getRadius(), 0, 2 * Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
    });

    // draw asteroids
    for(var i=0 ; i<this.model.asteroids.length ; i++) {
        var asteroid = this.model.asteroids[i];
        g.strokeStyle = "#FFFFFF";
        g.fillStyle = "#000000";
        this.drawFloatingObject(asteroid);
        g.stroke();
        g.fill();
    }

    // draw spaceship
    if (this.model.spaceShip) {
        g.strokeStyle = "#000000";
        g.fillStyle = "#FFFFFF";
        this.drawFloatingObject(this.model.spaceShip);
        g.stroke();
        g.fill();
    }

    // draw explosions
    this.model.explosions.forEach(function(explosion){
        explosion.rotatingLines.forEach(function(explosionLine) {
            this.graphics.strokeStyle = "#FFFFFF";
            this.graphics.fillStyle = "#FFFFFF";
            this.graphics.beginPath();
            this.graphics.moveTo(explosion.getPosition().getX() + explosionLine.getStart().getX(), explosion.getPosition().getY() + explosionLine.getStart().getY());
            this.graphics.lineTo(explosion.getPosition().getX() + explosionLine.getEnd().getX(), explosion.getPosition().getY() + explosionLine.getEnd().getY());
            this.graphics.closePath();
            this.graphics.stroke();
            this.graphics.fill();
        }, this);
    }, this);

    // draw missile
    if (this.model.missile) {
        this.graphics.strokeStyle = "#FFFFFF";
        this.graphics.fillStyle = "#FFFFFF";
        g.beginPath();
        g.arc(this.model.missile.getPosition().getX(), this.model.missile.getPosition().getY(), 1, 0, 2 * Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
    }

};

Jasteroids.CanvasView.prototype.drawFloatingObject = function(floatingObject) {
    if (! floatingObject) {
        return;
    }

    var vertices = floatingObject.getPolygon().getVertices();
    this.graphics.beginPath();
    this.graphics.moveTo(floatingObject.getPosition().getX() + vertices[0].getX(), floatingObject.getPosition().getY() + vertices[0].getY());
    vertices.forEach(function (vertex) {
        this.graphics.lineTo(floatingObject.getPosition().getX() + vertex.getX(), floatingObject.getPosition().getY() + vertex.getY());
    }, this);
    this.graphics.closePath();
};