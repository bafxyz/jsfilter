module.exports =
  browser:
    options:
      name: 'require-config'
      optimize: 'uglify2'
      baseUrl: 'dist/js'
      mainConfigFile: 'dist/js/require-config.js'
      out: 'dist/js/main.min.js'
      generateSourceMaps: true
      preserveLicenseComments: false
      useStrict: true
      findNestedDependencies: true
