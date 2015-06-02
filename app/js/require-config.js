(function() {
  'use strict';
  require.config({
    paths: {
      'jsfilter': 'jsfilter'
    },
    shim: {}
  });

  require(['app'], function() {

    // Initialization
    [].forEach.call(document.querySelectorAll('input.js-filter'), function(el) {
      var myFilter = new JsFilter(el);

      // Example of ajax request for specific url
      // myFilter.getData('http://google.com');
    });

  });

}).call(this);
