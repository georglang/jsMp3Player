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

	//require parameter heissen wie die files
require(['jQuery', 'model', 'controller','dragableItem',
	'views/playerControlsView', 'views/timelineView', 'views/tracklistView', 'views/trackInfoView','views/volumeSliderView'],


	//parameter heissen wie die konstruktoren
	function($, PlayerModel, PlayerController,DragableItem,
			 PlayerControlsView, TimelineView, TracklistView, TrackInfoView, VolumeSlider) {
		
		var model = new PlayerModel();
		var controller = new PlayerController(model);

		var timelineView = new TimelineView(model, $('#timelineView'));
		var tracklistView = new TracklistView(model, DragableItem, $('#tracklistView'));
		var playerControlsView = new PlayerControlsView(model, $('#playerControlsView'));

		var volumeSlider = new VolumeSlider($('#volumeSliderView'), model);	
		var trackInfoView = new TrackInfoView(model, $('#trackInfoView'));
});