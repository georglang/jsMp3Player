require.config({
	baseUrl: "js",
	waitSeconds: 15,
	paths: {
		'jQuery': '../vendor/jquery-1.9.1.min'
	},
	shim: {
		'jQuery': {
			exports: '$'
		}
	}
});

require(['jQuery', 'model', 'controller',
	'views/playerControlsView', 'views/timelineView', 'views/tracklistView', 'views/trackInfoView','views/volumeSliderView'],
	//require parameter heissen wie die files

	//we could also return instance of model instead of constructor Function TimeModel
	//and pass model depencency to all views, but if we do so
	//we loose control about initialization

	function($, PlayerModel, PlayerController,
			 PlayerControlsView, TimelineView, TracklistView, TrackInfoView, VolumeSlider) {
		//parameter heissen wie die konstruktoren

		var model = new PlayerModel();
		var controller = new PlayerController(model);

		var timelineView = new TimelineView(model, $('#timelineView'));
		var tracklistView = new TracklistView(model, $('#tracklistView'));
		var trackInfoView = new TrackInfoView(model, $('#trackInfoView'));
		var playerControlsView = new PlayerControlsView(model, $('#playerControlsView'));

		var volumeSlider = new VolumeSlider($('#mp3player'), model);

});