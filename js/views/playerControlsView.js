define(['jQuery', 'views/playerControlsView'], function($) {
	
	var PlayerControlsView = function (model, $element) {

		$element.append('<div id="controlButtons" class"btn-group>'+ 
							'<button id="prev"<a class="btn" href="#"><i class="icon-step-backward"></i></a></button>'+
						 	'<button id="play" <a class="btn" href="#"><i class="icon-play"></i></a></button>' +
						 	'<button id="pause"<a class="btn" href="#"><i class="icon-pause"></i></a></button>'+
						 	'<button id="stop"<a class="btn" href="#"><i class="icon-stop"></i></a></button>'+
						 	'<button id="next" <a class="btn" href="#"><i class="icon-step-forward"></i></a></button>'+
						 '</div>'
		);

		
		$("#play").on("click", function(event){
  			model.play();
		});

		$("#pause").on("click", function(event){
  			model.pause();
		});

		$("#stop").on("click", function(event){
			model.stop();
		});

		$("#next").on("click", function(event){
			model.nextTrack();
		});

		$("#prev").on("click", function(event){
			model.prevTrack();
		});


		$("#volumeSlider").on("change", function(event){
			model.changeVolume(volume);
		});

		//umschalten der schaltflächen anzeigen
		$(model).on('playactive', function(){
			console.log("PLAYACTIVE");
			$("#play > i").addClass("icon-white");
			$("#stop > i").removeClass("icon-white");
			$("#pause > i").removeClass("icon-white");
		});

		$(model).on('stopactive', function(){
			console.log("STOPACTIVE");
			$("#play > i").removeClass("icon-white");
			$("#pause > i").removeClass("icon-white");
			$("#stop > i").addClass("icon-white");
		});

		$(model).on('pauseactive', function(){
			console.log("IN PAUSEACTIVE");
			$("#pause > i").addClass("icon-white");
			$("#play > i").removeClass("icon-white");
			$("#stop > i").removeClass("icon-white");			
		});

	};//PlayerControlsView
	return PlayerControlsView;
});