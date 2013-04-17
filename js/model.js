define(['jQuery'], function($) {
	
	var PlayerModel = function () {
		this._timezoneOffset = 0;

		this.events = {
			CHANGE:'change'
		};
	
		this.audio = new Audio();
		this.audio.src = 'sound.mp3';
		this.audio.autoplay = false;
		this.audio.controls = true;
		this.audio.preload = 'none'; 

	};

	PlayerModel.prototype.play = function(){
        this.audio.play();
	};

	PlayerModel.prototype.pause = function(){
        this.audio.pause();
	};

	PlayerModel.prototype.stop = function(){
        this.audio.stop();
	};

	PlayerModel.prototype.changeVolume = function(volume){
		this.audio.volume = volume;
	}

	HTMLAudioElement.prototype.stop = function(){
    	this.pause();
    	this.currentTime = 0.0;
	}

	return PlayerModel;
	//return TimeModel();
});