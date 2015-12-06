var Jasteroids = Jasteroids || {};

Jasteroids.EventTypes = {
    GAME_START: "GAME_START",
    GAME_END: "GAME_END",
    ASTEROID_DESTROYED: "ASTEROID_DESTROYED",
    SHIP_DESTROYED: "SHIP_DESTROYED",
    SAUCER_DESTROYED: "SAUCER_DESTROYED",
    SAUCER_APPEAR: "SAUCER_APPEAR",
    SAUCER_MISSILE_FIRED: "SAUCER_MISSILE_FIRED",
    NEW_LEVEL: "NEW_LEVEL",
    MISSILE_BLOCKED: "MISSILE_BLOCKED",
    SHIP_MORTAL: "SHIP_MORTAL"
};

Object.freeze(Jasteroids.EventTypes);

