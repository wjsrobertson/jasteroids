var Jasteroids = Jasteroids || {};

Jasteroids.Initialiser = {
    bindToCanvasAndStartGame: function (canvasId, pageElementIds) {
        var model = new Jasteroids.GameModel();
        var bounds = new Jasteroids.BoundingRectangle(0, 0, 900, 600);
        var soundPlayer = new Jasteroids.SoundPlayer();

        var apeshitColourProvider = new Jasteroids.ApeshitColourProvider();
        var view = new Jasteroids.CanvasView(canvasId, model, bounds, apeshitColourProvider);

        var collisionController = new Jasteroids.CollisionController(model, bounds, soundPlayer);
        var positionController = new Jasteroids.PositionController(model, bounds);
        var gameController = new Jasteroids.GameController(model, bounds, soundPlayer);
        var fullscreenHandler = Jasteroids.FullscreenHandler(canvasId, bounds, view);
        var userInputProcessor = Jasteroids.UserInputProcessor(model, soundPlayer, gameController, fullscreenHandler);
        var userInputKeyHandler = new Jasteroids.UserInputKeyHandler(window, userInputProcessor);
        var gamepadHandler = Jasteroids.UserInputGamepadHandler(userInputProcessor);
        var saucerController = new Jasteroids.SaucerController(model, bounds, soundPlayer);

        var controllers = [collisionController, positionController, userInputKeyHandler, gamepadHandler, gameController, saucerController];
        var orchestrator = new Jasteroids.GameOrchestrator(controllers, view);

        gameController.demo();
        orchestrator.startGameLoop();
    }
};