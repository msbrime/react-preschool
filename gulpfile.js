var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync').create(),
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
        console.log(cssPaths.input);
    return gulp.src(cssPaths.input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssPaths.output))
        .pipe(browserSync.stream());
});

gulp.task('bundle',function () {
    return gulp.src(jsPaths.input)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(jsPaths.output));
});

gulp.task('watch', ['sass','bundle'], function () {
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

