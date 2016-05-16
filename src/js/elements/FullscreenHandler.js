var Jasteroids = Jasteroids || {};

Jasteroids.FullscreenHandler = function (canvasElementId, bounds, view) {

    var canvas = document.getElementById(canvasElementId);

    initEventListeners();

    function onScreenChange() {
        var isFullscreen = document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.msFullscreenEnabled;

        if (isFullscreen) {
            resizeCanvasToFullScreen();
        } else {
            resizeCanvasToGameSize();
        }
    }

    function initEventListeners() {
        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"]
            .forEach(function (eventName) {
                document.addEventListener(eventName, onScreenChange);
            });
    }

    function resizeCanvasToFullScreen() {
        canvas.width = screen.width;
        canvas.height = screen.height;

        updateForCanvasSizeChange();
    }

    function resizeCanvasToGameSize() {
        canvas.width = bounds.getWidth();
        canvas.height = bounds.getHeight();

        updateForCanvasSizeChange();
    }

    function updateForCanvasSizeChange() {
        canvas.style.width = canvas.width;
        canvas.style.height = canvas.height;

        var xRatio = canvas.width / bounds.getWidth();
        var yRatio = canvas.height / bounds.getHeight();
        var scale = new Jasteroids.Vector2D(xRatio, yRatio);
        view.setScale(scale);
    }

    // As per https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
    function toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.msRequestFullscreen) {
                canvas.msRequestFullscreen();
            } else if (canvas.mozRequestFullScreen) {
                canvas.mozRequestFullScreen();
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (canvas.exitFullscreen) {
                canvas.exitFullscreen();
            } else if (canvas.msExitFullscreen) {
                canvas.msExitFullscreen();
            } else if (canvas.mozCancelFullScreen) {
                canvas.mozCancelFullScreen();
            } else if (canvas.webkitExitFullscreen) {
                canvas.webkitExitFullscreen();
            }
        }
    }

    return {
        toggle: function () {
            toggleFullScreen();
        }
    }
};