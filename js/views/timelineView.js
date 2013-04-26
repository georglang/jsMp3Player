define(['jQuery', 'slider'], function($, components) {
	
	var TimelineView = function (model, $element) {
		this.$element = $element;

		this.$element.append('<div id="timeline" class="slider" data-value="0" data-min="0" data-max="1"></div>');
		
        var slider = $('#timeline');
		var sliderComponent = new components.HSlider({
            view:slider,
            min:parseFloat(0),
            max:parseFloat(slider.attr('data-max')),
            value:parseFloat(slider.attr('data-value'))
        });
	
		$(sliderComponent).on('change',function(){
			console.log('slider change event');
			//console.log('currentTime', model.audio.currentTime);
			console.log('slider value', sliderComponent.getValue());
			model.audio.currentTime = sliderComponent.getValue();
		});

		$(model).on('loadmetadata', function(){
			sliderComponent.setMax(model.audio.duration);

		});

		$(model).on('timeupdate', function(){
			sliderComponent.setValue(model.audio.currentTime, false);
		});

		//gesamtspielzeit Track
		$(model).on('durationchange', function(){
		
		$('#duration').html(model.audio.duration);
		console.log("DUUUUUUURATION", model.audio.duration);
			//$element.duration.text(trackDuration);
		});

		//verbleibende Zeit
		$(model).on('timeupdate',function(){
/*
			 var timeleft = Math.round( model.audio.duration - model.audio.currentTime );
			 hour = Math.floor( model.audio.duration / 3600);
			 minute = Math.floor((model.audio.duration%3600) / 60);
			 second = Math.floor(model.audio.duration%60);
*/		


			var remainingTime = Math.round((model.audio.duration - model.audio.currentTime)*100)/100;
			$('#timeChange').html(remainingTime);
			
			var currentTime = Math.round(model.audio.currentTime*100)/100;
			$('#duration').html(currentTime);
		});

		
			 



	};
	return TimelineView;
});