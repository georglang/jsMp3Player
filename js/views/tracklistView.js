define(['jQuery', 'views/tracklistView'], function($) {
	
	var TracklistView = function(model, $element) {

		this.tracks = 0;
		this.currentTrackId = 0;

		model.getTracklist();

		this.tracks = model.tracks;

		for(var i=0; i<this.tracks.length; i++){
			insertTracklistItem(i, this.tracks);
		}

		function insertTracklistItem(i, track){

			var tracklist = $("<div id='track"+ track[i].id + "'>" + track[i].title + "</div>");
			$('#tracklist').append(tracklist);
			
			tracklist.dblclick(function() {
			  	model.setTrackSource(track[i].url);
			  	console.log("Track Id: ", track[i].id);
			  	model.setCurrentTrackId(track[i].id);
			});
		}//insert Tracklist
	};//TracklistView

	TracklistView.prototype.change = function(){
	
	}

	return TracklistView;
});