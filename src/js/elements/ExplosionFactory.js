var Jasteroids = Jasteroids || {};

Jasteroids.ExplosionFactory = {
    create: function(createFrom) {
        var rotatingLines = this._createRotatingLines(createFrom);
        var explosion = new Jasteroids.Explosion(rotatingLines);

        explosion.setVelocity(createFrom.getVelocity());
        explosion.setPosition(createFrom.getPosition());
        explosion.setMass(createFrom.getMass());

        return explosion;
    },

    _createRotatingLines: function (createFrom) {
        var polygon = createFrom.getPolygon();
        var polygonMidPoint = polygon.getMidPoint();
        var rotatingLines = [];

        createFrom.getPolygon().getEdges().forEach(function (edge) {
            var edgeMidPoint = edge.getMidPoint();

            var velocity = edgeMidPoint.clone();
            velocity.subtract(polygonMidPoint);
            velocity.normalise();
            velocity.scaleBy(Jasteroids.Settings.EXPLODING_POLYGON_LINE_VELOCITY);

            var angularVelocity = Math.random() / 2;
            var rotatingLine = new Jasteroids.RotatingLine(edge, angularVelocity, velocity);

            rotatingLines.push(rotatingLine);
        });

        return rotatingLines;
    }
};
