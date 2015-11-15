describe("Line2D", function () {
    it("has mid point half way when horizontal", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 0), new Jasteroids.Vector2D(20, 0));
        var midPoint = line.getMidPoint();

        expect(midPoint.x).toBe(15);
        expect(midPoint.y).toBe(0);
    });

    it("has mid point half way when vertical", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 20));
        var midPoint = line.getMidPoint();

        expect(midPoint.x).toBe(0);
        expect(midPoint.y).toBe(15);
    });

    it("has a 1 gradient when at 45 angle", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(10, 10));

        expect(line.getGradient()).toBeCloseTo(1);
    });

    it("y offset is calculated", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(10, 20));

        expect(line.getYOffset()).toBeCloseTo(10);
    });

    it("bounding rectangle covers bounds", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(10, 20));
        var boundingRectangle = line.getBoundingRectangle();

        expect(boundingRectangle.position.x).toBe(0);
        expect(boundingRectangle.position.y).toBe(10);
        expect(boundingRectangle.width).toBe(10);
        expect(boundingRectangle.height).toBe(10);
    });

    it("contains vectors on line", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 100));

        var expectedToBeContained = [
            new Jasteroids.Vector2D(0, 20),
            new Jasteroids.Vector2D(0, 50),
            new Jasteroids.Vector2D(0, 99.9)
        ];

        $j.each(expectedToBeContained, function (index, vector) {
            expect(line.containsVector(vector)).toBe(true);
        });
    });

    it("does not contain vectors no on line", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(10, 20));

        var expectedToBeNotContained = [
            new Jasteroids.Vector2D(-1, 50),
            new Jasteroids.Vector2D(0, 101)
        ];

        $j.each(expectedToBeNotContained, function (index, vector) {
            expect(line.containsVector(vector)).toBe(false);
        });
    });

    it("intersects other lines when vertical", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 20));

        var expectedToIntersect = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(-1, 0), new Jasteroids.Vector2D(1, 30)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(-5, 11), new Jasteroids.Vector2D(5, 11))
        ];

        $j.each(expectedToIntersect, function (index, otherLine) {
            expect(line.intersectsLine(otherLine)).toBe(true);
            expect(otherLine.intersectsLine(line)).toBe(true);
        });
    });

    it("intersects other lines when horizontal", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 0), new Jasteroids.Vector2D(20, 0));

        var expectedToIntersect = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, -1), new Jasteroids.Vector2D(30, 1)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(11, -5), new Jasteroids.Vector2D(11, 5))
        ];

        $j.each(expectedToIntersect, function (index, otherLine) {
            expect(line.intersectsLine(otherLine)).toBe(true);
            expect(otherLine.intersectsLine(line)).toBe(true);
        });
    });

    it("intersects when vertical and other line is same", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 20));
        var otherLine = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 20));

        expect(line.intersectsLine(otherLine)).toBe(true);
    });

    it("intersects when horizointal and other line is same", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 0), new Jasteroids.Vector2D(20, 0));
        var otherLine = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 0), new Jasteroids.Vector2D(20, 0));

        expect(line.intersectsLine(otherLine)).toBe(true);
    });


    it("does not intersect when vertical and other lines do not cross", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 10), new Jasteroids.Vector2D(0, 20));

        var expectedToNotIntersect = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(0, 5)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(21, 0), new Jasteroids.Vector2D(30, 0)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(1, 10), new Jasteroids.Vector2D(1, 20))
        ];

        $j.each(expectedToNotIntersect, function (index, otherLine) {
            expect(line.intersectsLine(otherLine)).toBe(false);
            expect(otherLine.intersectsLine(line)).toBe(false);
        });
    });

    it("does not intersect when horizontal and other lines do not cross", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 0), new Jasteroids.Vector2D(20, 0));

        var expectedToNotIntersect = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(5, 0)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 21), new Jasteroids.Vector2D(0, 30)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 1), new Jasteroids.Vector2D(20, 1))
        ];

        $j.each(expectedToNotIntersect, function (index, otherLine) {
            expect(line.intersectsLine(otherLine)).toBe(false);
            expect(otherLine.intersectsLine(line)).toBe(false);
        });
    });

    it("can be rotated 90 degrees", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(-10, 0), new Jasteroids.Vector2D(10, 0));

        var ninetyDegrees = Math.PI / 2;
        line.rotate(0, 0, ninetyDegrees);

        expect(line.start.x).toBeCloseTo(0);
        expect(line.start.y).toBeCloseTo(10);

        expect(line.end.x).toBeCloseTo(0);
        expect(line.end.y).toBeCloseTo(-10);
    });

    it("does not have a bug when calculating bounding rectangle", function () {
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(5, -11));
        var bounds = line.getBoundingRectangle();

        expect(bounds.getHeight()).toBe(16);
        expect(bounds.getPosition().getX()).toBe(5);
        expect(bounds.getPosition().getY()).toBe(-11);
    });
});