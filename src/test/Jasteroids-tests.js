describe("Jasteroids", function() {
   it("can check if two floating point numbers are close together", function() {
       var close = Jasteroids.eq(1, 1.00000001);

       expect(close).toBe(true);
   });

    it("can check if a line is contained in an array", function() {
        var lines = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(5, 0)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 21), new Jasteroids.Vector2D(0, 30)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 1), new Jasteroids.Vector2D(20, 1))
        ];

        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 1), new Jasteroids.Vector2D(20, 1));

        expect(Jasteroids.arrayContainsLine(lines, line)).toBeTruthy();
    });

    it("can check if a line is not contained in an array", function() {
        var lines = [
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 0), new Jasteroids.Vector2D(5, 0)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(0, 21), new Jasteroids.Vector2D(0, 30)),
            new Jasteroids.Line2D(new Jasteroids.Vector2D(10, 1), new Jasteroids.Vector2D(20, 1))
        ];

        var line = new Jasteroids.Line2D(new Jasteroids.Vector2D(100, 100), new Jasteroids.Vector2D(200, 200));

        expect(Jasteroids.arrayContainsLine(lines, line)).toBeFalsy();
    });
});