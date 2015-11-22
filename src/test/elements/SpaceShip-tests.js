describe("SpaceShip", function () {

    var spaceShip;

    beforeEach(function() {
        spaceShip = new Jasteroids.SpaceShip();
    });

    it("", function () {

    });

    it("has an age which increases one each update", function () {
        spaceShip.update();

        expect(spaceShip.getAge()).toBe(1);
    });

    it("has a forward thrust moves in opposite direction to reverse thrust", function () {
        spaceShip.reset();
        spaceShip.forwardThrust();
        spaceShip.update();
        var forwardPosition = spaceShip.getPosition();
        var forwardDirection = forwardPosition.clone();
        forwardDirection.normalise();

        spaceShip.reset();
        spaceShip.reverseThrust();
        spaceShip.update();
        var backwardsPosition = spaceShip.getPosition();
        var backwardsDirection = backwardsPosition.clone();
        backwardsDirection.normalise();

        expect(forwardDirection.dotProduct(backwardsDirection)).toBeCloseTo(-1);
    });

    it("can be rotated by 180 degrees to point in opposite direction", function () {
        var originalDirection = spaceShip.getDirection();
        spaceShip.rotate(Math.PI);
        var newDirection = spaceShip.getDirection();

        console.log(originalDirection + " - " + newDirection);

        expect(originalDirection.dotProduct(newDirection)).toBeCloseTo(-1);
    });
});
