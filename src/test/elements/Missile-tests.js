describe("Missile", function () {

    var missile;

    beforeEach(function(){
        missile = new Jasteroids.Missile();
    });

    it("has an age which increases one each update", function () {
        missile.update();

        expect(missile.getAge()).toBe(1);
    });
});

