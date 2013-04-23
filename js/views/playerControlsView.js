define(['jQuery', 'views/playerControlsView'], function($) {
	
	var PlayerControlsView = function (model, $element) {

		$element.append('<div class"btn-group>'+ 
							'<button id="prev"<a class="btn" href="#"><i class="icon-step-backward"></i></a></button>'+
						 	'<button id="play" <a class="btn" href="#"><i class="icon-play"></i></a></button>' +
						 	'<button id="pause"<a class="btn" href="#"><i class="icon-pause"></i></a></button>'+
						 	'<button id="stop"<a class="btn" href="#"><i class="icon-stop"></i></a></button>'+
						 	'<button id="next" <a class="btn" href="#"><i class="icon-step-forward"></i></a></button>'+
						 '</div>'
		);

		
		$("#play").on("click", function(event){
			console.log("play Sound")
  			model.play();
		});

		$("#pause").on("click", function(event){
  			model.pause();
		});

		$("#stop").on("click", function(event){
			console.log("stop Sound")
			model.stop();
		});

		$("#next").on("click", function(event){
			console.log("next Song")
			model.nextTrack();
		});

		$("#prev").on("click", function(event){
			console.log("next Song")
			model.prevTrack();
		});


		$("#volumeSlider").on("change", function(event){
			alert("VALUE CHANGED");
			model.changeVolume(volume);
		});



	};
	return PlayerControlsView;
});