describe("Asteroid", function () {

    var someAsteroid;

    beforeEach(function(){
        someAsteroid = new Jasteroids.Asteroid(
            [new Jasteroids.Vector2D(1, 2), new Jasteroids.Vector2D(-1, -2)]
        );
    });

    it("has a position", function () {
        expect(someAsteroid.getPosition().getX()).toBe(0);
    });

    it("gets rotated on update", function () {
        /*
        given
         */
        var ninetyDegreesInRadians = Math.PI / 2;
        someAsteroid.setAngularVelocity(ninetyDegreesInRadians);

        // when
        someAsteroid.update();

        /*
         then
          */
        var firstVertex = someAsteroid.getPolygon().getVertices()[0];
        expect(firstVertex.getX()).toBeCloseTo(2);
        expect(firstVertex.getY()).toBeCloseTo(-1);

        var secondVertex = someAsteroid.getPolygon().getVertices()[1];
        expect(secondVertex.getX()).toBeCloseTo(-2);
        expect(secondVertex.getY()).toBeCloseTo(1);
    });

});

