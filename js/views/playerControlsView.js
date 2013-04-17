define(['jQuery', 'views/playerControlsView'], function($) {
	
	var PlayerControlsView = function (model, $element) {

		$element.append('<div id="play">Play</div><div id="pause">Pause</div><div id="stop">Stop</div>');

		
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

		$("#volumeSlider").on("change", function(event){
			alert("VALUE CHANGED");
			model.changeVolume(volume);
		});

	};
	return PlayerControlsView;
});