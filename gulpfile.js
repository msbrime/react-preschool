var
    { task, series, parallel, src, dest, watch } = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    path = require('path'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    cleanCss= require('gulp-clean-css'),

    io = {
        assets: path.resolve(__dirname + "/assets/"),
        app: path.resolve(__dirname + "/app/"),
        dest: path.resolve(__dirname + "/build/"),
    },
    
    imagePaths = {
        input: io.assets + "/images/**/*.*",
        output: io.dest + "/images/",
        watch: io.assets + "/images/**/*.*"
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
    },
        
    sassConfig = { 
        outputStyle: 'compressed',
        includePaths: [
            "./node_modules/foundation-sites",
            "./node_modules/animate.css",
            "./node_modules/normalize-scss"
        ]
    };

task("sass", function () {
    return src(cssPaths.input)
        .pipe(plumber())
        .pipe(sass(sassConfig))
        .pipe(autoprefixer())
        .pipe(cleanCss({level:{1:{ specialComments:false }}}))
        .pipe(dest(cssPaths.output))
        .pipe(browserSync.stream());
});

task("images",function(){
    return src(imagePaths.input)
        .pipe(newer(imagePaths.output))
        .pipe(imagemin())
        .pipe(dest(imagePaths.output));
});

task('bundle',function () {
    return src(jsPaths.input)
        .pipe(plumber())
        .pipe(webpackStream(require('./webpack.config.js'),webpack))
        .pipe(dest(jsPaths.output))
});

task('bundle:watch',series('bundle',function (done) {
    browserSync.reload();
    done();
}));

task('images:watch',series('images',function (done) {
    browserSync.reload();
    done();
}));

task('serve',function(done){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
    done();
});

task('build',parallel('sass','images','bundle'));

task('watch', series('build','serve', function () {
    watch(cssPaths.watch, series('sass'));
    watch(imagePaths.watch, series('images:watch'));
    watch(jsPaths.watch,series('bundle:watch'));
}));