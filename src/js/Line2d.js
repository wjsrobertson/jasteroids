var Jasteroids = Jasteroids || {};

Jasteroids.Line2D = function (start, end) {
    this.start = start;
    this.end = end;
    this.boundingRectangle = new Jasteroids.BoundingRectangle();
    this.gradient = 0;
    this.yOffset = 0;
    this.recalculationRequired = true;
    this.midPoint = new Jasteroids.Vector2D();
};

Jasteroids.Line2D.prototype._recalculateIfRequired = function () {
    if (this.recalculationRequired) {
        this._recalculate();
    }
}

Jasteroids.Line2D.prototype._recalculate = function () {
    this._recalculateBoundingRectangle();
    this._recalculateGradient();
    this._recalculateMidPoint();

    this.recalculationRequired = false;
};

Jasteroids.Line2D.prototype._recalculateBoundingRectangle = function () {
    if (this.start === undefined || this.end === undefined) {
        return;
    }

    var minX = Math.min(this.start.x, this.end.x);
    var maxX = Math.max(this.start.x, this.end.x);
    var minY = Math.min(this.start.y, this.end.y);
    var maxY = Math.max(this.start.y, this.end.y);

    this.boundingRectangle = new Jasteroids.BoundingRectangle(minX, minY, Math.abs(maxX - minX), Math.abs(maxY - minY));
};

Jasteroids.Line2D.prototype._recalculateMidPoint = function () {
    this.midPoint.set(this.start);
    this.midPoint.add(this.end);
    this.midPoint.scaleBy(0.5);
};

Jasteroids.Line2D.prototype._recalculateGradient = function () {
    if (this.start && this.end) {
        if (this.start.x == this.end.x) {
            this.gradient = Infinity;
            this.yOffset = 0;
        } else {
            this.gradient = (this.start.y - this.end.y) / (this.start.x - this.end.x);
            this.yOffset = this.start.y - this.gradient * this.start.x;
        }
    }
};

Jasteroids.Line2D.prototype.getYOffset = function () {
    this._recalculateIfRequired();
    return this.yOffset;
};

Jasteroids.Line2D.prototype.getGradient = function () {
    this._recalculateIfRequired();
    return this.gradient;
}

Jasteroids.Line2D.prototype.getMidPoint = function () {
    this._recalculateIfRequired();
    return this.midPoint;
}

Jasteroids.Line2D.prototype.getBoundingRectangle = function () {
    this._recalculateIfRequired();
    return this.boundingRectangle;
}

Jasteroids.Line2D.prototype.containsVector = function (v) {
    this._recalculateIfRequired();

    if (this.gradient === Infinity) {
        if (v.x === this.start.x) {
            return true;
        }
    } else {
        var yIntersect = this.gradient * v.x + this.yOffset;

        return (v.y > yIntersect - Jasteroids.epsilon && v.y < yIntersect + Jasteroids.epsilon);
    }

    return false;
}

Jasteroids.Line2D.prototype.intersectsWithLine = function (line) {
    this._recalculateIfRequired();

    var xTestMin = Math.min(this.start.x, this.end.x);
    var xTestMax = Math.max(this.start.x, this.end.x);
    var yTestMin = Math.min(this.start.y, this.end.y);
    var yTestMax = Math.max(this.start.y, this.end.y);
    var xMin = Math.min(line.start.x, line.end.x);
    var xMax = Math.max(line.start.x, line.end.x);
    var yMin = Math.min(line.start.y, line.end.y);
    var yMax = Math.max(line.start.y, line.end.y);
    var testGradient = line.getGradient();
    var testYOffset = line.getYOffset();

    // special case 1) both lines are vertical
    if (this.gradient === Infinity && testGradient === Infinity) {
        if (Jasteroids.eq(this.start.x, line.start.x)) {
            if (Jasteroids.eq(yMin, yTestMin)) {
                return true;
            } else if (yMin <= yTestMin) {
                return (yMax >= yTestMin);
            } else {
                return (yTestMax >= yMin);
            }
        } else {
            return false; // the lines are parallel and never meet
        }
    }

    // special case 2) both lines are horizontal
    if (this.gradient === 0 && testGradient === 0) {
        if (Jasteroids.eq(this.start.y, line.start.y)) {
            if (Jasteroids.eq(xMin, xTestMin)) {
                return true;
            } else if (xMin <= xTestMin) {
                return (xMax >= xTestMin);
            } else {
                return (xTestMax >= xMin);
            }
        } else {
            return false; // the lines are parallel and never meet
        }
    }

    // For the remaining cases, calculate the intersection point then see if it's within the bounds of the lines
    var x;
    var y;
    if (this.gradient === Infinity) { // special case 3) this line has infinite gradient, test line doesn't
        x = this.start.x;
        y = (testGradient * x) + testYOffset;
    } else if (testGradient === Infinity) { // special case 4) test line has infinite gradient, this line doesn't
        x = line.start.x;
        y = (this.gradient * x) + this.yOffset;
    } else {
        x = (testYOffset - this.yOffset) / (this.gradient - testGradient); // X = (c2 - c1) / (m1 - m2)
        y = (this.gradient * x) + this.yOffset; // Y = c1 + m1 * X
    }

    return (y >= yTestMin && y <= yTestMax)
        && (y >= yMin && y <= yMax)
        && (x >= xTestMin && x <= xTestMax)
        && (x >= xMin && x <= xMax);
};

Jasteroids.Line2D.prototype._rotateVector = function (vector, x, y, angle) {

}

Jasteroids.Line2D.prototype.rotate = function (x, y, angle) {
    var theta = -angle;

    /*
     start point first
     */

    // translate to origin
    var tmpX = this.start.x - x;
    var tmpY = this.start.y - y;
    // rotate
    var sin = Math.sin(theta);
    var cos = Math.cos(theta);
    var newX = tmpX * cos - tmpY * sin;
    var newY = tmpX * sin + tmpY * cos;
    // translate back to old location
    newX += x;
    newY += y;

    // set the point to be where we calculated it should be
    this.start.setXY(newX,newY);

    /*
     now do the end point
     */

    // translate to origin
    tmpX = this.end.x - x;
    tmpY = this.end.y - y;
    // rotate
    sin = Math.sin(theta);
    cos = Math.cos(theta);
    newX = tmpX * cos - tmpY * sin;
    newY = tmpX * sin + tmpY * cos;
    // translate back to old location
    newX += x;
    newY += y;

    // set the point to be where we calculated it should be
    this.end.setXY(newX,newY);

    this.recalculationRequired = true;
};