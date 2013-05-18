define(['jQuery','views/trackInfoView'], function($) {
	
	var TrackInfoView = function (model, $element) {

		$(model).on('changetrack', function(e){
			$('#trackInfo .marquee').html(
 			 model.getTrackArtist() +" - "+ model.getTrackTitle() +" - "+
			 model.getTrackAlbum() +" - "+  model.getTrackGenre()
			);
		});
	};
	return TrackInfoView;
});
