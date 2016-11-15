/**
 * This is Details Presenter constructor
 *
 * @param view
 * @param ctx
 * @constructor
 */
a.DetailsPresenter = function (view, ctx) {
  this.view_ = view;
  this.ctx_ = ctx;
  this.view_.setPresenter(this);
};

a.DetailsPresenter.prototype.init = function () {

  var this_ = this;

  this.view_.setTemplate(function (callback) {
    $.get("data/details.html", function (data) {
      callback(data);
      // a.subscribePosterClicks(this_.ctx_);
    });
  });

  a.onScroll('data/text.html', function(data){
    this_.view_.append($('<div/>').html(data).get(0));
    // a.subscribePosterClicks(this_.ctx_);
  });

  return this;
};

/**
 * @param {Element} container
 */
a.DetailsPresenter.prototype.render = function (container) {
  this.view_.render(container);
};

