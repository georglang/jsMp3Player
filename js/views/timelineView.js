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

		//wenn sich slider ändert, wird wert aktualisiert
		$(sliderComponent).on('change',function(){
			model.audio.currentTime = sliderComponent.getValue();
		});

		//slider bekommt aktuelle zeit
		$(model).on('timeupdate', function(){
			sliderComponent.setValue(model.audio.currentTime, false);
		});

		//gesamtspielzeit Track
		$(model).on('durationchange', function(){
			sliderComponent.setMax(model.audio.duration);
			var currentTime = $('#currentTime');
		    var s = parseInt(model.audio.currentTime % 60);
		    var m = parseInt(model.audio.currentTime / 60);

		    if (s < 10 && m > 10) {
		        currentTime.html(m + ':0' + s);
		    }		    
		    else if(s > 10 && m < 10){
		        currentTime.html('0' + m + ':' + s);
		    }
		    else if(s < 10 && m < 10){
		        currentTime.html('0' + m + ':0' + s);
		    }
		    else {
		        currentTime.html(m + ':' + s);
		    }
		});

		//verbleibende Zeit
		$(model).on('timeupdate', function(){
			console.log('msg')

			var currentTime = $('#currentTime');
		    var s = parseInt(model.audio.currentTime % 60);
		    var m = parseInt(model.audio.currentTime / 60);

		    if (s < 10 && m > 10) {
		        currentTime.html(m + ':0' + s+'  /  ');
		    }		    
		    else if(s > 10 && m < 10){
		        currentTime.html('0' + m + ':' + s+ '  /  ');
		    }
		    else if(s < 10 && m < 10){
		        currentTime.html('0' + m + ':0' + s+ '  /  ');
		    }
		    else {
		        currentTime.html(m + ':' + s+'  ');
		    }

		    var remainingTime = $('#remaningTime');
		    var s = parseInt((model.audio.duration -  model.audio.currentTime) % 60);
		    var m = parseInt((model.audio.duration -  model.audio.currentTime) / 60);
		    if(!isNaN(s) && !isNaN(m) ){
		    	console.log('Iiiiiiiiiiiii');
			    if (s < 10 && m > 10) {
			        remainingTime.html('    -' +m + ':0' + s);
			    }		    
			    else if(s > 10 && m < 10){
			        remainingTime.html('    -' +'0' + m + ':' + s);
			    }
			    else if(s < 10 && m < 10){
			        remainingTime.html('    -' +'0' + m + ':0' + s);
			    }
			    else {
			       remainingTime.html('  /  -' +m + ':' + s);
			    }
			}
		});

		$(model).on('changetrack', function(e){
			$('#currentTime').html("00:00");
		});

	};
	return TimelineView;
});