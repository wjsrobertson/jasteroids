describe("AsteroidFactory", function () {

    var somePosition;
    var someVelocity;
    var someSize;

    beforeEach(function () {
        somePosition = new Jasteroids.Vector2D(1, 2);
        someVelocity = new Jasteroids.Vector2D(3, 4);
        someSize = Jasteroids.AsteroidFactory.SMALL_SIZE;
    });

    it("gets created with position and velocity as per arguments", function () {
        /*
         given
         */
        var position = new Jasteroids.Vector2D(1, 2);
        var velocity = new Jasteroids.Vector2D(3, 4);
        var size = Jasteroids.AsteroidFactory.SMALL_SIZE;

        // when
        var asteroid = Jasteroids.AsteroidFactory.create(position, velocity, size);

        // then
        expect(asteroid.getPosition().getX()).toBe(1);
        expect(asteroid.getPosition().getY()).toBe(2);
        expect(asteroid.getVelocity().getX()).toBe(3);
        expect(asteroid.getVelocity().getY()).toBe(4);
    });

    it("gets created with angular velocity between -1 and 1", function () {
        // when
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, someSize);

        // then
        expect(asteroid.getAngularVelocity()).toBeGreaterThan(-1);
        expect(asteroid.getAngularVelocity()).toBeLessThan(1);
    });

    function createAteroidForSizeAndGetArea(size) {
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, size);
        var bounds = asteroid.getPolygon().getBoundingRectangle();

        return bounds.getHeight() * bounds.getWidth();
    }

    it("gets created with sizes which differ according to size name ", function () {
        // when
        var smallArea = createAteroidForSizeAndGetArea(Jasteroids.AsteroidFactory.SMALL_SIZE);
        var mediumArea = createAteroidForSizeAndGetArea(Jasteroids.AsteroidFactory.MEDIUM_SIZE);
        var largeArea = createAteroidForSizeAndGetArea(Jasteroids.AsteroidFactory.LARGE_SIZE);

        // then
        expect(smallArea).toBeLessThan(mediumArea);
        expect(smallArea).toBeLessThan(largeArea);
        expect(mediumArea).toBeLessThan(largeArea);
    });

    it("creates two child asteroids for a large asteroid", function () {
        // when
        var large = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.LARGE_SIZE);

        // when
        var childAsteroids = Jasteroids.AsteroidFactory.createChildAsteroids(large);

        // then
        expect(childAsteroids.length).toBe(2);
    });

    it("creates two child asteroids for a medium asteroid", function () {
        // when
        var medium = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.MEDIUM_SIZE);

        // when
        var childAsteroids = Jasteroids.AsteroidFactory.createChildAsteroids(medium);

        // then
        expect(childAsteroids.length).toBe(2);
    });

    it("creates no child asteroids for a small asteroid", function () {
        // when
        var small = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.SMALL_SIZE);

        // when
        var childAsteroids = Jasteroids.AsteroidFactory.createChildAsteroids(small);

        // then
        expect(childAsteroids.length).toBe(0);
    });

    it("creates two child asteroids at the same position as the parent asteroid", function () {
        // when
        var large = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.LARGE_SIZE);

        // when
        var childAsteroids = Jasteroids.AsteroidFactory.createChildAsteroids(large);

        // then
        expect(childAsteroids[0].getPosition().isEqualTo(childAsteroids[1].getPosition())).toBeTruthy();
    });

});
