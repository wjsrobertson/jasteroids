var Jasteroids = Jasteroids || {};

Jasteroids.GameBoundary = function (gameWidth, gameHeight) {
    this.gameMinX = 0;
    this.gameMinY = 0;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameMaxX = this.gameMinX + this.gameWidth;
    this.gameMaxY = this.gameMinY + this.gameHeight;

};