var a = a || {}; // project namespace

/*
 * Brevity log function
 */
window.log = window.console.log.bind(window.console);

var include = [
  'nx/Context',
  'nx/EventBus',
  'nx/Util',
  'nx/Widget',
  'nx/NavView',
  'nx/NavPresenter',
  'nx/MediaView',
  'nx/MediaPresenter',
  'nx/DetailsView',
  'nx/DetailsPresenter',
  'nx/PosterView',
  'nx/PosterPresenter'
];

requirejs(include, function (ctx) {

  // Application starts. Loading Navigation menu
  new a.NavPresenter(ctx.getNavView(), ctx).init(true);

  // and fire 'media' load event
  ctx.getEventBus().fire('media');
});

