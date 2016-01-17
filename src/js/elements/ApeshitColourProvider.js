var Jasteroids = Jasteroids || {};

Jasteroids.ApeshitColourProvider = function () {
    this.currentComponent = 0;
    this.number = 0;
    this.increment = 4;
    this.components = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 0],
        [0, 1, 1],
        [1, 0, 1]
    ];
};

Jasteroids.ApeshitColourProvider.prototype.nextColour = function () {
    this.number = this.number + this.increment;

    if (this.number > 255) {
        this.number = this.number % 255 + 200;
        this.currentComponent = this.currentComponent + 1;
        this.currentComponent = this.currentComponent % this.components.length;
    }

    var component = this.components[this.currentComponent];
    var redPart = (component[0] * this.number).toString(16);
    if (redPart.length < 2) {
        redPart = "0" + redPart;
    }
    var greenPart = (component[1] * this.number).toString(16);
    if (greenPart.length < 2) {
        greenPart = "0" + greenPart;
    }
    var bluePart = (component[2] * this.number).toString(16);
    if (bluePart.length < 2) {
        bluePart = "0" + bluePart;
    }

    return '#' + redPart + greenPart + bluePart;
};

