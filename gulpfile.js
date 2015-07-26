var gulp = require('gulp');
var mocha = require('gulp-mocha');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var cover = require('gulp-coverage');

gutil.log = gutil.noop;

gulp.task('test', function() {
    gulp.src('test/default.spec.js')
        .pipe(stripDebug())
        .pipe(mocha({
            reporter: 'html-cov',
            clearRequireCache: true,
            ignoreLeaks: true
        }));
});

gulp.task('coverage', function() {
    return gulp.src(['./slushfile.js', './tasks/*.js'], {
            read: false
        })
        .pipe(cover.instrument({
            pattern: ['./test/*.spec.js'],
            debugDirectory: 'debug'
        }))
        .pipe(mocha({
            reporter: 'html-cov',
            ignoreLeaks: true
        }))
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});
