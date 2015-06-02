module.exports =
  index:
    expand: true
    cwd: 'app'
    src: [
      'index.html'
    ],
    dest: 'dist'
    filter: 'isFile'

  js:
    expand: true
    cwd: 'app'
    src: [
      'js/**'
    ],
    dest: 'dist'
    filter: 'isFile'

  json:
    expand: true
    cwd: 'app'
    src: [
      '*.json'
    ],
    dest: 'dist'
    filter: 'isFile'
