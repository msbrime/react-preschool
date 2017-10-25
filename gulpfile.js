var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    path = require('path'),

    io = {
        assets: path.resolve(__dirname + "/assets/"),
        app: path.resolve(__dirname + "/app/"),
        dest: path.resolve(__dirname + "/build/"),
    },

    cssPaths = {
        input: io.assets + "/css/main.scss",
        output: io.dest + "/css/",
        watch: io.assets + "/css/**/*.*"
    },

    jsPaths = {
        input : io.app + '/index.jsx',
        watch : [ io.app + '/**/*.js' , io.app + '/**/*.jsx'],
        output : io.dest
    }


gulp.task("sass", function () {
    return gulp.src(cssPaths.input)
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssPaths.output))
        .pipe(browserSync.stream());
});

gulp.task('bundle',function () {
    return gulp.src(jsPaths.input)
        .pipe(plumber())
        .pipe(webpackStream(require('./webpack.config.js'),webpack))
        .pipe(gulp.dest(jsPaths.output));
});

gulp.task('build',['sass','bundle']);

gulp.task('watch', ['build'], function () {
    gulp.watch(cssPaths.watch, ['sass']);
    gulp.watch(jsPaths.watch,['bundle']).on('change',browserSync.reload)
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
});

gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
});

