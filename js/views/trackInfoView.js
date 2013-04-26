define(['jQuery','views/trackInfoView'], function($) {
	
	var TrackInfoView = function (model, $element) {
		
		this.title;
		this.artist;
		this.genre;
		this.album;

	
		console.log('titel',model.getTrackTitle());
		console.log('artist',model.getTrackArtist());
		console.log('genre',model.getTrackGenre());
		console.log('album',model.getTrackAlbum());
		/*$('#trackInfo').append(
			'<div>'+ model.getTrackTitle() +'</div>',
			'<div>'+ model.getTrackArtist()+'</div>',
			'<div>'+ model.getTrackGenre() +'</div>',
			'<div>'+ model.getTrackAlbum() +'</div>'
		);*/
		
		$(model).on('playactive', function(){
			$('#trackInfo .marquee').html(
 			 model.getTrackArtist() +" - "+ model.getTrackTitle() +" - "+
			 model.getTrackAlbum() +" - "+  model.getTrackGenre()
			);
		});


		$(model).on('loadedmetadata', function(e){
			console.log("äääääää", model.audio.duration);
		});

	};


	//TrackInfoView.prototype.change = function(){
		
		/*artist = getArtist();
		genere = getGenre();
		album = getAlbum();*/
	
	//}
	
	return TrackInfoView;
});
