a.EventBus = function (ctx) {
  this.ctx_ = ctx;
  this.events_ = [];
  this.subscribers_ = [];
  this.init(ctx);
};

a.EventBus.prototype.subscribe = function (event, eventHandlerFn) {
  this.events_.push(event);
  this.subscribers_.push(eventHandlerFn);

};

a.EventBus.prototype.fire = function (event, valueObj) {
  for (var i = 0, len = this.events_.length; i < len; i++) {
    if (event === this.events_[i]) {
      this.subscribers_[i](valueObj);
    }
  }
};


a.EventBus.prototype.init = function (ctx) {

  this.subscribe('media', function (valueObj) {
    window.scrollTo(0, 0);
    new a.MediaPresenter(ctx.getMediaView(), ctx).init().render(ctx.getDom());
  });

  this.subscribe('details', function (valueObj) {
    window.scrollTo(0, 0);
    new a.DetailsPresenter(ctx.getDetailsView(), ctx).init().render(ctx.getDom());
  });

  this.subscribe('poster', function (valueObj) {
    new a.PosterPresenter(ctx.getPosterView(), ctx).init(valueObj).render(ctx.getDom());
  });

};
