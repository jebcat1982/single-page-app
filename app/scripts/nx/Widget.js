log('Loading a.Widget...');

/**
 * Generic Element wrapper to be extended from children
 *
 * @param parent element
 * @constructor
 */
a.Widget = function (parent) {
  this.children_ = [];
  this.parent_ = parent;
  this.isAttached_ = false;
};

/**
 * Invoked on attaching to DOM
 */
a.Widget.prototype.onAttach = function () {
};

/**
 * Invoked on detach from DOM
 */
a.Widget.prototype.onDetach = function () {
};

a.Widget.prototype.getElement = a.abstractMethod;

a.Widget.prototype.renderTemplate = a.abstractMethod;


a.Widget.prototype.getParent = function () {
  return this.parent_;
};


a.Widget.prototype.getChildren = function () {
  return this.children_;
};

/**
 * Appends an element to the widget
 * @param widget
 */
a.Widget.prototype.append = function (widget) {
  // adding to array
  a.arrayPushUnique(this.children_, widget);

  if (a.isWidget(widget)) {
    a.appendChild(this.getElement(), widget.getElement());
    if (!widget.isAttached_) {
      widget.onAttach();
      widget.isAttached_ = true;
    }

    this.attachChildren(widget, 0);
  } else {
    a.appendChild(this.getElement(), widget);
  }
};

/**
 * Sets an html template and renders
 *
 * @param getTemplate template retrieval method
 * @param getImages   images retrieval method
 */
a.Widget.prototype.setTemplate = function (getTemplate, getImages, forceRefresh) {
  if (forceRefresh) {
    this.template_ = undefined;
  }
  if (this.template_) {
    this.renderTemplate(this.template_);
    if (getImages)getImages();
  } else {
    var this_ = this;
    getTemplate(function (template) {
      this_.template_ = template;
      this_.renderTemplate(template);
      if (getImages)getImages();
    });
  }
};

/**
 * Removes the widget from DOM
 * @param widget
 */
a.Widget.prototype.remove = function (widget) {
  var removed = a.arrayRemove(this.children_, widget);

  if (removed >= 0) {
    a.removeNode(widget.getElement());
    if (a.isWidget(widget)) {
      if (widget.isAttached_) {
        widget.onDetach();
        widget.isAttached_ = false;
      }
      this.detachChildren(widget);
    }
  }
};

/**
 * Renders the widget
 * @param parentContainer
 */
a.Widget.prototype.render = function (parentContainer) {

  // clear container
  a.removeChildren(parentContainer);
  // add to container
  a.appendChild(parentContainer, this.getElement());

  if (!this.isAttached_) {
    this.onAttach();
    this.isAttached_ = true;
  }
};


a.Widget.prototype.removeFromParent = function () {

  if (a.isWidget(this.parent_)) {
    this.parent_.remove(this);

  } else {
    a.removeNode(this.getElement());
  }
};

a.Widget.prototype.detachChildren = function (w, level) {
  if (!a.isDefAndNotNull(w)) {
    return;
  }
  if (!a.isWidget(w)) {
    return;
  }

  var children = w.getChildren();
  for (var i = 0; i < children.length; i++) {
    var c = children[i];
    if (c instanceof a.Widget) {
      if (c.isAttached_) {
        c.onDetach();
        c.isAttached_ = false;
      }
      this.detachChildren(c, level++);
    }
  }
};

a.Widget.prototype.attachChildren = function (w, level) {
  if (!a.isDefAndNotNull(w)) {
    return;
  }
  if (!a.isWidget(w)) {
    return;
  }

  var children = w.getChildren();
  for (var i = 0; i < children.length; i++) {
    var c = children[i];
    if (c instanceof a.Widget) {
      if (!c.isAttached_) {
        c.onAttach();
        c.isAttached_ = false;
      }
      this.attachChildren(c, level++);
    }
  }
};

a.isWidgetOrEle = function (w) {
  if ((w instanceof a.Widget) || (w instanceof Element)) {
    return true;
  } else {
    return false;
  }
};

a.isWidget = function (w) {
  return (w instanceof a.Widget);
};
