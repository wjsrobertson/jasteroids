var Jasteroids = Jasteroids || {};

Jasteroids.Settings = {
    EXPLOSION_MAX_AGE: 14,
    EXPLODING_POLYGON_LINE_VELOCITY: 15,
    SPACE_SHIP_THRUST: 30,
    SPACE_SHIP_ROTATION_ANGLE: Math.PI / 20,
    SPACE_SHIP_REVERSE_THRUST: 10,
    SPACE_SHIP_MORTAL_AGE: 80,
    SPACE_SHIP_MAX_SPEED: 40,
    SPACE_SHIP_SCALE: 6,
    SPACE_SHIP_MISSILE_MAX_SPEED: 50,
    SAUCER_MISSILE_MAX_SPEED: 25,
    NUM_LIVES_START: 3, // Number of lives a player starts with
    DEAD_GAMEOVER_WAIT: 20, // Wait time after player looses all lives before game ends
    CREATE_SHIP_WAIT: 15, // Wait time before a new ship is created after a player looses a life
    MIN_KILL_AGE: 10, // Age a spacehip must be before it can be destroyed
    MISSLE_MAX_AGE_SHIP: 9, // Age a missile be active for after it has been fired by a spaceship
    MISSLE_MAX_AGE_SAUCER: 20, // Age a missile be active for after it has been fired by a flying saucer
    ASTEROID_HIT_POINTS: 10, // Score for killing an asteroid
    SAUCER_HIT_POINTS: 100, // Score for killing the flying saucer
    SAUCER_ACTIVITY: 1000, // business of saucer - smaller number means more chance of saucer appearing per gtame tick
    SAUCER_MISSILE_ACTIVITY: 2,
    SAUCER_MAX_FORCE_X: 80,
    SAUCER_MAX_FORCE_Y: 20,
    SAUCER_Y_CHANGE_WAIT: 20,
    SAUCER_SCALE: 5,
    SAUCER_AGE_BEFORE_SHOOTING: 50,
    NUM_STARS: 30
};

Object.freeze(Jasteroids.Settings);
