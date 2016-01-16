var Jasteroids = Jasteroids || {};

Jasteroids.Initialiser = {
    bindToCanvasAndStartGame: function(canvasId) {
        var model = new Jasteroids.GameModel();
        var bounds = new Jasteroids.BoundingRectangle(0, 0, 600, 400);
        var listeners = [];

        var canvas = document.getElementById(canvasId);
        var view = new Jasteroids.CanvasView(canvas, model, bounds);

        var collisionController = new Jasteroids.CollisionController(model, bounds);
        var positionController = new Jasteroids.PositionController(model, bounds);
        var userInputController = new Jasteroids.UserInputController(window, model);
        var controllers = [collisionController, positionController, userInputController];

        var gameController = new Jasteroids.GameController(model, bounds, listeners, controllers);
        gameController.newGame();

        window.setInterval(function () {
            gameController.tick();
            view.draw();
        }, 50);
    }
};