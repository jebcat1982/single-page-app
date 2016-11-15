/**
 * This is Nav Presenter constructor
 *
 * @param view
 * @param ctx
 * @constructor
 */
a.NavPresenter = function (view, ctx) {
  this.view_ = view;
  this.ctx_ = ctx;
  this.view_.setPresenter(this);
  this.data_ = [];
  this.dataHash_ = {};
};

a.NavPresenter.prototype.hashchange = function () {
  var navObject = this.dataHash_[location.hash.replace('#', '')];
  if (!navObject) {
    navObject = {
      'name': 'Media',
      'link': '#media'
    };
  }
  this.fireClick(navObject);
};

a.NavPresenter.prototype.init = function (forceHashchange) {

  var this_ = this;

  window.onhashchange = function () {
    this_.hashchange();
  };

  $.getJSON('data/nav.json', function (data) {
    this_.data_ = data;
    data.forEach(function (item) {
      item.id = item.link.replace('#', '');
      this_.dataHash_[item.id] = item;
    });

    this_.render(this_.ctx_.getDom(true));

    if (forceHashchange) {
      this_.hashchange();
    }
  });

  return this;
};

/**
 * @param {Element} container
 */
a.NavPresenter.prototype.render = function (container) {
  this.view_.setData(this.data_);
  this.view_.render(container);
};


a.NavPresenter.prototype.fireClick = function (navObject) {
  this.ctx_.getEventBus().fire(navObject.id, navObject);
};
