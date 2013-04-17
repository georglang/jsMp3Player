define(['jQuery', 'slider'], function($, components) {

	var VolumeSlider = function ($element, model) {
		this.$element = $element;

		this.$element.append('<div id="volumeSlider" class="slider" data-value="1" data-min="0" data-max="1"></div>');
		
        var slider = $('#volumeSlider');
		var sliderComponent = new components.HSlider({
            view:slider,
            min:parseFloat(slider.attr('data-min')),
            max:parseFloat(slider.attr('data-max')),
            value:parseFloat(slider.attr('data-value'))
        
        });

        $(sliderComponent).on("change", function(event){
			volume = this.getValue();
			console.log(volume);
			model.changeVolume(volume);
		});
	};
	return VolumeSlider;
});