import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgIf
} from "./chunk-JZT34S5A.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injectable,
  Input,
  InputFlags,
  NgModule,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate
} from "./chunk-B4SCR5T7.js";
import "./chunk-S3RV4IB6.js";
import "./chunk-J4B6MK7R.js";

// node_modules/seamless-scroll-polyfill/lib/common.js
var checkBehavior = (behavior) => {
  return behavior === void 0 || behavior === "auto" || behavior === "instant" || behavior === "smooth";
};
function elementScrollXY(x, y) {
  this.scrollLeft = x;
  this.scrollTop = y;
}
var failedExecute = (method, object, reason = "cannot convert to dictionary.") => `Failed to execute '${method}' on '${object}': ${reason}`;
var failedExecuteInvalidEnumValue = (method, object, value) => failedExecute(method, object, `The provided value '${value}' is not a valid enum value of type ScrollBehavior.`);
var backupMethod = (proto, method, fallback) => {
  var _a;
  const backup = `__SEAMLESS.BACKUP$${method}`;
  if (!proto[backup] && proto[method] && !((_a = proto[method]) === null || _a === void 0 ? void 0 : _a.__isPolyfill)) {
    proto[backup] = proto[method];
  }
  return proto[backup] || fallback;
};
var isObject = (value) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};
var isScrollBehaviorSupported = (config) => "scrollBehavior" in window.document.documentElement.style && (config === null || config === void 0 ? void 0 : config.forcePolyfill) !== true;
var markPolyfill = (method) => {
  Object.defineProperty(method, "__isPolyfill", { value: true });
};
var modifyPrototypes = (prop, func) => {
  markPolyfill(func);
  [HTMLElement.prototype, SVGElement.prototype, Element.prototype].forEach((prototype) => {
    backupMethod(prototype, prop);
    prototype[prop] = func;
  });
};
var scrollingElement = (element) => element.ownerDocument.scrollingElement || element.ownerDocument.documentElement;

// node_modules/seamless-scroll-polyfill/lib/scroll-end-event.js
function scrollEndEvent(bubbles) {
  if (typeof Event === "function") {
    return new Event("scrollend", {
      bubbles,
      cancelable: false
    });
  }
  const event = document.createEvent("Event");
  event.initEvent("scrollend", bubbles, false);
  return event;
}

// node_modules/seamless-scroll-polyfill/lib/scroll-step.js
var ease = (k) => {
  return 0.5 * (1 - Math.cos(Math.PI * k));
};
function now() {
  var _a;
  let fn;
  if ((_a = window.performance) === null || _a === void 0 ? void 0 : _a.now) {
    fn = () => window.performance.now();
  } else {
    fn = () => window.Date.now();
  }
  now = fn;
  return fn();
}
var DURATION = 500;
var step = (context) => {
  const currentTime = now();
  const elapsed = (currentTime - context.timeStamp) / (context.duration || DURATION);
  if (elapsed > 1) {
    context.method(context.targetX, context.targetY);
    context.callback();
    return;
  }
  const value = (context.timingFunc || ease)(elapsed);
  const currentX = context.startX + (context.targetX - context.startX) * value;
  const currentY = context.startY + (context.targetY - context.startY) * value;
  context.method(currentX, currentY);
  context.rafId = window.requestAnimationFrame(() => {
    step(context);
  });
};

// node_modules/seamless-scroll-polyfill/lib/scroll.js
var nonFinite = (value) => {
  if (!isFinite(value)) {
    return 0;
  }
  return Number(value);
};
var isConnected = (node) => {
  var _a;
  return (_a = node.isConnected) !== null && _a !== void 0 ? _a : !node.ownerDocument || // eslint-disable-next-line no-bitwise
  !(node.ownerDocument.compareDocumentPosition(node) & /** DOCUMENT_POSITION_DISCONNECTED */
  1);
};
var scrollWithOptions = (element, options, config) => {
  var _a, _b;
  if (!isConnected(element)) {
    return;
  }
  const startX = element.scrollLeft;
  const startY = element.scrollTop;
  const targetX = nonFinite((_a = options.left) !== null && _a !== void 0 ? _a : startX);
  const targetY = nonFinite((_b = options.top) !== null && _b !== void 0 ? _b : startY);
  if (targetX === startX && targetY === startY) {
    return;
  }
  const fallback = backupMethod(HTMLElement.prototype, "scroll", elementScrollXY);
  const method = backupMethod(Object.getPrototypeOf(element), "scroll", fallback).bind(element);
  if (options.behavior !== "smooth") {
    method(targetX, targetY);
    return;
  }
  const removeEventListener = () => {
    window.removeEventListener("wheel", cancelScroll);
    window.removeEventListener("touchmove", cancelScroll);
  };
  const callback = () => {
    removeEventListener();
    const isDocument = element.nodeType === /** Node.DOCUMENT_NODE */
    9;
    element.dispatchEvent(scrollEndEvent(isDocument));
  };
  const context = Object.assign(Object.assign({}, config), {
    timeStamp: now(),
    startX,
    startY,
    targetX,
    targetY,
    rafId: 0,
    method,
    callback
  });
  const cancelScroll = () => {
    window.cancelAnimationFrame(context.rafId);
    removeEventListener();
  };
  window.addEventListener("wheel", cancelScroll, {
    passive: true,
    once: true
  });
  window.addEventListener("touchmove", cancelScroll, {
    passive: true,
    once: true
  });
  step(context);
};
var isWindow = (obj) => obj.window === obj;
var createScroll = (scrollName) => (target, scrollOptions, config) => {
  const [element, scrollType] = isWindow(target) ? [scrollingElement(target.document.documentElement), "Window"] : [target, "Element"];
  const options = scrollOptions !== null && scrollOptions !== void 0 ? scrollOptions : {};
  if (!isObject(options)) {
    throw new TypeError(failedExecute(scrollName, scrollType));
  }
  if (!checkBehavior(options.behavior)) {
    throw new TypeError(failedExecuteInvalidEnumValue(scrollName, scrollType, options.behavior));
  }
  if (scrollName === "scrollBy") {
    options.left = nonFinite(options.left) + element.scrollLeft;
    options.top = nonFinite(options.top) + element.scrollTop;
  }
  scrollWithOptions(element, options, config);
};
var scroll = createScroll("scroll");
var scrollTo = createScroll("scrollTo");
var scrollBy = createScroll("scrollBy");
var elementScroll = scroll;

// node_modules/seamless-scroll-polyfill/lib/scrollIntoView.js
var normalizeWritingMode = (writingMode) => {
  switch (writingMode) {
    case "horizontal-tb":
    case "lr":
    case "lr-tb":
    case "rl":
    case "rl-tb":
      return 0;
    case "vertical-rl":
    case "tb":
    case "tb-rl":
      return 1;
    case "vertical-lr":
    case "tb-lr":
      return 2;
    case "sideways-rl":
      return 3;
    case "sideways-lr":
      return 4;
  }
  return 0;
};
var calcPhysicalAxis = (writingMode, isLTR, hPos, vPos) => {
  let layout = 0;
  if (!isLTR) {
    layout ^= 2;
  }
  switch (writingMode) {
    case 0:
      layout = layout >> 1 | (layout & 1) << 1;
      [hPos, vPos] = [vPos, hPos];
      break;
    case 1:
    case 3:
      layout ^= 1;
      break;
    case 4:
      layout ^= 2;
      break;
  }
  return [layout, hPos, vPos];
};
var isXReversed = (computedStyle) => {
  const layout = calcPhysicalAxis(normalizeWritingMode(computedStyle.writingMode), computedStyle.direction !== "rtl", void 0, void 0)[0];
  return (layout & 1) === 1;
};
var toPhysicalAlignment = (options, writingMode, isLTR) => {
  const [layout, hPos, vPos] = calcPhysicalAxis(writingMode, isLTR, options.block || "start", options.inline || "nearest");
  return [hPos, vPos].map((value, index) => {
    switch (value) {
      case "center":
        return 1;
      case "nearest":
        return 0;
      default: {
        const reverse = layout >> index & 1;
        return value === "start" === !reverse ? 2 : 3;
      }
    }
  });
};
var mapNearest = (align, scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, elementEdgeStart, elementEdgeEnd, elementSize) => {
  if (align !== 0) {
    return align;
  }
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return null;
  }
  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
    return 2;
  }
  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return 3;
  }
  return null;
};
var canOverflow = (overflow) => {
  return overflow !== "visible" && overflow !== "clip";
};
var getFrameElement = (element) => {
  var _a;
  try {
    return ((_a = element.ownerDocument.defaultView) === null || _a === void 0 ? void 0 : _a.frameElement) || null;
  } catch (_b) {
    return null;
  }
};
var isScrollable = (element, computedStyle) => {
  if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
    return canOverflow(computedStyle.overflowY) || canOverflow(computedStyle.overflowX) || element === scrollingElement(element);
  }
  return false;
};
var parentElement = (element) => {
  const pNode = element.parentNode;
  const pElement = element.parentElement;
  if (pElement === null && pNode !== null) {
    if (pNode.nodeType === /** Node.DOCUMENT_FRAGMENT_NODE */
    11) {
      return pNode.host;
    }
    if (pNode.nodeType === /** Node.DOCUMENT_NODE */
    9) {
      return getFrameElement(element);
    }
  }
  return pElement;
};
var clamp = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};
var getSupportedScrollMarginProperty = (ownerDocument) => {
  return ["scroll-margin", "scroll-snap-margin"].filter((property) => property in ownerDocument.documentElement.style)[0];
};
var getElementScrollSnapArea = (element, elementRect, computedStyle) => {
  const { top, right, bottom, left } = elementRect;
  const scrollProperty = getSupportedScrollMarginProperty(element.ownerDocument);
  if (!scrollProperty) {
    return [top, right, bottom, left];
  }
  const scrollMarginValue = (edge) => {
    const value = computedStyle.getPropertyValue(`${scrollProperty}-${edge}`);
    return parseInt(value, 10) || 0;
  };
  return [
    top - scrollMarginValue("top"),
    right + scrollMarginValue("right"),
    bottom + scrollMarginValue("bottom"),
    left - scrollMarginValue("left")
  ];
};
var calcAlignEdge = (align, start, end) => {
  switch (align) {
    case 1:
      return (start + end) / 2;
    case 3:
      return end;
    case 2:
    case 0:
      return start;
  }
};
var getFrameViewport = (frame, frameRect) => {
  var _a, _b, _c;
  const visualViewport = (_a = frame.ownerDocument.defaultView) === null || _a === void 0 ? void 0 : _a.visualViewport;
  const [x, y, width, height] = frame === scrollingElement(frame) ? [0, 0, (_b = visualViewport === null || visualViewport === void 0 ? void 0 : visualViewport.width) !== null && _b !== void 0 ? _b : frame.clientWidth, (_c = visualViewport === null || visualViewport === void 0 ? void 0 : visualViewport.height) !== null && _c !== void 0 ? _c : frame.clientHeight] : [frameRect.left, frameRect.top, frame.clientWidth, frame.clientHeight];
  const left = x + frame.clientLeft;
  const top = y + frame.clientTop;
  const right = left + width;
  const bottom = top + height;
  return [top, right, bottom, left];
};
var computeScrollIntoView = (element, options) => {
  const actions = [];
  let ownerDocument = element.ownerDocument;
  let ownerWindow = ownerDocument.defaultView;
  if (!ownerWindow) {
    return actions;
  }
  const computedStyle = window.getComputedStyle(element);
  const isLTR = computedStyle.direction !== "rtl";
  const writingMode = normalizeWritingMode(computedStyle.writingMode || computedStyle.getPropertyValue("-webkit-writing-mode") || computedStyle.getPropertyValue("-ms-writing-mode"));
  const [alignH, alignV] = toPhysicalAlignment(options, writingMode, isLTR);
  let [top, right, bottom, left] = getElementScrollSnapArea(element, element.getBoundingClientRect(), computedStyle);
  for (let frame = parentElement(element); frame !== null; frame = parentElement(frame)) {
    if (ownerDocument !== frame.ownerDocument) {
      ownerDocument = frame.ownerDocument;
      ownerWindow = ownerDocument.defaultView;
      if (!ownerWindow) {
        break;
      }
      const { left: dX, top: dY } = frame.getBoundingClientRect();
      top += dY;
      right += dX;
      bottom += dY;
      left += dX;
    }
    const frameStyle = ownerWindow.getComputedStyle(frame);
    if (frameStyle.position === "fixed") {
      break;
    }
    if (!isScrollable(frame, frameStyle)) {
      continue;
    }
    const frameRect = frame.getBoundingClientRect();
    const [frameTop, frameRight, frameBottom, frameLeft] = getFrameViewport(frame, frameRect);
    const eAlignH = mapNearest(alignH, frameLeft, frameRight, frame.clientWidth, left, right, right - left);
    const eAlignV = mapNearest(alignV, frameTop, frameBottom, frame.clientHeight, top, bottom, bottom - top);
    const diffX = eAlignH === null ? 0 : calcAlignEdge(eAlignH, left, right) - calcAlignEdge(eAlignH, frameLeft, frameRight);
    const diffY = eAlignV === null ? 0 : calcAlignEdge(eAlignV, top, bottom) - calcAlignEdge(eAlignV, frameTop, frameBottom);
    const moveX = isXReversed(frameStyle) ? clamp(diffX, -frame.scrollWidth + frame.clientWidth - frame.scrollLeft, -frame.scrollLeft) : clamp(diffX, -frame.scrollLeft, frame.scrollWidth - frame.clientWidth - frame.scrollLeft);
    const moveY = clamp(diffY, -frame.scrollTop, frame.scrollHeight - frame.clientHeight - frame.scrollTop);
    actions.push([
      frame,
      { left: frame.scrollLeft + moveX, top: frame.scrollTop + moveY, behavior: options.behavior }
    ]);
    top = Math.max(top - moveY, frameTop);
    right = Math.min(right - moveX, frameRight);
    bottom = Math.min(bottom - moveY, frameBottom);
    left = Math.max(left - moveX, frameLeft);
  }
  return actions;
};
var scrollIntoView = (element, scrollIntoViewOptions, config) => {
  const options = scrollIntoViewOptions || {};
  if (!checkBehavior(options.behavior)) {
    throw new TypeError(failedExecuteInvalidEnumValue("scrollIntoView", "Element", options.behavior));
  }
  const actions = computeScrollIntoView(element, options);
  actions.forEach(([frame, scrollToOptions]) => {
    elementScroll(frame, scrollToOptions, config);
  });
};
var elementScrollIntoView = scrollIntoView;

// node_modules/seamless-scroll-polyfill/lib/scroll.polyfill.js
var createPolyfill = (scrollName, patch) => (config) => {
  if (isScrollBehaviorSupported(config)) {
    return;
  }
  const scrollMethod = {
    scroll,
    scrollTo,
    scrollBy
  }[scrollName];
  patch(scrollName, function() {
    const args = arguments;
    if (arguments.length === 1) {
      scrollMethod(this, args[0], config);
      return;
    }
    const left = args[0];
    const top = args[1];
    scrollMethod(this, { left, top });
  });
};
var elementScrollPolyfill = createPolyfill("scroll", modifyPrototypes);
var elementScrollToPolyfill = createPolyfill("scrollTo", modifyPrototypes);
var elementScrollByPolyfill = createPolyfill("scrollBy", modifyPrototypes);
var modifyWindow = (prop, func) => {
  markPolyfill(func);
  backupMethod(window, prop);
  window[prop] = func;
};
var windowScrollPolyfill = createPolyfill("scroll", modifyWindow);
var windowScrollToPolyfill = createPolyfill("scrollTo", modifyWindow);
var windowScrollByPolyfill = createPolyfill("scrollBy", modifyWindow);

// node_modules/seamless-scroll-polyfill/lib/scrollIntoView.polyfill.js
function elementScrollIntoViewBoolean(alignToTop) {
  elementScrollIntoView(this, {
    block: (alignToTop !== null && alignToTop !== void 0 ? alignToTop : true) ? "start" : "end",
    inline: "nearest"
  });
}
var elementScrollIntoViewPolyfill = (config) => {
  if (isScrollBehaviorSupported(config)) {
    return;
  }
  const originalFunc = backupMethod(window.HTMLElement.prototype, "scrollIntoView", elementScrollIntoViewBoolean);
  modifyPrototypes("scrollIntoView", function scrollIntoView2() {
    const args = arguments;
    const options = args[0];
    if (args.length === 1 && isObject(options)) {
      elementScrollIntoView(this, options, config);
      return;
    }
    originalFunc.apply(this, args);
  });
};

// node_modules/seamless-scroll-polyfill/lib/polyfill.js
var polyfill = (config) => {
  if (isScrollBehaviorSupported(config)) {
    return;
  }
  elementScrollPolyfill(config);
  elementScrollToPolyfill(config);
  elementScrollByPolyfill(config);
  elementScrollIntoViewPolyfill(config);
  windowScrollPolyfill(config);
  windowScrollToPolyfill(config);
  windowScrollByPolyfill(config);
};

// node_modules/ngx-scrolltop/fesm2022/ngx-scrolltop.mjs
var _c0 = ["*"];
function NgxScrollTopComponent_button_0__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 6);
    ɵɵelement(1, "path", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleProp("fill", ctx_r1.symbolColor);
  }
}
function NgxScrollTopComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 3, 0);
    ɵɵlistener("click", function NgxScrollTopComponent_button_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.scrollToTop());
    });
    ɵɵelementStart(2, "div", 4)(3, "span", null, 1);
    ɵɵprojection(5);
    ɵɵelementEnd();
    ɵɵtemplate(6, NgxScrollTopComponent_button_0__svg_svg_6_Template, 2, 2, "svg", 5);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ref_r3 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("left", ctx_r1.position === "left" ? "20px" : "")("background-color", ctx_r1.backgroundColor)("width", ctx_r1.size, "px")("height", ctx_r1.size, "px");
    ɵɵproperty("ngClass", ctx_r1.theme);
    ɵɵadvance(6);
    ɵɵproperty("ngIf", ref_r3.childNodes.length === 0);
  }
}
var NgxScrollTopCoreService = class _NgxScrollTopCoreService {
  constructor(document2) {
    this.document = document2;
    this.scrolledFromTop = false;
    this.isBrowser = typeof window !== "undefined";
    this.alreadyActivated = false;
  }
  onWindowScroll(mode) {
    const position = this.document.documentElement?.scrollTop || this.document.scrollingElement?.scrollTop;
    switch (mode) {
      case "classic":
        return this.classicMode(position);
      case "smart":
        return this.smartMode(position);
    }
  }
  classicMode(position) {
    if (this.isBrowser && position > window.innerHeight) {
      return true;
    } else {
      return false;
    }
  }
  smartMode(position) {
    let show = false;
    if (position === 0) {
      show = false;
      this.scrolledFromTop = false;
    }
    if (this.scrolledFromTop && this.scrollOffset > position) {
      show = true;
    }
    if (this.isBrowser && position > window.innerHeight * 2) {
      this.scrolledFromTop = true;
      this.scrollOffset = position;
    }
    return show;
  }
  scrollToTop() {
    if (this.isBrowser) {
      if (!this.alreadyActivated) {
        polyfill();
        this.alreadyActivated = true;
      }
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
  static {
    this.ɵfac = function NgxScrollTopCoreService_Factory(t) {
      return new (t || _NgxScrollTopCoreService)(ɵɵinject(DOCUMENT));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxScrollTopCoreService,
      factory: _NgxScrollTopCoreService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxScrollTopCoreService, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var NgxScrollTopComponent = class _NgxScrollTopComponent {
  onWindowScroll() {
    const show = this.core.onWindowScroll(this.mode);
    if (this.show !== show) {
      this.show = show;
      this.cdr.markForCheck();
    }
  }
  ngOnChanges(changes) {
    if (changes.symbol) {
      console.error(`NgxScrollTop: You are trying to set \`${changes["symbol"].currentValue}\` as your symbol but Input \`[symbol]="'↑'"\` is deprecated now.
\r`, `Use \`Content projection\` method, like this:
\r
\r`, `<ngx-scrolltop>${changes["symbol"].currentValue}</ngx-scrolltop>
\r
\r`, `More info: https://github.com/bartholomej/ngx-scrolltop#symbol`);
    }
  }
  constructor(core, cdr) {
    this.core = core;
    this.cdr = cdr;
    this.position = "right";
    this.theme = "gray";
    this.mode = "classic";
    this.show = false;
  }
  scrollToTop() {
    this.core.scrollToTop();
  }
  static {
    this.ɵfac = function NgxScrollTopComponent_Factory(t) {
      return new (t || _NgxScrollTopComponent)(ɵɵdirectiveInject(NgxScrollTopCoreService), ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxScrollTopComponent,
      selectors: [["ngx-scrolltop"]],
      hostBindings: function NgxScrollTopComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("scroll", function NgxScrollTopComponent_scroll_HostBindingHandler() {
            return ctx.onWindowScroll();
          }, false, ɵɵresolveWindow);
        }
      },
      inputs: {
        backgroundColor: "backgroundColor",
        symbolColor: "symbolColor",
        size: "size",
        symbol: "symbol",
        position: "position",
        theme: "theme",
        mode: "mode"
      },
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 1,
      consts: [["scrollTopButton", ""], ["ref", ""], ["type", "button", "role", "button", "aria-label", "Scroll to top of the page", "tabindex", "0", "class", "scrolltop-button", 3, "ngClass", "left", "backgroundColor", "width", "height", "click", 4, "ngIf"], ["type", "button", "role", "button", "aria-label", "Scroll to top of the page", "tabindex", "0", 1, "scrolltop-button", 3, "click", "ngClass"], [1, "symbol-container"], ["aria-hidden", "true", "focusable", "false", "role", "img", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 448 512", 3, "fill", 4, "ngIf"], ["aria-hidden", "true", "focusable", "false", "role", "img", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 448 512"], ["d", "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"]],
      template: function NgxScrollTopComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, NgxScrollTopComponent_button_0_Template, 7, 10, "button", 2);
        }
        if (rf & 2) {
          ɵɵproperty("ngIf", ctx.show);
        }
      },
      dependencies: [NgClass, NgIf],
      styles: ["button[_ngcontent-%COMP%]{outline:0;-webkit-user-select:none;user-select:none}.scrolltop-button[_ngcontent-%COMP%]{position:fixed;display:flex;justify-content:center;align-items:center;border-radius:50%;padding:0;width:40px;height:40px;right:20px;bottom:20px;cursor:pointer;border:none;transition:opacity .1s linear;z-index:10000;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.scrolltop-button[_ngcontent-%COMP%]:hover{opacity:.92}.scrolltop-button[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:15px}.scrolltop-button[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{transform:translateY(10%);width:35%;vertical-align:baseline}.scrolltop-button.black[_ngcontent-%COMP%]{background-color:#000;color:#fff}.scrolltop-button.black[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.black[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff}.scrolltop-button.black[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff}.scrolltop-button.white[_ngcontent-%COMP%]{background-color:#fff;color:#000}.scrolltop-button.white[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.white[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#000}.scrolltop-button.white[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#000}.scrolltop-button.gray[_ngcontent-%COMP%]{background-color:#212121;color:#fafafa}.scrolltop-button.gray[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.gray[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fafafa}.scrolltop-button.gray[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fafafa}.scrolltop-button.grey[_ngcontent-%COMP%]{background-color:#212121;color:#fafafa}.scrolltop-button.grey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.grey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fafafa}.scrolltop-button.grey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fafafa}.scrolltop-button.brown[_ngcontent-%COMP%]{background-color:#3e2723;color:#efebe9}.scrolltop-button.brown[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.brown[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#efebe9}.scrolltop-button.brown[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#efebe9}.scrolltop-button.deeporange[_ngcontent-%COMP%]{background-color:#bf360c;color:#fbe9e7}.scrolltop-button.deeporange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.deeporange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fbe9e7}.scrolltop-button.deeporange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fbe9e7}.scrolltop-button.orange[_ngcontent-%COMP%]{background-color:#ff6d00;color:#fff3e0}.scrolltop-button.orange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.orange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff3e0}.scrolltop-button.orange[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff3e0}.scrolltop-button.yellow[_ngcontent-%COMP%]{background-color:#ffd600;color:#fffde7}.scrolltop-button.yellow[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.yellow[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fffde7}.scrolltop-button.yellow[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fffde7}.scrolltop-button.green[_ngcontent-%COMP%]{background-color:#1b5e20;color:#e8f5e9}.scrolltop-button.green[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.green[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e8f5e9}.scrolltop-button.green[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e8f5e9}.scrolltop-button.blue[_ngcontent-%COMP%]{background-color:#2962ff;color:#e3f2fd}.scrolltop-button.blue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.blue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e3f2fd}.scrolltop-button.blue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e3f2fd}.scrolltop-button.purple[_ngcontent-%COMP%]{background-color:#4a148c;color:#f3e5f5}.scrolltop-button.purple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.purple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f3e5f5}.scrolltop-button.purple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#f3e5f5}.scrolltop-button.deeppurple[_ngcontent-%COMP%]{background-color:#311b92;color:#ede7f6}.scrolltop-button.deeppurple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.deeppurple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ede7f6}.scrolltop-button.deeppurple[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#ede7f6}.scrolltop-button.pink[_ngcontent-%COMP%]{background-color:#880e4f;color:#fce4ec}.scrolltop-button.pink[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.pink[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fce4ec}.scrolltop-button.pink[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fce4ec}.scrolltop-button.red[_ngcontent-%COMP%]{background-color:#b71c1c;color:#ffebee}.scrolltop-button.red[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.red[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ffebee}.scrolltop-button.red[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#ffebee}.scrolltop-button.indigo[_ngcontent-%COMP%]{background-color:#1a237e;color:#e8eaf6}.scrolltop-button.indigo[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.indigo[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e8eaf6}.scrolltop-button.indigo[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e8eaf6}.scrolltop-button.lightblue[_ngcontent-%COMP%]{background-color:#01579b;color:#e1f5fe}.scrolltop-button.lightblue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.lightblue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e1f5fe}.scrolltop-button.lightblue[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e1f5fe}.scrolltop-button.cyan[_ngcontent-%COMP%]{background-color:#006064;color:#e0f7fa}.scrolltop-button.cyan[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.cyan[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e0f7fa}.scrolltop-button.cyan[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e0f7fa}.scrolltop-button.teal[_ngcontent-%COMP%]{background-color:#004d40;color:#e0f2f1}.scrolltop-button.teal[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.teal[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#e0f2f1}.scrolltop-button.teal[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#e0f2f1}.scrolltop-button.lightgreen[_ngcontent-%COMP%]{background-color:#33691e;color:#f1f8e9}.scrolltop-button.lightgreen[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.lightgreen[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f1f8e9}.scrolltop-button.lightgreen[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#f1f8e9}.scrolltop-button.lime[_ngcontent-%COMP%]{background-color:#827717;color:#f9fbe7}.scrolltop-button.lime[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.lime[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f9fbe7}.scrolltop-button.lime[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#f9fbe7}.scrolltop-button.amber[_ngcontent-%COMP%]{background-color:#ff6f00;color:#fff8e1}.scrolltop-button.amber[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.amber[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff8e1}.scrolltop-button.amber[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff8e1}.scrolltop-button.bluegrey[_ngcontent-%COMP%]{background-color:#263238;color:#eceff1}.scrolltop-button.bluegrey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%], .scrolltop-button.bluegrey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#eceff1}.scrolltop-button.bluegrey[_ngcontent-%COMP%]   .symbol-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#eceff1}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxScrollTopComponent, [{
    type: Component,
    args: [{
      selector: "ngx-scrolltop",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<button
  *ngIf="show"
  type="button"
  role="button"
  aria-label="Scroll to top of the page"
  tabindex="0"
  class="scrolltop-button"
  #scrollTopButton
  (click)="scrollToTop()"
  [ngClass]="theme"
  [style.left]="position === 'left' ? '20px' : ''"
  [style.backgroundColor]="backgroundColor"
  [style.width.px]="size"
  [style.height.px]="size">
  <div class="symbol-container">
    <span #ref>
      <ng-content></ng-content>
    </span>
    <svg *ngIf="ref.childNodes.length === 0"
      aria-hidden="true"
      [style.fill]="symbolColor"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512">
      <path
        d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z">
      </path>
    </svg>
  </div>
</button>
`,
      styles: ["button{outline:0;-webkit-user-select:none;user-select:none}.scrolltop-button{position:fixed;display:flex;justify-content:center;align-items:center;border-radius:50%;padding:0;width:40px;height:40px;right:20px;bottom:20px;cursor:pointer;border:none;transition:opacity .1s linear;z-index:10000;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.scrolltop-button:hover{opacity:.92}.scrolltop-button .symbol-container span{font-size:15px}.scrolltop-button .symbol-container svg{transform:translateY(10%);width:35%;vertical-align:baseline}.scrolltop-button.black{background-color:#000;color:#fff}.scrolltop-button.black .symbol-container,.scrolltop-button.black .symbol-container span{color:#fff}.scrolltop-button.black .symbol-container svg{fill:#fff}.scrolltop-button.white{background-color:#fff;color:#000}.scrolltop-button.white .symbol-container,.scrolltop-button.white .symbol-container span{color:#000}.scrolltop-button.white .symbol-container svg{fill:#000}.scrolltop-button.gray{background-color:#212121;color:#fafafa}.scrolltop-button.gray .symbol-container,.scrolltop-button.gray .symbol-container span{color:#fafafa}.scrolltop-button.gray .symbol-container svg{fill:#fafafa}.scrolltop-button.grey{background-color:#212121;color:#fafafa}.scrolltop-button.grey .symbol-container,.scrolltop-button.grey .symbol-container span{color:#fafafa}.scrolltop-button.grey .symbol-container svg{fill:#fafafa}.scrolltop-button.brown{background-color:#3e2723;color:#efebe9}.scrolltop-button.brown .symbol-container,.scrolltop-button.brown .symbol-container span{color:#efebe9}.scrolltop-button.brown .symbol-container svg{fill:#efebe9}.scrolltop-button.deeporange{background-color:#bf360c;color:#fbe9e7}.scrolltop-button.deeporange .symbol-container,.scrolltop-button.deeporange .symbol-container span{color:#fbe9e7}.scrolltop-button.deeporange .symbol-container svg{fill:#fbe9e7}.scrolltop-button.orange{background-color:#ff6d00;color:#fff3e0}.scrolltop-button.orange .symbol-container,.scrolltop-button.orange .symbol-container span{color:#fff3e0}.scrolltop-button.orange .symbol-container svg{fill:#fff3e0}.scrolltop-button.yellow{background-color:#ffd600;color:#fffde7}.scrolltop-button.yellow .symbol-container,.scrolltop-button.yellow .symbol-container span{color:#fffde7}.scrolltop-button.yellow .symbol-container svg{fill:#fffde7}.scrolltop-button.green{background-color:#1b5e20;color:#e8f5e9}.scrolltop-button.green .symbol-container,.scrolltop-button.green .symbol-container span{color:#e8f5e9}.scrolltop-button.green .symbol-container svg{fill:#e8f5e9}.scrolltop-button.blue{background-color:#2962ff;color:#e3f2fd}.scrolltop-button.blue .symbol-container,.scrolltop-button.blue .symbol-container span{color:#e3f2fd}.scrolltop-button.blue .symbol-container svg{fill:#e3f2fd}.scrolltop-button.purple{background-color:#4a148c;color:#f3e5f5}.scrolltop-button.purple .symbol-container,.scrolltop-button.purple .symbol-container span{color:#f3e5f5}.scrolltop-button.purple .symbol-container svg{fill:#f3e5f5}.scrolltop-button.deeppurple{background-color:#311b92;color:#ede7f6}.scrolltop-button.deeppurple .symbol-container,.scrolltop-button.deeppurple .symbol-container span{color:#ede7f6}.scrolltop-button.deeppurple .symbol-container svg{fill:#ede7f6}.scrolltop-button.pink{background-color:#880e4f;color:#fce4ec}.scrolltop-button.pink .symbol-container,.scrolltop-button.pink .symbol-container span{color:#fce4ec}.scrolltop-button.pink .symbol-container svg{fill:#fce4ec}.scrolltop-button.red{background-color:#b71c1c;color:#ffebee}.scrolltop-button.red .symbol-container,.scrolltop-button.red .symbol-container span{color:#ffebee}.scrolltop-button.red .symbol-container svg{fill:#ffebee}.scrolltop-button.indigo{background-color:#1a237e;color:#e8eaf6}.scrolltop-button.indigo .symbol-container,.scrolltop-button.indigo .symbol-container span{color:#e8eaf6}.scrolltop-button.indigo .symbol-container svg{fill:#e8eaf6}.scrolltop-button.lightblue{background-color:#01579b;color:#e1f5fe}.scrolltop-button.lightblue .symbol-container,.scrolltop-button.lightblue .symbol-container span{color:#e1f5fe}.scrolltop-button.lightblue .symbol-container svg{fill:#e1f5fe}.scrolltop-button.cyan{background-color:#006064;color:#e0f7fa}.scrolltop-button.cyan .symbol-container,.scrolltop-button.cyan .symbol-container span{color:#e0f7fa}.scrolltop-button.cyan .symbol-container svg{fill:#e0f7fa}.scrolltop-button.teal{background-color:#004d40;color:#e0f2f1}.scrolltop-button.teal .symbol-container,.scrolltop-button.teal .symbol-container span{color:#e0f2f1}.scrolltop-button.teal .symbol-container svg{fill:#e0f2f1}.scrolltop-button.lightgreen{background-color:#33691e;color:#f1f8e9}.scrolltop-button.lightgreen .symbol-container,.scrolltop-button.lightgreen .symbol-container span{color:#f1f8e9}.scrolltop-button.lightgreen .symbol-container svg{fill:#f1f8e9}.scrolltop-button.lime{background-color:#827717;color:#f9fbe7}.scrolltop-button.lime .symbol-container,.scrolltop-button.lime .symbol-container span{color:#f9fbe7}.scrolltop-button.lime .symbol-container svg{fill:#f9fbe7}.scrolltop-button.amber{background-color:#ff6f00;color:#fff8e1}.scrolltop-button.amber .symbol-container,.scrolltop-button.amber .symbol-container span{color:#fff8e1}.scrolltop-button.amber .symbol-container svg{fill:#fff8e1}.scrolltop-button.bluegrey{background-color:#263238;color:#eceff1}.scrolltop-button.bluegrey .symbol-container,.scrolltop-button.bluegrey .symbol-container span{color:#eceff1}.scrolltop-button.bluegrey .symbol-container svg{fill:#eceff1}\n"]
    }]
  }], () => [{
    type: NgxScrollTopCoreService
  }, {
    type: ChangeDetectorRef
  }], {
    backgroundColor: [{
      type: Input
    }],
    symbolColor: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    symbol: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    onWindowScroll: [{
      type: HostListener,
      args: ["window:scroll"]
    }]
  });
})();
var NgxScrollTopDirective = class _NgxScrollTopDirective {
  constructor(el, core) {
    this.el = el;
    this.core = core;
    this.mode = "classic";
    this.show = false;
    this.hideElement();
  }
  onWindowScroll() {
    const show = this.core.onWindowScroll(this.mode);
    if (this.show !== show) {
      show ? this.showElement() : this.hideElement();
      this.show = show;
    }
  }
  onClick() {
    this.scrollToTop();
  }
  hideElement() {
    this.el.nativeElement.style.display = "none";
  }
  showElement() {
    this.el.nativeElement.style.display = "";
  }
  scrollToTop() {
    this.core.scrollToTop();
  }
  static {
    this.ɵfac = function NgxScrollTopDirective_Factory(t) {
      return new (t || _NgxScrollTopDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxScrollTopCoreService));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxScrollTopDirective,
      selectors: [["", "ngxScrollTop", ""]],
      hostBindings: function NgxScrollTopDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("scroll", function NgxScrollTopDirective_scroll_HostBindingHandler() {
            return ctx.onWindowScroll();
          }, false, ɵɵresolveWindow)("click", function NgxScrollTopDirective_click_HostBindingHandler() {
            return ctx.onClick();
          });
        }
      },
      inputs: {
        mode: [InputFlags.None, "ngxScrollTopMode", "mode"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxScrollTopDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxScrollTop]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgxScrollTopCoreService
  }], {
    mode: [{
      type: Input,
      args: ["ngxScrollTopMode"]
    }],
    onWindowScroll: [{
      type: HostListener,
      args: ["window:scroll"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var NgxScrollTopModule = class _NgxScrollTopModule {
  static {
    this.ɵfac = function NgxScrollTopModule_Factory(t) {
      return new (t || _NgxScrollTopModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxScrollTopModule,
      declarations: [NgxScrollTopComponent, NgxScrollTopDirective],
      imports: [CommonModule],
      exports: [NgxScrollTopComponent, NgxScrollTopDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [NgxScrollTopCoreService],
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxScrollTopModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxScrollTopComponent, NgxScrollTopDirective],
      imports: [CommonModule],
      providers: [NgxScrollTopCoreService],
      exports: [NgxScrollTopComponent, NgxScrollTopDirective]
    }]
  }], null, null);
})();
export {
  NgxScrollTopComponent,
  NgxScrollTopDirective,
  NgxScrollTopModule
};
//# sourceMappingURL=ngx-scrolltop.js.map
