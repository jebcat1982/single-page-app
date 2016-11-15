log('Loading a.PosterView...');

define([
  'nx/Util',
  'nx/Context',
  'nx/Widget'
], function () {

  /**
   * This is the Poster View object
   *
   * @param parent
   * @constructor
   */
  a.PosterView = function (parent) {
    a.PosterView.super_.constructor(parent);

    this.widget_ = a.createDom('div', {'id': this.getName()});
    this.render(parent);
  };
  a.extend(a.PosterView, a.Widget);

  a.PosterView.prototype.getElement = function () {
    return this.widget_;
  };

  a.PosterView.prototype.setPresenter = function (presenter) {
    this.presenter_ = presenter;
  };

  a.PosterView.prototype.getName = function () {
    return 'PosterView';
  };

  a.PosterView.prototype.renderTemplate = function (html) {
    this.widget_.innerHTML = html;
  };

});

