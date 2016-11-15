log('Loading a.DetailsView...');

define([
  'nx/Util',
  'nx/Context',
  'nx/Widget'
], function () {

  /**
   * This is the Details View object
   *
   * @param parent
   * @constructor
   */
  a.DetailsView = function (parent) {
    a.DetailsView.super_.constructor(parent);

    this.widget_ = a.createDom('div', {'id': this.getName()});
    this.render(parent);
  };
  a.extend(a.DetailsView, a.Widget);

  a.DetailsView.prototype.getElement = function () {
    return this.widget_;
  };

  a.DetailsView.prototype.setPresenter = function (presenter) {
    this.presenter_ = presenter;
  };

  a.DetailsView.prototype.getName = function () {
    return 'DetailsView';
  };

  a.DetailsView.prototype.renderTemplate = function (html) {
    this.widget_.innerHTML = html;
  };

});

