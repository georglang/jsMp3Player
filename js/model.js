define(['jQuery'], function ($) {

  var PlayerModel = function () {
    this._timezoneOffset = 0;

    this.events = {
      DURATIONCHANGE: 'durationchange',
      LOADMETADATA: 'loadmetadata',
      TIMEUPDATE: 'timeupdate',
      PLAYACTIVE: 'playactive',
      PAUSEACTIVE: 'pauseactive',
      STOPACTIVE: 'stopactive',
      CHANGETRACK: 'changetrack'
    };

    this.audio = new Audio();
    this.audio.src = 'assets/track1.mp3';
    this.audio.autoplay = false;
    this.audio.controls = true;
    this.audio.preload = 'none';

    this.tracks = null;
    this.currentTrackId = 0;

    this.tracklistOrder = [];
    this.tracklistOrderIndex = 0;

    var that = this;

    this.audio.addEventListener('play', function () {
      $(that).trigger(that.events.PLAYACTIVE);
      $(that).trigger(that.events.CHANGETRACK);
    });

    this.audio.addEventListener('ended', function () {
      that.nextTrack();
    });

    this.audio.addEventListener('timeupdate', function () {
      $(that).trigger(that.events.TIMEUPDATE);
    });

    this.audio.addEventListener('durationchange', function () {
      $(that).trigger(that.events.DURATIONCHANGE);
    });
  };

  PlayerModel.prototype.getTracklist = function () {
    var that = this;
    $.ajaxSetup({ async: false });

    $.getJSON('assets/tracklist.json', function (data) {
      that.tracks = data.tracks;

      for (var i = 0; i < that.tracks.length; i++) {
        that.tracks[i].id = i;
        that.tracklistOrder[i] = i;
      }
      that.setCurrentTrackIdIndexOrder(0);

    });
  };

  PlayerModel.prototype.setCurrentTrackId = function (currentTrackId) {
    this.currentTrackId = currentTrackId;
    this.tracklistOrderIndex = this.tracklistOrder.indexOf(currentTrackId);
    this.setTrackSource();
  };

  PlayerModel.prototype.setCurrentTrackIdIndexOrder = function (currentTracklistOrderIndex) {
    this.tracklistOrderIndex = currentTracklistOrderIndex;
    this.currentTrackId = this.tracklistOrder[currentTracklistOrderIndex];

    this.setTrackSource();
  };

  PlayerModel.prototype.getCurrentTrackId = function () {
    return this.currentTrackId;
  };

  PlayerModel.prototype.moveTrackInList = function (fromIndex, toIndex) {
    var cutOutElement = this.tracklistOrder.splice(fromIndex, 1)[0];
    this.tracklistOrder.splice(toIndex, 0, cutOutElement);

    if (fromIndex == this.tracklistOrderIndex) {
      this.tracklistOrderIndex = toIndex;
    }
  };

  PlayerModel.prototype.setTrackSource = function () {
    this.audio.src = this.tracks[this.getCurrentTrackId()].url;
    this.audio.autoplay = true;
    $(this).trigger(this.events.CHANGETRACK);
  };

  PlayerModel.prototype.getTrackTitle = function () {
    return this.tracks[this.getCurrentTrackId()].title;
  };

  PlayerModel.prototype.getTrackTitleById = function (id) {
    return this.tracks[id].title;
  };

  PlayerModel.prototype.getTrackArtist = function () {
    return this.tracks[this.getCurrentTrackId()].artist;
  };

  PlayerModel.prototype.getTrackTitle = function () {
    return this.tracks[this.getCurrentTrackId()].title;
  };

  PlayerModel.prototype.getTrackGenre = function () {
    return this.tracks[this.getCurrentTrackId()].genre;
  };

  PlayerModel.prototype.getTrackAlbum = function () {
    return this.tracks[this.getCurrentTrackId()].artist;
  };

  PlayerModel.prototype.play = function () {
    this.audio.play();
  };

  PlayerModel.prototype.pause = function () {
    this.audio.pause();
    $(this).trigger(this.events.PAUSEACTIVE);
  };

  PlayerModel.prototype.stop = function () {
    this.audio.pause();
    this.audio.currentTime = 0.0;
    $(this).trigger(this.events.STOPACTIVE);
  };

  PlayerModel.prototype.nextTrack = function () {
    var lastTrack = false;
    var currentTracklistOrderIndex = this.tracklistOrderIndex;
    currentTracklistOrderIndex++;

    if (currentTracklistOrderIndex >= this.tracks.length) {
      lastTrack = true;
    }

    currentTracklistOrderIndex = currentTracklistOrderIndex % this.tracks.length;
    this.setCurrentTrackIdIndexOrder(currentTracklistOrderIndex);

    if (lastTrack) {
      this.stop();
    }
  };

  PlayerModel.prototype.prevTrack = function () {
    var currentTracklistOrderIndex = this.tracklistOrderIndex;
    currentTracklistOrderIndex--;

    while (currentTracklistOrderIndex < 0)
      currentTracklistOrderIndex += this.tracks.length;
    this.setCurrentTrackIdIndexOrder(currentTracklistOrderIndex);
  };

  PlayerModel.prototype.changeVolume = function (volume) {
    this.audio.volume = volume;
  };

  return PlayerModel;
});