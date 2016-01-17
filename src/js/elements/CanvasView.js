var Jasteroids = Jasteroids || {};

Jasteroids.CanvasView = function (canvas, model, bounds) {
    this.graphics = canvas.getContext("2d");
    this.model = model;
    this.bounds = bounds;
    this.spaceShipShape = new Jasteroids.SpaceShip();
    this.spaceShipWidth = this.spaceShipShape.getPolygon().getBoundingRectangle().getWidth();
};

Jasteroids.CanvasView.prototype.draw = function () {
    var g = this.graphics;

    // clear background
    this._clearBackground();

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

    // draw lives
    var gap = 16;
    for(var i=0 ; i<this.model.livesRemaining ; i++) {
        var xPosition = gap + (i * (this.spaceShipWidth + gap/2));
        var yPosition = 50;

        g.strokeStyle = "#000000";
        g.fillStyle = "#FFFFFF";
        this.spaceShipShape.setPosition(new Jasteroids.Vector2D(xPosition, yPosition));
        this.drawFloatingObject(this.spaceShipShape);
        g.stroke();
        g.fill();
    }

    // draw score
    g.font = "30px Monospace";
    this.graphics.fillStyle = "#FFFFFF";
    g.fillText(this.model.score,10,30);
    this.graphics.strokeStyle = "#000000";
    g.strokeText(this.model.score,10,30);

    // draw asteroids
    for(i=0 ; i<this.model.asteroids.length ; i++) {
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
        if (this.model.spaceShip.getAge() < Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE) {
            var ratio = (this.model.spaceShip.getAge() / Jasteroids.Settings.SPACE_SHIP_MORTAL_AGE);
            var brightestBeforeMortal = 200;
            var colourStrength = Math.floor(ratio * brightestBeforeMortal);
            var colourComponent = colourStrength.toString(16);
            if (colourComponent.length < 2) {
                colourComponent = "0" + colourComponent;
            }
            g.fillStyle = "#" + colourComponent + colourComponent + colourComponent;
        } else {
            g.fillStyle = "#FFFFFF";
        }

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

Jasteroids.CanvasView.prototype._clearBackground = function clearBackground() {
    var g = this.graphics;

    g.fillStyle = "#000000";
    g.strokeStyle = "#000000";
    g.fillRect(0, 0, this.bounds.width, this.bounds.height);
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