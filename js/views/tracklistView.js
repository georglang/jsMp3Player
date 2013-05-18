define(['jQuery', 'views/tracklistView'], function($) {
	
	var TracklistView = function(model,DragableItem, $element) {

		this.tracklistOrder = 0;
		this.currentTrackId = 0;

		var dragableItemsArray = [];

		model.getTracklist();
		this.tracklistOrder = model.tracklistOrder;

		//einfuegen der einzelnen Tracks in Trackliste
		for(var i=0; i<this.tracklistOrder.length; i++){
			insertTracklistItem(i, this.tracklistOrder);
		}

		function insertTracklistItem(i, tracklistOrder){
			var trackId = tracklistOrder[i];
			var tracklist = $("<div id='track"+ trackId + "'" + "dragable='true'" + "class='singleTrack'" + ">" + model.getTrackTitleById(trackId) + "</div>");
			$('#tracklist').append(tracklist);
			
			tracklist.dblclick(function(e) {
			  	model.setCurrentTrackId(trackId);
			});
		}

		//markiert ersten Tack
		$('#track0').addClass('activeTrack');

		//aktuellen gewaehlten Track markieren
		$(model).on('changetrack',function(){
			this.currentTrackId = model.getCurrentTrackId();
		  	$('#tracklist > div').removeClass('activeTrack');
			$('#track'+ this.currentTrackId).addClass('activeTrack');
		});

		var dragableItem = new DragableItem(model);

	};//TracklistView
	return TracklistView;
});
