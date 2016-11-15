log('Loading a.MediaView...');

define([
  'nx/Util',
  'nx/Context',
  'nx/Widget'
], function () {

  /**
   * This is the Media View object
   *
   * @param parent
   * @constructor
   */
  a.MediaView = function (parent) {
    a.MediaView.super_.constructor(parent);

    this.widget_ = a.createDom('div', {'id': this.getName()});
    this.render(parent);
  };
  a.extend(a.MediaView, a.Widget);

  a.MediaView.prototype.getElement = function () {
    return this.widget_;
  };

  a.MediaView.prototype.addMedia = function (data) {
    var this_ = this;
    log('---addMedia', data);
    data.forEach(function (obj) {
      var ele = a.createDom('div', {
        'style': 'background-image: url("' + obj.link + '")',
        'class': 'mediaImg clickable',
        'id': obj.id
      });
      this_.append(ele);
    });
  };


  a.MediaView.prototype.setPresenter = function (presenter) {
    this.presenter_ = presenter;
  };

  a.MediaView.prototype.getName = function () {
    return 'MediaView';
  };

  a.MediaView.prototype.renderTemplate = function (html) {
    this.widget_.innerHTML = html;
  };

});

