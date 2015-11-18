describe("FloatingObject", function () {

    var floater;

    beforeEach(function () {
        floater = new Jasteroids.FloatingObject();
        floater.setMass(1);
        floater.setMaxForce(1000);
        floater.setMaxSpeed(1000);
        floater.setPosition(new Jasteroids.Vector2D(0, 0));
    });

    it("has its velocity is affected by an impulse force", function () {
        var impulse = new Jasteroids.Vector2D(1, 2);
        floater.impulseForce(impulse);

        var velocity = floater.getVelocity();
        expect(velocity.getX()).toBe(1);
        expect(velocity.getY()).toBe(2);
    });

    it("has its position is affected by velocity after update", function () {
        var velocity = new Jasteroids.Vector2D(1, 2);
        floater.setVelocity(velocity);
        floater.update();

        var position = floater.getPosition();
        expect(position.getX()).toBe(1);
        expect(position.getY()).toBe(2);

        floater.update();

        position = floater.getPosition();
        expect(position.getX()).toBe(2);
        expect(position.getY()).toBe(4);
    });

    it("has its last position populated update", function () {
        floater.setPosition(new Jasteroids.Vector2D(-1, 1));
        floater.update();

        position = floater.getLastPosition();
        expect(position.getX()).toBe(-1);
        expect(position.getY()).toBe(1);
    });

    it("has its velocity affected by a force", function () {
        floater.addForce(new Jasteroids.Vector2D(2, 1));
        floater.update();

        var position = floater.getVelocity();
        expect(position.getX()).toBe(2);
        expect(position.getY()).toBe(1);

        floater.update();
        position = floater.getVelocity();
        expect(position.getX()).toBe(4);
        expect(position.getY()).toBe(2);
    });
});