var Jasteroids = Jasteroids || {};

Jasteroids.SoundPlayer = function () {
    this.audio = {};
    this.currentAudioCounterForSound = {};
    this.soundEnabled = false;
    this.init();
};

Jasteroids.SoundPlayer.prototype.init = function () {
    for (var soundName in Jasteroids.SoundPlayer.Sounds) {
        if (Jasteroids.SoundPlayer.Sounds.hasOwnProperty(soundName)) {
            var sound = Jasteroids.SoundPlayer.Sounds[soundName];
            for (var i = 0; i < sound.numConcurrent; i++) {
                if (!this.audio[soundName]) {
                    this.audio[soundName] = [];
                }
                this.audio[soundName][i] = new Audio(sound.path);
            }
            this.currentAudioCounterForSound[soundName] = 0;
        }
    }
};

Jasteroids.SoundPlayer.prototype._playSound = function (soundName) {
    if (this.soundEnabled) {
        var counter = this.currentAudioCounterForSound[soundName];
        this.audio[soundName][counter].play();
        this.currentAudioCounterForSound[soundName] = this.currentAudioCounterForSound[soundName] + 1;
        var numConcurrent = Jasteroids.SoundPlayer.Sounds[soundName]['numConcurrent'];
        this.currentAudioCounterForSound[soundName] = this.currentAudioCounterForSound[soundName] % numConcurrent;
    }
};


Jasteroids.SoundPlayer.prototype.playExplosionSound = function () {
    this._playSound("EXPLOSION");
};

Jasteroids.SoundPlayer.prototype.playShootSound = function () {
    this._playSound("SHOOT");
};

Jasteroids.SoundPlayer.prototype.playGameStartSound = function () {
    this._playSound("GAME_START");
};

Jasteroids.SoundPlayer.prototype.playGameOverSound = function () {
    this._playSound("GAME_OVER");
};

Jasteroids.SoundPlayer.prototype.playLoseLifeSound = function () {
    this._playSound("LOSE_LIFE");
};

Jasteroids.SoundPlayer.prototype.toggleSound = function () {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
        this.playGameStartSound();
    }
};

Jasteroids.SoundPlayer.Sounds = {
    "EXPLOSION": {path: "media/harp.wav", numConcurrent: 3},
    "SAUCER": {path: "media/saucer.wav", numConcurrent: 1},
    "SHOOT": {path: "media/shoot.wav", numConcurrent: 2},
    "GAME_START": {path: "media/bow.wav", numConcurrent: 1},
    "GAME_OVER": {path: "media/lose_life.wav", numConcurrent: 1},
    "LOSE_LIFE": {path: "media/game_over.wav", numConcurrent: 2}
};
Object.freeze(Jasteroids.SoundPlayer.Sounds);