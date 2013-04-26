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
			
			tracklist.dblclick(function(e) {
			  	//model.setTrackSource();
			  	console.log("Track Id: ", track[i].id);
			  	model.setCurrentTrackId(track[i].id);
			  	console.log("currentTrackId: ", track[i].id);
			});
		}//insert Tracklist

		//markiert Ersten Tack
		$('#track0').addClass('activeTrack');

		//aktuellen Track markieren
		$(model).on('changetrack',function(){
			this.currentTrackId = model.getCurrentTrackId();
		  	$('#tracklist > div').removeClass('activeTrack');
			$('#track'+ this.currentTrackId).addClass('activeTrack');
		});

	};//TracklistView
	return TracklistView;
});
