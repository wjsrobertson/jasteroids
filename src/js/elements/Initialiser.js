var Jasteroids = Jasteroids || {};

Jasteroids.Initialiser = {
    bindToCanvasAndStartGame: function (canvasId) {
        var model = new Jasteroids.GameModel();
        var bounds = new Jasteroids.BoundingRectangle(0, 0, 900, 600);
        var soundPlayer = new Jasteroids.SoundPlayer();

        var canvas = document.getElementById(canvasId);
        var apeshitColourProvider = new Jasteroids.ApeshitColourProvider();
        var view = new Jasteroids.CanvasView(canvas, model, bounds, apeshitColourProvider);

        var collisionController = new Jasteroids.CollisionController(model, bounds, soundPlayer);
        var positionController = new Jasteroids.PositionController(model, bounds);
        var gameController = new Jasteroids.GameController(model, bounds, soundPlayer);
        var userInputProcessor = Jasteroids.UserInputProcessor(model, soundPlayer, gameController);
        var userInputKeyHandler = new Jasteroids.UserInputKeyHandler(window, userInputProcessor);
        var saucerController = new Jasteroids.SaucerController(model, bounds, soundPlayer);

        var controllers = [collisionController, positionController, userInputKeyHandler, gameController, saucerController];
        var orchestrator = new Jasteroids.GameOrchestrator(controllers, view);

        gameController.demo();
        orchestrator.startGameLoop();
}
};