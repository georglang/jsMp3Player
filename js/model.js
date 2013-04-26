define(['jQuery'], function($) {
	
	var PlayerModel = function () {
		this._timezoneOffset = 0;

		this.events = {
			DURATIONCHANGE : 'durationchange',
			LOADMETADATA : 'loadmetadata', 
			TIMEUPDATE : 'timeupdate',
			PLAYACTIVE : 'playactive', 
			PAUSEACTIVE : 'pauseactive',
			STOPACTIVE : 'stopactive',
			CHANGETRACK : 'changetrack'
		};
	
		this.audio = new Audio();
		this.audio.src = 'assets/track1.mp3';
		this.audio.autoplay = false;
		this.audio.controls = true;
		this.audio.preload = 'none'; 

		this.tracks;
		this.currentTrackId = 0;
		this.isPlaying = false;
		var that = this;


		this.audio.addEventListener('play', function(e) {
			$(that).trigger(that.events.PLAYACTIVE);
		});

		this.audio.addEventListener('ended', function(e) {
			that.nextTrack();
			console.log('ended');
		});

		/*this.audio.addEventListener('pause', function(e) {
			$(that).trigger(that.events.PAUSEACTIVE);
		});*/

		this.audio.addEventListener('loadedmetadata', function(e) {
			console.log('loadedmetadata');
			console.log('event',e);
			$(that).trigger(that.events.LOADMETADATA);

		});

		this.audio.addEventListener('timeupdate', function(e) {
			$(that).trigger(that.events.TIMEUPDATE);
			//console.log('timeupdate: ' + that.audio.currentTime); 
		});

		this.audio.addEventListener('durationchange', function(e) {
			console.log('durationchange: ' + that.audio.duration);
			$(that).trigger(that.events.DURATIONCHANGE)
		});

	};//PlayerModel

	PlayerModel.prototype.getTracklist = function(){
		var that = this;
		$.ajaxSetup({ async: false });
        
        //einlesen des json files und id hinzufuegen
       	$.getJSON('assets/tracklist.json', function(data) {
		 	that.tracks = data.tracks; //objektArray tracks
		 	
		 	for(var i=0;i<that.tracks.length; i++){
		 		that.tracks[i].id = i;
		 	}	
		});		 			
	}

	


	PlayerModel.prototype.setCurrentTrackId = function(currentTrackId){
		this.currentTrackId = currentTrackId;
		this.setTrackSource();
	}

	PlayerModel.prototype.getCurrentTrackId = function(){
		console.log(this.currentTrackId);
		return this.currentTrackId;
	}

	PlayerModel.prototype.setTrackSource = function(){
		this.audio.src = this.tracks[this.getCurrentTrackId()].url;
		console.log("Aktuelle URL: ", this.tracks[this.getCurrentTrackId()].url);
		this.audio.autoplay = true;
		$(this).trigger(this.events.CHANGETRACK);	
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
        	//$(this).trigger(this.events.PLAYACTIVE);
	}

	PlayerModel.prototype.pause = function(){
        this.audio.pause();
        $(this).trigger(this.events.PAUSEACTIVE);
	}

	PlayerModel.prototype.stop = function(){
        this.audio.stop();
        $(this).trigger(this.events.STOPACTIVE);
	}

	PlayerModel.prototype.nextTrack = function(){
		var currentTrackId = this.getCurrentTrackId();
		currentTrackId++;
		currentTrackId = currentTrackId % this.tracks.length; //tracks fangen nach Tracklistende wieder von vorne an
		this.setCurrentTrackId(currentTrackId);	
	}

	PlayerModel.prototype.prevTrack = function(){
		var currentTrackId = this.getCurrentTrackId();
		currentTrackId--;
		while(currentTrackId < 0) //wenn unter 0 wird listenlaenge aufaddiert
			currentTrackId += this.tracks.length;
		this.setCurrentTrackId(currentTrackId);	
	}

	PlayerModel.prototype.changeVolume = function(volume){
		this.audio.volume = volume;
	}

	HTMLAudioElement.prototype.stop = function(){
    	this.pause();
    	this.currentTime = 0.0;
	}

	return PlayerModel;
});