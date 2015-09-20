describe("Vector2D", function () {
    it("has the correct values after having another vector added", function () {
        var vector = new Jasteroids.Vector2D(10, 100);
        vector.add(new Jasteroids.Vector2D(1, 1));

        expect(vector.x).toBe(11);
        expect(vector.y).toBe(101);
    });

    it("has the correct values after having another vector subtracted", function () {
        var vector = new Jasteroids.Vector2D(10, 100);
        vector.subtract(new Jasteroids.Vector2D(1, 1));

        expect(vector.x).toBe(9);
        expect(vector.y).toBe(99);
    });

    it("has the correct values after being cloned", function () {
        var vector = new Jasteroids.Vector2D(10, 100);
        var clone = vector.clone();

        expect(clone.x).toBe(10);
        expect(clone.y).toBe(100);
    });

    it("has the correct values after being scaled", function () {
        var vector = new Jasteroids.Vector2D(10, 20);
        vector.scaleBy(10);

        expect(vector.x).toBe(100);
        expect(vector.y).toBe(200);
    });

    it("has the correct magnitude", function () {
        var vector = new Jasteroids.Vector2D(7, 24);

        expect(vector.magnitude()).toBe(25);
    });

    it("has the magnitude of 1 and scaled values after being truncated", function () {
        var vector = new Jasteroids.Vector2D(7, 24);
        vector.truncate(5);

        expect(vector.magnitude()).toBeCloseTo(5);
        expect(vector.x).toBeCloseTo(7/5);
        expect(vector.y).toBeCloseTo(24/5);
    });

    it("has the magnitude of 1 and scaled values after being truncated", function () {
        var vector = new Jasteroids.Vector2D(7, 24);
        vector.normalise();

        expect(vector.magnitude()).toBeCloseTo(1);
        expect(vector.x).toBeCloseTo(7/25);
        expect(vector.y).toBeCloseTo(24/25);
    });

    it("calculates the correct dot product", function () {
        var vector1 = new Jasteroids.Vector2D(-6, 8);
        var vector2 = new Jasteroids.Vector2D(5, 12);

        var dotProduct = vector1.dotProduct(vector2);

        expect(dotProduct).toBe(66);
    });

    it("calculates interpolation", function () {
        var vector = new Jasteroids.Vector2D(10, 20);
        vector.interpolate(0.5, new Jasteroids.Vector2D(20, 30));

        expect(vector.x).toBeCloseTo(15);
        expect(vector.y).toBeCloseTo(25);
    });
});