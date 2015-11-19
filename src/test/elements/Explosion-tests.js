describe("Explosion", function () {
    it("calls update on its rotatingLines", function () {
        /*
        given
         */
        var line = jasmine.createSpyObj(["update"]);
        var lines = [line];
        var explosion = new Jasteroids.Explosion(lines);

        // when
        explosion.update();

        // then
        expect(line.update).toHaveBeenCalled();
    });

    it("its age gets incremented on update", function () {
        /*
         given
         */
        var explosion = new Jasteroids.Explosion([]);

        // when
        explosion.update();
        explosion.update();

        // then
        expect(explosion.getAge()).toBe(2);
    });
});
