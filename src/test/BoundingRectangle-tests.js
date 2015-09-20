describe("BoundingRectangle", function () {

    var position;
    var rect;

    beforeEach(function () {
        rect = new Jasteroids.BoundingRectangle(100, 100, 20, 20);
    });

    it("contains vectors inside", function () {
        var expectedToBeContained = [
            new Jasteroids.Vector2D(101, 101),
            new Jasteroids.Vector2D(119, 101),
            new Jasteroids.Vector2D(101, 119),
            new Jasteroids.Vector2D(119, 119),
            new Jasteroids.Vector2D(110, 110),
        ];

        $j.each(expectedToBeContained, function (index, vector) {
            var containsVector = rect.containsVector(vector);
            expect(containsVector).toBe(true);
        });
    });

    it("doesn't contain corner vectors", function () {
        var expectedToBeContained = [
            new Jasteroids.Vector2D(100, 100),
            new Jasteroids.Vector2D(120, 120),
            new Jasteroids.Vector2D(100, 120),
            new Jasteroids.Vector2D(120, 100)
        ];

        $j.each(expectedToBeContained, function (index, vector) {
            var containsVector = rect.containsVector(vector);
            expect(containsVector).toBe(false);
        });
    });

    it("doesn't contain points on edges", function () {
        var expectedToBeContained = [
            new Jasteroids.Vector2D(110, 100),
            new Jasteroids.Vector2D(120, 110),
            new Jasteroids.Vector2D(110, 120),
            new Jasteroids.Vector2D(120, 110)
        ];

        $j.each(expectedToBeContained, function (index, vector) {
            var containsVector = rect.containsVector(vector);
            expect(containsVector).toBe(false);
        });
    });

    function checkRectangleDoesNotIntersect(otherRect) {
        var intersects = rect.intersectsRectangle(otherRect);
        expect(intersects).toBe(false);
    }

    it("does not intersect rectangle to top", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(110, 30, 10, 10)
        );
    });

    it("does not intersect rectangle to top left", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(0, 0, 10, 10)
        );
    });

    it("does not intersect rectangle to top right", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(130, 0, 10, 10)
        );
    });

    it("does not intersect rectangle to right", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(130, 110, 10, 10)
        );
    });

    it("does not intersect rectangle to left", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(20, 110, 10, 10)
        );
    });

    it("does not intersect rectangle to bottom", function () {
        checkRectangleDoesNotIntersect(
            new Jasteroids.BoundingRectangle(110, 130, 10, 10)
        );
    });

    function checkRectangleIntersects(otherRect) {
        var intersects = otherRect.intersectsRectangle(rect);
        expect(intersects).toBe(true);
    }

    xit("contains rectangle fully contained inside of it", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(110, 110, 4, 4)
        );
    });

    it("contains rectangle overlapping top left", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(90, 90, 20, 20)
        );
    });

    it("contains rectangle overlapping top right", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(110, 90, 20, 20)
        );
    });

    it("contains rectangle overlapping bottom left", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(90, 90, 20, 20)
        );
    });

    it("contains rectangle overlapping bottom right", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(110, 110, 20, 20)
        );
    });

    it("intersects rectangle which fully contains it", function () {
        checkRectangleIntersects(
            new Jasteroids.BoundingRectangle(0, 0, 1000, 1000)
        );
    });
});

