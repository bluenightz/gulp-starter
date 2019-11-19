var gulp = require('gulp');
var config = require('../config.js');

gulp.task('copy:fonts', function () {
    return gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:data', function () {
    return gulp
        .src(config.src.data + '/**/*.*')
        .pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:lib', function () {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function () {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function () {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:video', function () {
    return gulp
        .src([
            config.src.img + '/**/*.mp4'
        ])
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:js', function () {
    return gulp
        .src([
            config.src.js + '/animation.gsap.js',
            config.src.js + '/modernizr.js',
        ])
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('copy', [
    'copy:img',
    'copy:video',
    'copy:js',
    // 'copy:rootfiles',
    // 'copy:lib',
    // 'copy:data',
    'copy:fonts'
]);

gulp.task('copy:watch', function () {
    gulp.watch(config.src.img + '/*', ['copy']);
});