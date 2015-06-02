module.exports =
  sass:
    files: [
      'app/sass/**/*.scss'
    ]
    tasks: [
      'sass'
      'autoprefixer'
    ]
    options:
      livereload: true
  js:
    files: [
      'app/js/**/*.js'
    ]
    tasks: [
      'jscs'
      'copy'
    ]
    options:
      livereload: true
  index:
    files: [
      'app/index.html'
    ]
    tasks: [
      'copy:index'
    ]
    options:
      livereload: true
