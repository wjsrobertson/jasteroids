var Jasteroids = Jasteroids || {};

Jasteroids.CollisionDetector = {
    areItemsColliding: function (item1, item2) {
        if (! item1 || ! item2) {
            return false;
        }

        var polygon1 = new Jasteroids.Polygon2D(item1.getPolygon().getVertices());
        polygon1.translate(item1.getPosition());

        var polygon2 = new Jasteroids.Polygon2D(item2.getPolygon().getVertices());
        polygon2.translate(item2.getPosition());

        return polygon1.intersectsPolygon(polygon2);
    },

    isItemCollidingWithMissile: function (item, missile) {
        if (! item || ! missile) {
            return false;
        }

        var polygon = new Jasteroids.Polygon2D(item.getPolygon().getVertices());
        polygon.translate(item.getPosition());

        var line = new Jasteroids.Line2D(missile.getPosition(), missile.getLastPosition());

        return polygon.intersectsLine(line);
    }
};