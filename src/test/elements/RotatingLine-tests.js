describe("RotatingLine", function () {
    it("gets rotated on update", function () {
        /*
         given
         */
        var line = new Jasteroids.Line2D(
            new Jasteroids.Vector2D(1, 2), new Jasteroids.Vector2D(-1, -2)
        );
        var ninetyDegreesInRadians = Math.PI / 2;
        var rotatingLine = new Jasteroids.RotatingLine(
            line,
            ninetyDegreesInRadians,
            new Jasteroids.Vector2D(0, 0)
        );

        // when
        rotatingLine.update();

        /*
         then
         */
        var start = rotatingLine.getStart();
        expect(start.getX()).toBeCloseTo(2);
        expect(start.getY()).toBeCloseTo(-1);

        var end = rotatingLine.getEnd();
        expect(end.getX()).toBeCloseTo(-2);
        expect(end.getY()).toBeCloseTo(1);
    });

    it("gets moved according to velocity on update", function () {
        /*
         given
         */
        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(1, 1));
        var velocity = new Jasteroids.Vector2D(1, 2);
        var rotatingLine = new Jasteroids.RotatingLine(line, 0, velocity);

        // when
        rotatingLine.update();

        /*
         then
         */
        var start = rotatingLine.getStart();
        expect(start.getX()).toBeCloseTo(1);
        expect(start.getY()).toBeCloseTo(2);

        var end = rotatingLine.getEnd();
        expect(end.getX()).toBeCloseTo(2);
        expect(end.getY()).toBeCloseTo(3);
    });
});

