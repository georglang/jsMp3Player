define(['jQuery'], function ($) {

  var components = (function (window) {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (scope) {
        var f = this;

        return function () {
          f.apply(scope, arguments);
        };
      };
    }

    var applySuperClass = function (SubSclass, SuperClass) {
      var F = function () {
      };
      F.prototype = SuperClass.prototype;
      SubSclass.prototype = new F();
      SubSclass.superproto = SuperClass.prototype;
      SuperClass.prototype.constructor = SubSclass;
    };

    var AbstractSlider = function (config) {
      this.view = config.view;
      this.slider = this.view;

      this.thumb = $('<div class="thumb"></div>');
      this.view.append(this.thumb);

      this.track = $('<div class="track"></div>');
      this.view.append(this.track);

      this.min = parseFloat(this.slider.data('min'));
      this.max = parseFloat(this.slider.data('max'));

      this.value = null;
    };

    AbstractSlider.prototype.getValue = function () {
      return this.value;
    };

    AbstractSlider.prototype.getMin = function () {
      return this.min;
    };

    AbstractSlider.prototype.getMax = function () {
      return this.max;
    };

    var HSlider = function () {
      AbstractSlider.apply(this, arguments);

      this.trackWidth = this.track.width();
      this.thumbWidth = this.thumb.width();

      this.trackLeft = this.track.offset().left;
      this.dx = null;

      this.view.on('mousedown', this.onMouseDown.bind(this));
      this.setValue(parseFloat(this.slider.data('value')), false);
    };

    applySuperClass(HSlider, AbstractSlider);

    HSlider.prototype.animateThumb = function (position) {
      this.thumb.animate({left: position}, 100);
      $(this).trigger('change');
    };

    HSlider.prototype.setValue = function (val, triggerChange) {
      if (val < this.min || val > this.max) {
        return;
      }
      if (val === this.value) {
        return;
      }
      this.value = val;
      this.changeThumbPosition(triggerChange);
    };

    HSlider.prototype.setMin = function (min) {
      if (min < this.value) {
        return;
      }
      if (min === this.min) {
        return;
      }

      this.min = min;
      console.log(this.min);
      this.changeThumbPosition();
    };

    HSlider.prototype.setMax = function (max) {
      if (max < this.value) {
        return;
      }
      if (max === this.max) {
        return;
      }

      this.max = max;
      this.changeThumbPosition();
    };

    HSlider.prototype.changeThumbPosition = function (triggerChange) {
      this.thumb.css('left', this.valueToPosition(this.value));
      if (triggerChange !== false) {
        $(this).trigger('change');
      }
    };

    HSlider.prototype.positionToValue = function (position) {
      var value = position / (this.trackWidth - this.thumbWidth) * (this.max - this.min) + this.min;
      return value;
    };

    HSlider.prototype.valueToPosition = function () {
      var position = (this.value - this.min) / (this.max - this.min) * (this.trackWidth - this.thumbWidth);
      return position;
    };

    HSlider.prototype.onMouseDown = function (e) {
      if (e.target == this.thumb[0]) {
        this.dx = e.pageX - this.thumb.offset().left;
      }
      else if (e.target == this.track[0]) {
        this.dx = this.thumbWidth / 2;
        var position = Math.max(0, Math.min(this.trackWidth - this.thumbWidth, e.pageX - this.dx - this.trackLeft));
        this.setValue(this.positionToValue(position), false);
        this.animateThumb(position);
      }
      this.thumb.addClass('down');

      var sliderElem = this;

      $(document).on('mousemove', function (e) {
        var position = Math.max(0, Math.min(sliderElem.trackWidth - sliderElem.thumbWidth, e.pageX - sliderElem.dx - sliderElem.trackLeft));
        sliderElem.thumb.css('left', position);
        sliderElem.setValue(sliderElem.positionToValue(position));
      });

      $(document).on('mouseup.sliderDragging', function () {
        sliderElem.thumb.removeClass('down');
        $(document).off('mouseup.sliderDragging');
        $(document).off('mousemove');
      });
      e.preventDefault();
    };

    return {
      HSlider: HSlider
    };
  }(window));
  return components;
});
