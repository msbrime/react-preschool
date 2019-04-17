/* eslint-disable no-path-concat */
var { task, series, parallel, src, dest, watch } = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var webpackStream = require('webpack-stream')
var webpack = require('webpack')
var browserSync = require('browser-sync').create()
var plumber = require('gulp-plumber')
var path = require('path')
var newer = require('gulp-newer')
var imagemin = require('gulp-imagemin')
var cleanCss = require('gulp-clean-css')

var io = {
  assets: path.resolve(__dirname + '/assets/'),
  app: path.resolve(__dirname + '/app/'),
  dest: path.resolve(__dirname + '/build/')
}

var imagePaths = {
  input: io.assets + '/images/**/*.*',
  output: io.dest + '/images/',
  watch: io.assets + '/images/**/*.*'
}

var cssPaths = {
  input: io.assets + '/css/main.scss',
  output: io.dest + '/css/',
  watch: io.assets + '/css/**/*.*'
}

var jsPaths = {
  input: io.app + '/index.jsx',
  watch: [ io.app + '/**/*.js', io.app + '/**/*.jsx' ],
  output: io.dest
}

var sassConfig = {
  outputStyle: 'compressed',
  includePaths: [
    './node_modules/foundation-sites',
    './node_modules/animate.css',
    './node_modules/normalize-scss'
  ]
}

task('sass', function () {
  return src(cssPaths.input)
    .pipe(plumber())
    .pipe(sass(sassConfig))
    .pipe(autoprefixer())
    .pipe(cleanCss({ level: { 1: { specialComments: false } } }))
    .pipe(dest(cssPaths.output))
    .pipe(browserSync.stream())
})

task('images', function () {
  return src(imagePaths.input)
    .pipe(newer(imagePaths.output))
    .pipe(imagemin())
    .pipe(dest(imagePaths.output))
})

task('bundle', function () {
  return src(jsPaths.input)
    .pipe(plumber())
    .pipe(webpackStream(require('./webpack.config.js'), webpack))
    .pipe(dest(jsPaths.output))
})

task('bundle:watch', series('bundle', function (done) {
  browserSync.reload()
  done()
}))

task('images:watch', series('images', function (done) {
  browserSync.reload()
  done()
}))

task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  done()
})

task('build', parallel('sass', 'images', 'bundle'))

task('watch', series('build', 'serve', function () {
  watch(cssPaths.watch, series('sass'))
  watch(imagePaths.watch, series('images:watch'))
  watch(jsPaths.watch, series('bundle:watch'))
}))
