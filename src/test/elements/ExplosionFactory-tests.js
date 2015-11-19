describe("ExplosionFactory", function () {

    var someAsteroid;

    beforeEach(function () {
        someAsteroid = new Jasteroids.Asteroid(
            [new Jasteroids.Vector2D(1, 2), new Jasteroids.Vector2D(2, -1), new Jasteroids.Vector2D(-1, -2), new Jasteroids.Vector2D(-2, 1)]
        );
        someAsteroid.setPosition(new Jasteroids.Vector2D(5, 5));
        someAsteroid.setVelocity(new Jasteroids.Vector2D(10, 10));
        someAsteroid.setMass(99);
    });

    it("gets created with properties of parent", function () {
        // given someAsteroid created in beforeEach

        // when
        var explosion = Jasteroids.ExplosionFactory.create(someAsteroid);

        /*
         then
         */
        expect(explosion.getVelocity().isEqualTo(someAsteroid.getVelocity())).toBeTruthy();
        expect(explosion.getPosition().isEqualTo(someAsteroid.getPosition())).toBeTruthy();
        expect(explosion.getMass()).toBe(someAsteroid.getMass());
    });

    it("gets created with rotating lines copied from the parent's polygon", function () {
        // given
        var parentEdges = someAsteroid.getPolygon().getEdges();

        // when
        var explosion = Jasteroids.ExplosionFactory.create(someAsteroid);

        /*
         then
         */
        expect(explosion.getRotatingLines().length).toBe(4);

        explosion.getRotatingLines().forEach(function(rotatingLine){
            expect(Jasteroids.arrayContainsLine(parentEdges, rotatingLine));
        });
    });
});
