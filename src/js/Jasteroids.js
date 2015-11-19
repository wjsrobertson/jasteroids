var Jasteroids = Jasteroids || {};

Jasteroids.epsilon = 0.0001;

Jasteroids.hasValue = function (toCheck) {
    return toCheck !== undefined && toCheck !== null;
};

Jasteroids.eq = function (firstNum, secondNum) {
    return Math.abs(firstNum - secondNum) < Jasteroids.epsilon;
};

Jasteroids.arrayContainsLine = function (array, line) {
    if (! Jasteroids.hasValue(array) || ! Jasteroids.hasValue(line)) {
        return false;
    }

    var contained = false;

    array.forEach(function(otherLine){
        if (line.isEqualTo(otherLine)) {
            contained = true;
        }
    });

    return contained;
};