describe("CollisionDetector", function () {

    var somePosition;
    var someVelocity;

    beforeEach(function () {
        somePosition = new Jasteroids.Vector2D(1, 2);
        someVelocity = new Jasteroids.Vector2D(3, 4);
    });

    it("detects a collision between an asteroid and a spaceship when the intersect", function () {
        /*
         given
         */
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.SMALL_SIZE);
        var spaceShip = new Jasteroids.SpaceShip();
        spaceShip.setPosition(somePosition);

        // when
        var asteroidCollidingWithSpaceShip = Jasteroids.CollisionDetector.areItemsColliding(asteroid, spaceShip);
        var spaceShipCollidingWithAsteroid = Jasteroids.CollisionDetector.areItemsColliding(asteroid, spaceShip);

        // then
        expect(asteroidCollidingWithSpaceShip).toBeTruthy();
        expect(spaceShipCollidingWithAsteroid).toBeTruthy();
    });

    it("does not detect a collision between an asteroid and a spaceship when they do not intersect", function () {
        /*
         given
         */
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.SMALL_SIZE);
        var spaceShip = new Jasteroids.SpaceShip();
        spaceShip.setPosition(new Jasteroids.Vector2D(1000, 1000));

        // when
        var asteroidCollidingWithSpaceShip = Jasteroids.CollisionDetector.areItemsColliding(asteroid, spaceShip);
        var spaceShipCollidingWithAsteroid = Jasteroids.CollisionDetector.areItemsColliding(asteroid, spaceShip);

        // then
        expect(asteroidCollidingWithSpaceShip).toBeFalsy();
        expect(spaceShipCollidingWithAsteroid).toBeFalsy();
    });

    it("an asteroid collides with a missile when in same position", function () {
        /*
        given
         */
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.SMALL_SIZE);
        var missile = new Jasteroids.Missile();
        missile.setPosition(somePosition);
        missile.update();
        var clone = somePosition.clone();
        clone.add(new Jasteroids.Vector2D(10, 10));
        missile.setPosition(clone);

        // when
        var asteroidCollidingWithMissile = Jasteroids.CollisionDetector.isItemCollidingWithMissile(asteroid, missile);

        // then
        expect(asteroidCollidingWithMissile).toBeTruthy();
    });

    it("an asteroid does not collide with a missile when not in same position", function () {
        /*
         given
         */
        var asteroid = Jasteroids.AsteroidFactory.create(somePosition, someVelocity, Jasteroids.AsteroidFactory.SMALL_SIZE);
        var missile = new Jasteroids.Missile();
        missile.setPosition(new Jasteroids.Vector2D(1000, 1000));
        missile.update();
        missile.setPosition(new Jasteroids.Vector2D(1010, 1010));

        // when
        var asteroidCollidingWithMissile = Jasteroids.CollisionDetector.isItemCollidingWithMissile(asteroid, missile);

        // then
        expect(asteroidCollidingWithMissile).toBeFalsy();
    });
});
