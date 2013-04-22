define(['jQuery', 'slider'], function($, components) {
	
	var TimelineView = function (model, $element) {
		this.$element = $element;

		this.$element.append('<div id="timeline" class="slider" data-value="1" data-min="0" data-max="1"></div>');
		
        var slider = $('#timeline');
		var sliderComponent = new components.HSlider({
            view:slider,
            min:parseFloat(slider.attr('data-min')),
            max:parseFloat(slider.attr('data-max')),
            value:parseFloat(slider.attr('data-value'))
        
        });

	};
	
	return TimelineView;
});