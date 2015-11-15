var Jasteroids = Jasteroids || {};

Jasteroids.TestUtils = Jasteroids.TestUtils || {};

Jasteroids.TestUtils.containsVector = function(array, vector) {
    var contains = false;

    array.forEach(
        function(vertex) {
            if (Jasteroids.eq(vertex.x, vector.x)
                && Jasteroids.eq(vertex.y, vector.y)) {
                contains = true;
            }
        }
    );

    return contains;
}