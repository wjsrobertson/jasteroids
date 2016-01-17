var Jasteroids = Jasteroids || {};

Jasteroids.Initialiser = {
    bindToCanvasAndStartGame: function (canvasId) {
        var model = new Jasteroids.GameModel();
        var bounds = new Jasteroids.BoundingRectangle(0, 0, 600, 400);
        var soundPlayer = new Jasteroids.SoundPlayer();
        var listeners = [];

        var canvas = document.getElementById(canvasId);
        var view = new Jasteroids.CanvasView(canvas, model, bounds);

        var collisionController = new Jasteroids.CollisionController(model, bounds, soundPlayer);
        var positionController = new Jasteroids.PositionController(model, bounds);
        var gameController = new Jasteroids.GameController(model, bounds, soundPlayer);
        var userInputController = new Jasteroids.UserInputController(window, model, soundPlayer, gameController);

        var controllers = [collisionController, positionController, userInputController, gameController];
        var orchestrator = new Jasteroids.GameOrchestrator(controllers, view);

        gameController.demo();
        orchestrator.startGameLoop();
}
};