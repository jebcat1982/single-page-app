log('Loading a.NavView...');

define([
  'nx/Util',
  'nx/Context',
  'nx/Widget'
], function () {

  /**
   * This is the Navigation View object
   *
   * @param parent
   * @constructor
   */
  a.NavView = function (parent) {
    a.NavView.super_.constructor(parent);
    var ele = a.createDom('div', {'id': this.getName()});

    this.widget_ = ele;

    this.render(parent);
  };
  // extends from parent
  a.extend(a.NavView, a.Widget);

  a.NavView.prototype.getElement = function () {
    return this.widget_;
  };

  a.NavView.prototype.setPresenter = function (presenter) {
    this.presenter_ = presenter;
  };

  a.NavView.prototype.getName = function () {
    return 'NavView';
  };

  a.NavView.prototype.setData = function (data) {
    for (var i = 0; i < data.length; i++) {
      var link = a.createDom('a', {'class': 'navLink', 'href': data[i].link});
      link.innerHTML = data[i].name;
      this.append(link);
    }
  };

});


