module.exports =
  options:
    browsers: [
      'last 2 versions', 'ie 8', 'ie 9'
    ]
    map: false
  css:
    expand: true
    flatten: true
    src: 'dist/css/styles.min.css'
    dest: 'dist/css/'
