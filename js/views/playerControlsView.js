define(['jQuery', 'views/playerControlsView'], function($) {
	
	var PlayerControlsView = function (model, $element) {

		$element.append('<div id="play">Play</div><div id="pause">Pause</div><div id="stop">Stop</div><div id="next">Next</div>');

		
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
			model.next();
		});

		$("#volumeSlider").on("change", function(event){
			alert("VALUE CHANGED");
			model.changeVolume(volume);
		});



	};
	return PlayerControlsView;
});