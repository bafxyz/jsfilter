/**
 * Pure vanilla js, lightweight search results filter library for modern browsers
 * @author Bunulu Andrei bunulu@gmail.com
 * MIT license
 */

(function() {

  'use strict';

  var defaults = {
    multiSelect: true,
    showAvatars: true,
    url: '/users.json',
    data: {}
  };

  var replaceDictionary = {
    'q': 'й',
    'w': 'ц',
    'e': 'у',
    'r': 'к',
    't': 'е',
    'y': 'н',
    'u': 'г',
    'i': 'ш',
    'o': 'щ',
    'p': 'з',
    '[': 'х',
    ']': 'ъ',
    'a': 'ф',
    's': 'ы',
    'd': 'в',
    'f': 'а',
    'g': 'п',
    'h': 'р',
    'j': 'о',
    'k': 'л',
    'l': 'д',
    ';': 'ж',
    '\'': 'э',
    'z': 'я',
    'x': 'ч',
    'c': 'с',
    'v': 'м',
    'b': 'и',
    'n': 'т',
    'm': 'ь',
    ',': 'б',
    '.': 'ю',
    '/': '.',
    '`': 'ё',
    '@': '"',
    '#': '№',
    '$': ';',
    '^': ':',
    '&': '?',
    'й': 'q',
    'ц': 'w',
    'у': 'e',
    'к': 'r',
    'е': 't',
    'н': 'y',
    'г': 'u',
    'ш': 'i',
    'щ': 'o',
    'з': 'p',
    'х': '[',
    'ъ': ']',
    'ф': 'a',
    'ы': 's',
    'в': 'd',
    'а': 'f',
    'п': 'g',
    'р': 'h',
    'о': 'j',
    'л': 'k',
    'д': 'l',
    'ж': ';',
    'э': '\'',
    'я': 'z',
    'ч': 'x',
    'с': 'c',
    'м': 'v',
    'и': 'b',
    'т': 'n',
    'ь': 'm',
    'б': ',',
    'ю': '.',
    'ё': '`',
    '№': '#'
  };

  var transliterateDictionary = {
    'ё': 'yo',
    'й': 'i',
    'ц': 'ts',
    'у': 'u',
    'к': 'k',
    'е': 'e',
    'н': 'n',
    'г': 'g',
    'ш': 'sh',
    'щ': 'sch',
    'з': 'z',
    'х': 'h',
    'ъ': '\'',
    'ф': 'f',
    'ы': 'i',
    'в': 'v',
    'а': 'a',
    'п': 'p',
    'р': 'r',
    'о': 'o',
    'л': 'l',
    'д': 'd',
    'ж': 'zh',
    'э': 'e',
    'я': 'ya',
    'ч': 'ch',
    'с': 's',
    'м': 'm',
    'и': 'i',
    'т': 't',
    'ь': '\'',
    'б': 'b',
    'ю': 'yu',
    'ë': 'ё',
    'j': 'й',
    'ts': 'ц',
    'u': 'у',
    'k': 'к',
    'e': 'е',
    'n': 'н',
    'g': 'г',
    'sh': 'ш',
    'sch': 'щ',
    'z': 'з',
    'h': 'х',
    '\"': 'ъ',
    'f': 'ф',
    'y': 'ы',
    'v': 'в',
    'a': 'а',
    'p': 'п',
    'r': 'р',
    'o': 'о',
    'l': 'л',
    'd': 'д',
    'zh': 'ж',
    'è': 'э',
    'ya': 'я',
    'ch': 'ч',
    's': 'с',
    'm': 'м',
    'i': 'и',
    't': 'т',
    '\'': 'ь',
    'b': 'б',
    'yu': 'ю'
  };

  /**
   * @constructor Filter results with auto-complete functionality.
   *
   * @param  {Object} el      input element
   * @param  {Object} options to override default values
   *
   * @return {Object}         new instance object
   */
  var _ = function(el, options) {
    this.el = el;

    this.options = extend(defaults, options || {});

    this.init();
  };

  /**
   * Fetch json data.
   *
   * @return {Object} ajax responce
   */
  _.prototype.getData = function() {
    var self = this;
    var url = url || this.options.url;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          self.options.data = JSON.parse(this.responseText);
        } else {
          // Error :(
          console.log('Error:', this.responseText);
        }
      }
    };

    request.send();
    request = null;
  };

  /**
   * Function to convert letters depend on dictionary.
   *
   * @param  {String} string
   * @param  {Object} dictionary
   *
   * @return {String} converted value
   */
  _.prototype.convert = function(string, dictionary) {

    return string.split('').map(function(char) {
      return dictionary[char] || char;
    }).join('');
  };

  /**
   * Filter data.
   *
   * @param  {Object} el input
   */
  _.prototype.filter = function(el) {
    var inputValue = el.value.trim().toLowerCase();
    var convertedValue = this.convert(inputValue, replaceDictionary);
    var transliteratedValue = this.convert(inputValue, transliterateDictionary);
    var transliteratedConvertedValue = this.convert(transliteratedValue, replaceDictionary);

    console.log({
      'strict ': inputValue,
      'converted ': convertedValue,
      'transliterated ': transliteratedValue,
      'transliterated converted ': transliteratedConvertedValue
    });

    // Reset dropdown list
    var itemsContainer = this.el.parentNode.querySelector('.c-filter-list');
    itemsContainer.innerHTML = '';

    for (var i = 0; i < this.options.data.users.length; i++) {
      var itemData = this.options.data.users[i];
      var fullName = (itemData.firstname + ' ' + itemData.lastname).toLowerCase();
      var isAvailable = false;

      // Check for strict, converted, transliterated, transliterated converted hit
      if (fullName.indexOf(inputValue) > -1 || fullName.indexOf(convertedValue) > -1 ||
        fullName.indexOf(transliteratedValue) > -1 || fullName.indexOf(transliteratedConvertedValue) > -1) {

        isAvailable = true;
      }

      // Append new list item
      if (isAvailable) {
        this.createItem(itemsContainer, itemData);
      }
    };
  };

  /**
   * Create item to display in list.
   *
   * @param  {Object} itemsContainer wrapper for future items
   * @param  {Object} data           item json data
   */
  _.prototype.createItem = function(itemsContainer, data) {
    var rawHtml = '<div class="c-filter-list__item">';

    // Show checkboxes if multiSelect option set
    if (this.options.multiSelect) {
      rawHtml += '<label class="o-switcher" for="filterItem[' + data.id + ']">' +
        '<input type="checkbox" id="filterItem[' + data.id + ']">' +
        '<label for="filterItem[' + data.id + ']"></label>' +
        '</label>';
    }

    // Show avatars only if set in options
    if (this.options.showAvatars) {
      rawHtml += '<img src="' + data.avatar + '" />';
    }

    rawHtml += data.firstname + ' ' + data.lastname + '</div><!-- /.c-filter-list__item -->';

    itemsContainer.innerHTML += rawHtml;
    $('.c-filter').appendChild(itemsContainer);
  };

  /** Instance init method. */
  _.prototype.init = function() {
    var self = this;

    // Fetch json data
    this.getData();

    // Get input value on changes
    // https://mathiasbynens.be/notes/oninput
    this.el.oninput = function() {
      this.onkeydown = null;

      // filter data from json
      self.filter(self.el);
    };

    this.el.onkeydown = function() {
      self.filter(self.el);
    };
  };

  /**
   * Merge defaults with user options.
   *
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   *
   * @returns {Object} Merged values of defaults and options
   */
  function extend(defaults, options) {
    var extended = {};
    var prop;

    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }

    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }

    return extended;
  }

  // querySelector alias
  function $(expr, con) {
    return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
  }

  // querySelectorAll alias
  function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
  }

  // IE8 foreach implementation
  function forEachElement(selector, fn) {
    var elements = document.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i);
    }
  }

  // Trim function for IE8
  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  // Console log for IE8
  if (typeof console === 'undefined' || typeof console.log === 'undefined') {
    console.log = function(message) {
      alert(message);
    };
  }

  /**
   * Some data can be passed here then Document is ready.
   *
   * @param  {Object} data orbitary data
   */
  function ready(data) {

    $$('input.js-filter').forEach(function(input) {

      new JsFilter(input);
    });
  }

  // Make sure to export JsFilter on self when in a browser
  if (typeof self !== 'undefined') {
    self.JsFilter = _;
  }

  // Expose JsFilter as a CJS module
  if (typeof exports === 'object') {
    module.exports = _;
  }

  // Are we in a browser? Check for Document constructor
  if (typeof Document !== 'undefined') {

    // DOM already loaded?
    if (document.readyState !== 'loading') {
      ready();
    } else {

      // Wait for it
      document.addEventListener('DOMContentLoaded', ready);
    }
  }

  return _;

}).call(this);
