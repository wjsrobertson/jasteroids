describe("Triangle2d", function () {
    it("intersects another triangle when traingles overlap", function () {
        var triangle = new Jasteroids.Triangle2D(
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0)
        );

        var expectedToIntersect = [
            new Jasteroids.Triangle2D(
                new Jasteroids.Vector2D(10, 10),
                new Jasteroids.Vector2D(5, 5),
                new Jasteroids.Vector2D(10, 0)
            ),
            new Jasteroids.Triangle2D(
                new Jasteroids.Vector2D(9, 9),
                new Jasteroids.Vector2D(0, 0),
                new Jasteroids.Vector2D(10, 0)
            ),
            new Jasteroids.Triangle2D(
                new Jasteroids.Vector2D(5, 5),
                new Jasteroids.Vector2D(15, 15),
                new Jasteroids.Vector2D(15, 0)
            )
        ];

        $j.each(expectedToIntersect, function (index, otherTriangle) {
            expect(triangle.intersectsTriangle(otherTriangle)).toBe(true);
            expect(otherTriangle.intersectsTriangle(triangle)).toBe(true);
        });
    });

    it("intersects contains vectors within its bounds", function () {
        var triangle = new Jasteroids.Triangle2D(
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0)
        );

        var expectedToBeContained = [
            new Jasteroids.Vector2D(9, 9),
            new Jasteroids.Vector2D(5, 5),
            new Jasteroids.Vector2D(1, 1)
        ];

        $j.each(expectedToBeContained, function (index, vector) {
            expect(triangle.containsVector(vector)).toBe(true);
        });
    });

    it("intersects lines which cross its bounds", function () {
        var triangle = new Jasteroids.Triangle2D(
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0)
        );

        var expectedToIntersect = [
            new Jasteroids.Line2D(
                new Jasteroids.Vector2D(9, 9),
                new Jasteroids.Vector2D(12, 12)
            ),
            new Jasteroids.Line2D(
                new Jasteroids.Vector2D(-5, -5),
                new Jasteroids.Vector2D(1, 1)
            ),
            new Jasteroids.Line2D(
                new Jasteroids.Vector2D(5, -1),
                new Jasteroids.Vector2D(5, 1)
            )
        ];

        $j.each(expectedToIntersect, function (index, otherLine) {
            expect(triangle.intersectsLine(otherLine)).toBe(true);
        });
    });
});