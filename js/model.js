define(['jQuery'], function($) {
	
	var PlayerModel = function () {
		this._timezoneOffset = 0;

		this.events = {
			/*play : 'play',
			pause : 'pause',
			stop : 'stop',
			changeVolume : 'changeVolume', */
			LOADTRACKLIST : 'loadTracklist'
			
		};
	
		this.audio = new Audio();
		this.audio.src = 'assets/track1.mp3';
		this.audio.autoplay = false;
		this.audio.controls = true;
		this.audio.preload = 'none'; 

		this.tracks;
		this.currentTrackId = 0;
	};

	PlayerModel.prototype.getTracklist = function(){
		var that = this;
		$.ajaxSetup({ async: false });
        
        //einlesen des json files und id hinzufuegen
       	$.getJSON('assets/tracklist.json', function(data) {
		 	console.log("HHHHHH",that.tracks)
		 	that.tracks = data.tracks; //objektArray tracks
		 	
		 	for(var i=0;i<that.tracks.length; i++){
		 		that.tracks[i].id = i;
		 	}
			console.log("THHHHHAT",that.tracks);
		});
		//$(that).trigger(that.events.LOADTRACKLIST); //erst laden nachdem jsonFile geladen wurde, sonst undefined		 			
	}


	PlayerModel.prototype.setCurrentTrackId = function(currentTrackId){
		this.currentTrackId = currentTrackId;
	}

	PlayerModel.prototype.getCurrentTrackId = function(){
		return this.currentTrackId;
	}

	PlayerModel.prototype.setTrackSource = function(trackSource){
		console.log(trackSource);
		this.audio.src = trackSource;
		this.audio.autoplay = true;
		
	}
	PlayerModel.prototype.getTrackTitle = function(){
		return this.tracks[this.getCurrentTrackId()].title;
	}

	PlayerModel.prototype.getTrackArtist = function(){
		return this.tracks[this.getCurrentTrackId()].artist;
	}

	PlayerModel.prototype.getTrackGenre = function(){
		return this.tracks[this.getCurrentTrackId()].genre;
	}

	PlayerModel.prototype.getTrackAlbum = function(){
		return this.tracks[this.getCurrentTrackId()].artist;
	}

	PlayerModel.prototype.play = function(){
        this.audio.play();
	}

	PlayerModel.prototype.pause = function(){
        this.audio.pause();
	}

	PlayerModel.prototype.stop = function(){
        this.audio.stop();
	}

	PlayerModel.prototype.nextTrack = function(){
		currentTrackId++;
		console.log(currentTrackId);
	}

	PlayerModel.prototype.changeVolume = function(volume){
		this.audio.volume = volume;
	}

	

	

	PlayerModel.prototype.getArtist = function(trackId, track){
		return track[trackId].artist;
	}

	PlayerModel.prototype.getGenre = function(trackId, track){
		return track[trackId].genre;
	}

	PlayerModel.prototype.getAlbum = function(trackId, track){
		return track[trackId].album;
	}	

	HTMLAudioElement.prototype.stop = function(){
    	this.pause();
    	this.currentTime = 0.0;
	}

	
	return PlayerModel;
});

