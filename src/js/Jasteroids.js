var Jasteroids = Jasteroids || {};

Jasteroids.epsilon = 0.0001;

Jasteroids.hasValue = function (toCheck) {
    return toCheck !== undefined && toCheck !== null;
};

Jasteroids.eq = function (firstNum, secondNum) {
    return Math.abs(firstNum - secondNum) < Jasteroids.epsilon;
};
