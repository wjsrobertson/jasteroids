describe("Polygon2D", function () {
    it("has its position moved using the translate method", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        polygon.translate(new Jasteroids.Vector2D(10, 10));

        var newExpectedVertices = [
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(20, 10),
            new Jasteroids.Vector2D(20, 20),
            new Jasteroids.Vector2D(10, 20),
        ];

        newExpectedVertices.forEach(
            function (vertex) {
                expect(Jasteroids.TestUtils.containsVector(polygon.getVertices(), vertex)).toBeTruthy();
            }
        );
    })

    it("contains vectors inside itsself", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var expectedToBeContained = [
            new Jasteroids.Vector2D(1, 1),
            new Jasteroids.Vector2D(2, 2),
            new Jasteroids.Vector2D(5, 5),
            new Jasteroids.Vector2D(9, 9),
            new Jasteroids.Vector2D(1, 9)
        ];

        expectedToBeContained.forEach(
            function (vector) {
                expect(polygon.containsVector(vector)).toBeTruthy();
            }
        );
    });

    it("does not contain vectors outside itsself", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var expectedToBeNotContained = [
            new Jasteroids.Vector2D(11, 11),
            new Jasteroids.Vector2D(12, 12),
            new Jasteroids.Vector2D(-5, -5),
            new Jasteroids.Vector2D(-9, 9),
            new Jasteroids.Vector2D(-1, -9)
        ];

        expectedToBeNotContained.forEach(
            function (vector) {
                expect(polygon.containsVector(vector)).toBeFalsy();
            }
        );
    })

    it("intersects overlapping polygons", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var overlappingPolygons = [
            new Jasteroids.Polygon2D([
                new Jasteroids.Vector2D(0, 0),
                new Jasteroids.Vector2D(10, 0),
                new Jasteroids.Vector2D(10, 10),
                new Jasteroids.Vector2D(0, 10)
            ]),
            new Jasteroids.Polygon2D([
                new Jasteroids.Vector2D(0, 0),
                new Jasteroids.Vector2D(20, 0),
                new Jasteroids.Vector2D(20, 20),
                new Jasteroids.Vector2D(0, 20)
            ]),
            new Jasteroids.Polygon2D([
                new Jasteroids.Vector2D(9, 9),
                new Jasteroids.Vector2D(20, 9),
                new Jasteroids.Vector2D(20, 20),
                new Jasteroids.Vector2D(9, 20)
            ])
        ];

        overlappingPolygons.forEach(
            function (otherPlygon) {
                expect(polygon.intersectsPolygon(otherPlygon)).toBeTruthy();
                expect(otherPlygon.intersectsPolygon(polygon)).toBeTruthy();
            }
        );
    });

    it("does not intersect non-overlapping polygons", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var nonOverlappingPolygons = [
            new Jasteroids.Polygon2D([
                new Jasteroids.Vector2D(-1, -1),
                new Jasteroids.Vector2D(-10, -1),
                new Jasteroids.Vector2D(-10, -10),
                new Jasteroids.Vector2D(-1, -10)
            ]),
            new Jasteroids.Polygon2D([
                new Jasteroids.Vector2D(11, 11),
                new Jasteroids.Vector2D(20, 11),
                new Jasteroids.Vector2D(20, 20),
                new Jasteroids.Vector2D(1, 20)
            ])
        ];

        nonOverlappingPolygons.forEach(
            function (otherPlygon) {
                expect(polygon.intersectsPolygon(otherPlygon)).toBeFalsy();
                expect(otherPlygon.intersectsPolygon(polygon)).toBeFalsy();
            }
        );
    });

    it("intersects lines which cross its boundary", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var expectedToInsersect = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(-1, 5)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(5, 11)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(11, 5)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(5, -11)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(5, 5), new Jasteroids.Vector2D(20, 20))
        ];

        expectedToInsersect.forEach(
            function (line) {
                expect(polygon.intersectsLine(line)).toBeTruthy();
            }
        );
    });

    it("can be rotated by 45 degrees", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(-1, 0),
            new Jasteroids.Vector2D(0, 1),
            new Jasteroids.Vector2D(1, 0),
            new Jasteroids.Vector2D(0, -1)
        ]);

        var fortyFiveDegreesInRadians = (Math.PI * 45/180);
        polygon.rotate(new Jasteroids.Vector2D(0, 0), fortyFiveDegreesInRadians);

        var vertex1 = polygon.getVertices()[0];
        expect(vertex1.getX()).toBeCloseTo(-Math.sqrt(2)/2);
        expect(vertex1.getY()).toBeCloseTo(Math.sqrt(2)/2);

        var vertex2 = polygon.getVertices()[1];
        expect(vertex2.getX()).toBeCloseTo(Math.sqrt(2)/2);
        expect(vertex2.getY()).toBeCloseTo(Math.sqrt(2)/2);

        var vertex3 = polygon.getVertices()[2];
        expect(vertex3.getX()).toBeCloseTo(Math.sqrt(2)/2);
        expect(vertex3.getY()).toBeCloseTo(-Math.sqrt(2)/2);

        var vertex4 = polygon.getVertices()[3];
        expect(vertex4.getX()).toBeCloseTo(-Math.sqrt(2)/2);
        expect(vertex4.getY()).toBeCloseTo(-Math.sqrt(2)/2);
    });

    it("can be split into triangles", function () {
        var polygon = new Jasteroids.Polygon2D([
            new Jasteroids.Vector2D(0, 0),
            new Jasteroids.Vector2D(10, 0),
            new Jasteroids.Vector2D(10, 10),
            new Jasteroids.Vector2D(0, 10)
        ]);

        var triangles = polygon.getTriangles();
        expect(triangles.length).toBe(4);
    });

});
