var
    gulp = require('gulp'),
    sass = require('gulp-sass');


var io = {
    src: "./assets/",
    dest: "./build/"
};


var css = {
    input: io.src + "css/**/*",
    output: io.dest + "css/",
    watch: io.src + "css/**/*"
}


gulp.task("sass", function () {
    return gulp.src(css.input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(css.output));
});