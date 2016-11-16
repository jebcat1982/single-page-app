log('Loading a.Util...');


a.isDefAndNotNull = function (val) {
  // Note undefined == null
  return val != null;
};

/**
 * Appends a child to parent DOM
 * @param parent
 * @param child
 */
a.appendChild = function (parent, child) {
  parent.appendChild(child);
};

/**
 * Utility method for creating DOM
 */
a.createDom = function (name, attribs) {
  return $('<' + name + '/>', attribs).get(0);
};

a.abstractMethod = function () {
  throw Error('unimplemented abstract method');
};

/**
 * Removes a node from its parent
 */
a.removeNode = function (node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};


/**
 * Removes all the child nodes on a DOM node.
 * @param {Node} node Node to remove children from.
 */
a.removeChildren = function (node) {
  // Note: Iterations over live collections can be slow, this is the fastest
  // we could find. The double parenthesis are used to prevent JsCompiler and
  // strict warnings.
  var child;
  while ((child = node.firstChild)) {
    node.removeChild(child);
  }
};

/**
 * Adds a non duplicate item to array
 */
a.arrayPushUnique = function (arr, item) {
  if (arr.indexOf(item) == -1) {
    arr.push(item);
    return true;
  }
  return false;
};

/**
 * Removes an item from array
 */
a.arrayRemove = function (arr, item) {
  var index = arr.indexOf(item);

  if (index > -1) {
    arr.splice(index, 1);
  }
};

/**
 * Object inheritance binding method. Child class extends Parent.
 */
a.extend = function (Child, Parent) {
  /** @constructor */
  function F() {
  };
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.super_ = Parent.prototype;
};

/**
 * Object inheritance binding method copying parent -> child properties.
 */
a.extend2 = function (Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.super_ = p;
};

/**
 * Utility method for opening a poster on image click
 * @param ctx
 */
a.subscribePosterClicks = function (ctx) {
  $('.clickable').off('click').on('click', function (obj) {
    ctx.getEventBus().fire('poster', {id: obj.target.id});
  });
};

/**
 * Utility wiring infinite scroll listener and pulling data from server
 * @param url
 * @param callback
 */
a.onScroll = function (url, callback) {
  var win = $(window);
  win.off('scroll').on('scroll', function () {
    if ($(document).height() - win.height() == win.scrollTop()) {
      var GET = url.indexOf('json') > -1 ? 'getJSON': 'get';
      $[GET](url, function (data) {
        callback(data);
      });
    }
  });
};
