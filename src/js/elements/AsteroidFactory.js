var Jasteroids = Jasteroids || {};

Jasteroids.AsteroidFactory = {

    LARGE_SIZE: 3,
    MEDIUM_SIZE: 2,
    SMALL_SIZE: 1,

    SHAPE1: 1,
    SHAPE2: 2,
    SHAPE3: 3,

    create: function (position, velocity, size, shape) {
        if (!Jasteroids.hasValue(shape)) {
            shape = Jasteroids.AsteroidFactory._getRandomShape();
        }

        var width = Jasteroids.AsteroidFactory._getWidthForSize(size);
        var vertices = Jasteroids.AsteroidFactory._generateVertices(width, shape);
        var asteroid = new Jasteroids.Asteroid(vertices);

        var randomAngularVelocity = (0.6 * Math.random()) - 0.3;
        asteroid.setAngularVelocity(randomAngularVelocity);

        asteroid.setSize(size);
        asteroid.setPosition(position.clone());
        asteroid.setVelocity(velocity.clone());

        return asteroid;
    },

    createChildAsteroids: function (parentAsteroid) {
        var childAsteroids = [];

        if (parentAsteroid.getSize() != Jasteroids.AsteroidFactory.SMALL_SIZE) {
            var randomVelocity = this._getRandomVelocityCloseToAsteroidVelocity(parentAsteroid);
            var oppositeRandomVelocity = new Jasteroids.Vector2D(
                -randomVelocity.getX(), -randomVelocity.getY()
            );

            var childAsteroid1 = this.create(parentAsteroid.getPosition(), randomVelocity, parentAsteroid.getSize() - 1);
            childAsteroids.push(childAsteroid1);

            var childAsteroid2 = this.create(parentAsteroid.getPosition(), oppositeRandomVelocity, parentAsteroid.getSize() - 1);
            childAsteroids.push(childAsteroid2);
        }

        return childAsteroids;
    },

    _getWidthForSize: function (size) {
        if (size === Jasteroids.AsteroidFactory.MEDIUM_SIZE) {
            return 40;
        } else if (size === Jasteroids.AsteroidFactory.SMALL_SIZE) {
            return 20;
        }

        return 60;
    },

    _getRandomShape: function () {
        var randomFloatingPoint = (Math.random() * 3) + 1;
        return Math.floor(randomFloatingPoint);
    },

    _generateVertices: function (width, shape) {
        var vertices = [];

        if (shape === Jasteroids.AsteroidFactory.SHAPE1) {
            vertices.push(new Jasteroids.Vector2D(0, width / 2));
            vertices.push(new Jasteroids.Vector2D(width / 4, width / 4));
            vertices.push(new Jasteroids.Vector2D(width, 0));
            vertices.push(new Jasteroids.Vector2D(width / 4, -1 * width / 4));
            vertices.push(new Jasteroids.Vector2D(0, -1 * width));
            vertices.push(new Jasteroids.Vector2D(-1 * width, 0));

        } else if (shape === Jasteroids.AsteroidFactory.SHAPE2) {
            vertices.push(new Jasteroids.Vector2D(0, width));
            vertices.push(new Jasteroids.Vector2D(0, width / 2));
            vertices.push(new Jasteroids.Vector2D(width, 0));
            vertices.push(new Jasteroids.Vector2D(0, -1 * width));
            vertices.push(new Jasteroids.Vector2D(0, -1 * width / 2));
            vertices.push(new Jasteroids.Vector2D(-1 * width, 0));
            vertices.push(new Jasteroids.Vector2D(-1 * width / 4, width / 4));

        } else if (shape === Jasteroids.AsteroidFactory.SHAPE3) {
            vertices.push(new Jasteroids.Vector2D(0, width / 2));
            vertices.push(new Jasteroids.Vector2D(width / 2, width / 2));
            vertices.push(new Jasteroids.Vector2D(width / 2, 0));
            vertices.push(new Jasteroids.Vector2D(0, -width / 2));
            vertices.push(new Jasteroids.Vector2D(-1 * width, 0));
            vertices.push(new Jasteroids.Vector2D(-1 * width, width / 2));
            vertices.push(new Jasteroids.Vector2D(-1 * width / 2, width));
        }

        return vertices;
    },

    // TODO - revisit this and create a better velocity
    _getRandomVelocityCloseToAsteroidVelocity: function (asteroid) {
        var randomVelocity = asteroid.getVelocity().clone();
        randomVelocity.add(new Jasteroids.Vector2D(-3 + Math.random() * 6, -3 + Math.random() * 6));
        randomVelocity.truncate(asteroid.getMaxSpeed());

        return randomVelocity;
    }
};

