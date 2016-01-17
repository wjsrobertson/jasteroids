var Jasteroids = Jasteroids || {};

Jasteroids.GameOrchestrator = function (controllers, view) {
    this.controllers = controllers;
    this.view = view;
};

Jasteroids.GameOrchestrator.prototype.startGameLoop = function () {
    window.setInterval(
        (function (controllers, view) {
            return function () {
                controllers.forEach(function (controller) {
                    controller.tick();
                });
                view.draw();
            };
        })(this.controllers, this.view)
    , 40);
};
