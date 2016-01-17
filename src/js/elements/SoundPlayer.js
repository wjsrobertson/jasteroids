var Jasteroids = Jasteroids || {};

Jasteroids.SoundPlayer = function () {
    this.audio = {};
    this.enableSound = true;
    this.init();
};

Jasteroids.SoundPlayer.prototype.init = function () {
    for (var soundName in Jasteroids.SoundPlayer.Sounds) {
        if (Jasteroids.SoundPlayer.Sounds.hasOwnProperty(soundName)) {
            var path = Jasteroids.SoundPlayer.Sounds[soundName];
            this.audio[soundName] = new Audio(path);
        }
    }
};

Jasteroids.SoundPlayer.prototype.playExplosionSound = function () {
    if (this.enableSound) {
        this.audio.EXPLOSION.play();
        this.audio.EXPLOSION.play();
    }
};

Jasteroids.SoundPlayer.prototype.playShootSound = function () {
    if (this.enableSound) {
        this.audio.SHOOT.play();
    }
};

Jasteroids.SoundPlayer.prototype.playGameStartSound = function () {
    if (this.enableSound) {
        this.audio.GAME_START.play();
    }
};

Jasteroids.SoundPlayer.prototype.playGameStartSound = function () {
    if (this.enableSound) {
        this.audio.GAME_START.play();
    }
};

Jasteroids.SoundPlayer.prototype.playGameOverSound = function () {
    if (this.enableSound) {
        this.audio.GAME_OVER.play();
    }
};

Jasteroids.SoundPlayer.prototype.playLoseLifeSound = function () {
    if (this.enableSound) {
        this.audio.LOSE_LIFE.play();
    }
};

Jasteroids.SoundPlayer.Sounds = {
    EXPLOSION: "media/explosion.wav",
    MUSIC: "media/menu.mid",
    SAUCER: "media/saucer.wav",
    SHOOT: "media/shoot.wav",
    GAME_START: "media/start.wav",
    GAME_OVER: "media/lose_life.wav",
    LOSE_LIFE: "media/game_over.wav"
};
Object.freeze(Jasteroids.SoundPlayer.Sounds);