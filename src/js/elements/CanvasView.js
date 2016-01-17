var Jasteroids = Jasteroids || {};

Jasteroids.CanvasView = function (canvas, model, bounds, apeshitColourProvider) {
    this.graphics = canvas.getContext("2d");
    this.model = model;
    this.bounds = bounds;
    this.apeshitColourProvider = apeshitColourProvider;
    this.spaceShipShape = new Jasteroids.SpaceShip();
    this.spaceShipWidth = this.spaceShipShape.getPolygon().getBoundingRectangle().getWidth();
};

Jasteroids.CanvasView.prototype.draw = function () {
    this._clearBackground();

    this._drawStars();
    this._drawLives();
    this._drawScore();
    this._drawAsteroids();
    this._drawSaucer();
    this._drawSpaceShip();
    this._drawExplosions();
    this._drawMissile(this.model.missile);
    this._drawMissile(this.model.saucerMissile);
};

Jasteroids.CanvasView.prototype._getBackgroundColour = function() {
    return "#000000";
};

Jasteroids.CanvasView.prototype._getForegroundColour = function() {
    if (this.model.apeshitMode) {
        return this.apeshitColourProvider.nextColour();
    } else {
        return "#FFFFFF";
    }
};

Jasteroids.CanvasView.prototype._clearBackground = function clearBackground() {
    var g = this.graphics;

    g.fillStyle = this._getBackgroundColour();
    g.strokeStyle = this._getBackgroundColour();
    g.fillRect(0, 0, this.bounds.width, this.bounds.height);
};

Jasteroids.CanvasView.prototype._drawStars = function () {
    var g = this.graphics;

    g.fillStyle = this._getForegroundColour();
    g.strokeStyle = this._getForegroundColour();
    this.model.stars.forEach(function (star) {
        g.beginPath();
        g.arc(star.getPosition().getX(), star.getPosition().getY(), star.getRadius(), 0, 2 * Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
    });
};

Jasteroids.CanvasView.prototype._drawLives = function () {
    var g = this.graphics;

    var gap = 16;
    for(var i=0 ; i<this.model.livesRemaining ; i++) {
        var xPosition = gap + (i * (this.spaceShipWidth + gap/2));
        var yPosition = 50;

        g.strokeStyle = this._getBackgroundColour();
        g.fillStyle = this._getForegroundColour();
        this.spaceShipShape.setPosition(new Jasteroids.Vector2D(xPosition, yPosition));
        this._drawFloatingObject(this.spaceShipShape);
        g.stroke();
        g.fill();
    }
};

Jasteroids.CanvasView.prototype._drawScore = function () {
    var g = this.graphics;

    g.font = "30px Monospace";
    this.graphics.fillStyle = this._getForegroundColour();
    g.fillText(this.model.score,10,30);
    this.graphics.strokeStyle = this._getBackgroundColour();
    g.strokeText(this.model.score,10,30);
};

Jasteroids.CanvasView.prototype._drawAsteroids = function () {
    var g = this.graphics;

    for(i=0 ; i<this.model.asteroids.length ; i++) {
        var asteroid = this.model.asteroids[i];
        g.strokeStyle = this._getForegroundColour();
        g.fillStyle = this._getBackgroundColour();
        this._drawFloatingObject(asteroid);
        g.stroke();
        g.fill();
    }
};

Jasteroids.CanvasView.prototype._drawSaucer = function () {
    var g = this.graphics;

    if (this.model.saucer) {
        g.fillStyle = this._getForegroundColour();
        g.strokeStyle = this._getBackgroundColour();
        this._drawFloatingObject(this.model.saucer);
        g.stroke();
        g.fill();
    }
};

Jasteroids.CanvasView.prototype._drawSpaceShip = function () {
    var g = this.graphics;

    if (this.model.spaceShip) {
        g.strokeStyle = this._getBackgroundColour();
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
            g.fillStyle = this._getForegroundColour();
        }

        this._drawFloatingObject(this.model.spaceShip);
        g.stroke();
        g.fill();
    }
};

Jasteroids.CanvasView.prototype._drawExplosions = function () {
    this.model.explosions.forEach(function(explosion){
        explosion.rotatingLines.forEach(function(explosionLine) {
            this.graphics.strokeStyle = this._getForegroundColour();
            this.graphics.fillStyle = this._getForegroundColour();
            this.graphics.beginPath();
            this.graphics.moveTo(explosion.getPosition().getX() + explosionLine.getStart().getX(), explosion.getPosition().getY() + explosionLine.getStart().getY());
            this.graphics.lineTo(explosion.getPosition().getX() + explosionLine.getEnd().getX(), explosion.getPosition().getY() + explosionLine.getEnd().getY());
            this.graphics.closePath();
            this.graphics.stroke();
            this.graphics.fill();
        }, this);
    }, this);
};

Jasteroids.CanvasView.prototype._drawMissile = function (missile) {
    var g = this.graphics;

    if (missile) {
        this.graphics.strokeStyle = this._getForegroundColour();
        this.graphics.fillStyle = this._getForegroundColour();
        g.beginPath();
        g.arc(missile.getPosition().getX(), missile.getPosition().getY(), 1, 0, 2 * Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
    }
};

Jasteroids.CanvasView.prototype._drawFloatingObject = function(floatingObject) {
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