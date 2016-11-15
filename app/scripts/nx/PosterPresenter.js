/**
 * This is Poster Presenter constructor
 *
 * @param view
 * @param ctx
 * @constructor
 */
a.PosterPresenter = function (view, ctx) {
  this.view_ = view;
  this.ctx_ = ctx;
  this.view_.setPresenter(this);
};

a.PosterPresenter.prototype.init = function (posterId) {
  location.hash = 'poster';

  var imgUrl = 'img_' + posterId.id.replace('poster_','');

  this.view_.setTemplate(function (callback) {
    $.get("data/poster.html", function (data) {
      data = data.replace('{img}', imgUrl);
      log('init data', data);
      callback(data);
    });
  }, null, true);
  return this;
};

/**
 * @param {Element} container
 */
a.PosterPresenter.prototype.render = function (container) {
  this.view_.render(container);
};

