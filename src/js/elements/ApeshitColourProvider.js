var Jasteroids = Jasteroids || {};

Jasteroids.ApeshitColourProvider = function () {
    this.MIN_VALUE = 80;
    this.MAX_VALUE = 255;
    this.INCREMENT = 15;

    this.currentComponentIndex = 0;
    this.currentValue = 40;
    this.rgbComponentsToInclude = [
        [true,  false, false],
        [true,  true,  false],
        [false, true,  true],
        [true,  false, true],
        [false, true,  false]
    ];
};

Jasteroids.ApeshitColourProvider.prototype.nextColour = function () {
    this.currentValue = this.currentValue + this.INCREMENT;

    if (this.currentValue > this.MAX_VALUE) {
        this.INCREMENT = -this.INCREMENT;
        this.currentValue = this.MAX_VALUE;
    } else if (this.currentValue < this.MIN_VALUE) {
        this.INCREMENT = -this.INCREMENT;
        this.currentValue = this.MIN_VALUE;
        this.currentComponentIndex = this.currentComponentIndex + 1;
        this.currentComponentIndex = this.currentComponentIndex % this.rgbComponentsToInclude.length;
    }
   
    var component = this.rgbComponentsToInclude[this.currentComponentIndex];

    var includeRed = component[0];
    var redPart = this._getComponentValue(includeRed, this.currentValue);

    var includeGreen = component[1];
    var greenPart = this._getComponentValue(includeGreen, this.currentValue);

    var includeBlue = component[2];
    var bluePart = this._getComponentValue(includeBlue, this.currentValue);

    return '#' + redPart + greenPart + bluePart;
};

Jasteroids.ApeshitColourProvider.prototype._getComponentValue = function(includeComponent, value) {
    var partValue = "00";

    if (includeComponent) {
        partValue = value.toString(16);
        if (partValue.length < 2) {
            partValue = "0" + partValue;
        }
    }

    return partValue;
};