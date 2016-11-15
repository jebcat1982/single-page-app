/**
 * This is Media Presenter constructor
 *
 * @param view
 * @param ctx
 * @constructor
 */
a.MediaPresenter = function (view, ctx) {
  this.view_ = view;
  this.ctx_ = ctx;
  this.view_.setPresenter(this);
};


a.MediaPresenter.prototype.init = function () {

  var win = $(window);
  var this_ = this;
  win.off('scroll');

  this.view_.setTemplate(function (callback) {
    $.get("data/media.html", function (data) {
      callback(data);
    });
  }, function () {
    $.getJSON("data/media.json", function (data) {
      this_.view_.addMedia(data);
      a.subscribePosterClicks(this_.ctx_);
    });
  });


  a.onScroll('data/moreMedia.json', function (data) {
    this_.view_.addMedia(data);
    a.subscribePosterClicks(this_.ctx_);
  });

  return this;
};

/**
 * @param {Element} container
 */
a.MediaPresenter.prototype.render = function (container) {
  this.view_.render(container);
};
