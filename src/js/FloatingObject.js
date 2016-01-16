var Jasteroids = Jasteroids || {};

Jasteroids.FloatingObject = function () {
    this.position = new Jasteroids.Vector2D(0, 0);
    this.lastPosition = null;
    this.velocity = new Jasteroids.Vector2D(0, 0);
    this.acceleration = new Jasteroids.Vector2D(0, 0);
    this.forces = new Jasteroids.Vector2D(0, 0);
    this.maxForce = 10;
    this.maxSpeed = 50;
    this.mass = 10;
};

Jasteroids.FloatingObject.prototype = {

    getMass: function() {
        return this.mass;
    },

    setMass: function(mass) {
        this.mass = mass;
    },

    getMaxSpeed: function() {
        return this.maxSpeed;
    },

    setMaxSpeed: function(maxSpeed) {
        this.maxSpeed = maxSpeed;
    },

    getMaxForce: function() {
        return this.maxForce;
    },

    setMaxForce: function(maxForce) {
        this.maxForce = maxForce;
    },

    getPosition: function() {
        return this.position;
    },

    setPosition: function(position) {
        this.position = position;
    },

    setVelocity: function(velocity) {
        this.velocity = velocity;
    },

    getVelocity: function() {
        return this.velocity;
    },

    getLastPosition: function () {
        if (this.lastPosition == null) {
            this.lastPosition = new Jasteroids.Vector2D(this.position);
        }

        return this.lastPosition;
    },

    update: function () {
        this._updateLastPosition();

        this.forces.truncate(this.maxForce);

        this.acceleration = this.forces.clone();
        this.acceleration.scaleBy(1 / this.mass);
        this.velocity.add(this.acceleration);

        this.velocity.truncate(this.maxSpeed);
        this.position.add(this.velocity);

        this.onUpdate();
    },

    onUpdate: function () {
    },

    _updateLastPosition: function () {
        if (this.lastPosition == null) {
            this.lastPosition = new Jasteroids.Vector2D();
        }

        this.lastPosition.setXY(this.position.getX(), this.position.getY());
    },

    /**
     * Impulse force is applied immediately
     */
    impulseForce: function (impulse) {
        if (! Jasteroids.hasValue(impulse)) {
            return;
        }

        var accelerationDueToImpulse = impulse.clone();
        accelerationDueToImpulse.scaleBy(1 / this.mass);
        this.velocity.add(accelerationDueToImpulse);
    },

    addForce: function (force) {
        if (! Jasteroids.hasValue(force)) {
            return;
        }

        this.forces.add(force);
    },

    reset: function () {
        this.position.setXY(0, 0);
        this.forces.setXY(0, 0);
        this.velocity.setXY(0, 0);
        this.acceleration.setXY(0, 0);
    }
};