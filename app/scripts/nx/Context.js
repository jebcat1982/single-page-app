log('Loading a.Context...');

define([
  'nx/Util',
  'nx/Widget',
  'nx/NavView',
  'nx/MediaView'
], function () {
  return new a.Context();
});

var ctx_ = (function () {
  var instance;

  function createInstance() {
    return {};
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
        instance.id = Date.now();
      }
      return instance;
    }
  };
})();


a.Context = function () {
  log('App started');
  this.single_ = ctx_.getInstance();
};

a.Context.prototype.get = function () {
  return this.single_;
};

a.Context.prototype.getDom = function (isNav) {
  if (!a.isDefAndNotNull(this.content_)) {
    var root = a.createDom('main');
    this.nav_ = a.createDom('nav');
    this.content_ = a.createDom('section', {id: 'a_section'});
    a.appendChild(root, this.nav_);
    a.appendChild(root, this.content_);
    a.appendChild(document.body, root);
  }
  return isNav ? this.nav_ : this.content_;
};

a.Context.prototype.getEventBus = function () {
  if (!this.eventBus_) {
    this.eventBus_ = new a.EventBus(this);
  }
  return this.eventBus_;
};

a.Context.prototype.getMediaView = function () {
  if (!a.isDefAndNotNull(this.mediaView_)) {
    this.mediaView_ = new a.MediaView(this.getDom());
  }
  return this.mediaView_;
};

a.Context.prototype.getDetailsView = function () {
  if (!a.isDefAndNotNull(this.detailsView_)) {
    this.detailsView_ = new a.DetailsView(this.getDom());
  }
  return this.detailsView_;
};

a.Context.prototype.getPosterView = function () {
  if (!a.isDefAndNotNull(this.posterView_)) {
    this.posterView_ = new a.PosterView(this.getDom());
  }
  return this.posterView_;
};

a.Context.prototype.getNavView = function () {
  if (!a.isDefAndNotNull(this.navView_)) {
    this.navView_ = new a.NavView(this.getDom(true));
  }
  return this.navView_;
};
