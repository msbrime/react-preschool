var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');


var io = {
    src: "./assets/",
    dest: "./build/"
};

var css = {
    input: io.src + "css/main.scss",
    output: io.dest + "css/",
    watch: io.src + "css/**/*.*"
}

gulp.task("sass", function () {
    return gulp.src(css.input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(css.output));
});

gulp.task('watch', ['sass'], function () {
    gulp.watch(css.watch, ['sass']);
});