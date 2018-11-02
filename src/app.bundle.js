(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./js/fit-to-screen');
require('./js/focus-inputs');
require('./js/popups');

},{"./js/fit-to-screen":2,"./js/focus-inputs":3,"./js/popups":4}],2:[function(require,module,exports){
'use strict';

var fitTargets = document.querySelectorAll('.fit-to-screen');

fitTargets.forEach(function (el) {
  el.style.minHeight = window.outerHeight + 'px';
});

},{}],3:[function(require,module,exports){
'use strict';

var focusable = document.querySelectorAll('.input-wrap');

focusable.forEach(function (el) {
  var input = el.querySelector('input');
  input.addEventListener('focus', function () {
    el.classList.add('focused');
  });

  input.addEventListener('blur', function () {
    if (input.value === '') el.classList.remove('focused');
  });

  if (el.classList.contains('autofocus')) {
    var tid = window.setTimeout(function () {
      input.focus();
    }, 1600);
  }
});

},{}],4:[function(require,module,exports){
'use strict';

var XM_Popup = require('./vendor/xm-popup');

new XM_Popup({
  popupContainer: '#register-popup',
  openTriggers: ['#register-popup-open1', '#register-popup-open2'],
  closeTriggers: ['#register-popup-close']
});

},{"./vendor/xm-popup":5}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = XM_Popup;
/**
 * @file - Popup javascript plugin.
 * @author Scoccimarro Maximiliano
 * @version 1.0.0
 * @copyright Scoccimarro Maximiliano - 2018
 */

/**
 * @constructor
 * @param {object} customConfig  - configuration of the Popup
 */
function XM_Popup(customConfig) {
  var config = {
    popupContainer: '',
    animation: {
      type: 'zoom',
      speed: 400
    },
    openTriggers: [],
    closeTriggers: []
  },
      me = this;

  /**
   * @function init
   * @description - Initialises Popup by setting initial properties and styles
   */
  var init = function init() {
    deepExtend(config, customConfig);
    setupPopup();
    createOverlay();
    addTriggers();
  };

  /**
   * @function hideOnEsc
   * @description - Hides popup if Esc keyCode is detected
   */
  var hideOnEsc = function hideOnEsc(e) {
    if (e.keyCode === 27) {
      me.hidePopup();
    }
  };

  /**
   * @function setupPopup
   * @description - Initialise popup element and styles
   */
  var setupPopup = function setupPopup() {
    config.popupElement = document.querySelector(config.popupContainer);
    config.popupElement.style.position = 'absolute';
    config.popupElement.style.top = '120px';
    config.popupElement.style.left = '50%';
    config.popupElement.style.marginLeft = '-' + config.popupElement.offsetWidth / 2 + 'px';
    config.popupElement.style.zIndex = 10000;
    config.popupElement.style.opacity = 0;
    config.popupElement.style.visibility = 'hidden';
    config.popupElement.style.transform = 'scale(0)';
    var tid = window.setTimeout(function () {
      config.popupElement.style.transition = 'all .' + config.animation.speed + 's ease-in-out';
    }, 300);
  };

  /**
   * @function createOverlay
   * @description - Creates overlay to put between popup and background
   */
  var createOverlay = function createOverlay() {
    config.overlayItem = document.createElement('div');
    config.overlayItem.style.width = '100%';
    config.overlayItem.style.height = window.outerHeight + 'px';
    config.overlayItem.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    config.overlayItem.style.position = 'absolute';
    config.overlayItem.style.top = 0;
    config.overlayItem.style.left = 0;
    config.overlayItem.style.zIndex = 9999;
    config.overlayItem.style.opacity = 0;
    config.overlayItem.style.visibility = 'hidden';
    config.overlayItem.style.transition = 'all .' + config.animation.speed / 2 + 's ease-in';
    document.body.appendChild(config.overlayItem);
  };

  /**
   * @function showOverlay
   * @description - Shows overlay
   */
  var showOverlay = function showOverlay() {
    config.overlayItem.style.visibility = 'visible';
    config.overlayItem.style.opacity = 1;
  };

  /**
   * @function hideOverlay
   * @description - Hides overlay
   */
  var hideOverlay = function hideOverlay() {
    config.overlayItem.style.visibility = 'hidden';
    config.overlayItem.style.opacity = 0;
  };

  /**
   * @function addTriggers
   * @description - Adds event triggers for the popup to open and close
   */
  var addTriggers = function addTriggers() {
    config.openTriggers.forEach(function (el) {
      var trigger = document.querySelector(el);
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        me.showPopup();
      });
    });

    config.closeTriggers.forEach(function (el) {
      var trigger = document.querySelector(el);
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        me.hidePopup();
      });
    });

    config.overlayItem.addEventListener('click', me.hidePopup);
  };

  /**
   * @function showPopup
   * @description - Shows popup
   */
  me.showPopup = function () {
    document.addEventListener('keydown', hideOnEsc);
    showOverlay();
    config.popupElement.style.visibility = 'visible';
    config.popupElement.style.opacity = 1;
    config.popupElement.style.transform = 'scale(1)';
  };

  /**
   * @function hidePopup
   * @description - Hides popup
   */
  me.hidePopup = function () {
    document.removeEventListener('keydown', hideOnEsc);
    hideOverlay();
    config.popupElement.style.visibility = 'hidden';
    config.popupElement.style.opacity = 0;
    config.popupElement.style.transform = 'scale(0)';
  };

  /**
   * @function deepExtend
   * @param {object} a - object to extend with another object's properties
   * @param {object} b - object from which to copy the attributes
   * @description - Extends object a with object b properties, creating a new property in a if it doesn't exist, overwriting existing properties otherwise
   */
  var deepExtend = function deepExtend(a, b) {
    var c = void 0;
    for (var prop in b) {
      if (_typeof(b[prop]) === 'object' && !(b[prop] instanceof Date)) {
        if (b[prop] instanceof Array) {
          c = [];
        } else {
          c = {};
        }
        if (typeof a[prop] === 'undefined') {
          a[prop] = c;
        }

        deepExtend(a[prop], b[prop]);
      } else {
        if (b[prop] instanceof Date) {
          a[prop] = new Date(b[prop].getTime());
        } else {
          a[prop] = b[prop];
        }
      }
    }
  };

  init();
  // console.log(config);
}

},{}]},{},[1]);
