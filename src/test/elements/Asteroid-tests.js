describe("Asteroid", function () {

    var someAsteroid;

    beforeEach(function(){
        someAsteroid = new Jasteroids.Asteroid([new Jasteroids.Vector2D(1, 2)]);
    });

    it("has a position", function () {
        expect(someAsteroid.getPosition().getX()).toBe(0);
    });

    it("gets rotated on update", function () {
        /*
        given
         */
        someAsteroid.setAngularVelocity(Math.PI);

        // when
        someAsteroid.update();

        // then
        expect(false).toBe(true);
    });

});

