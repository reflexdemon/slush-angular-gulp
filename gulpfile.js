var bump = require('gulp-bump');
var fs = require('fs');
var git = require('gulp-git');
var gulp = require('gulp');
var semver = require('semver');
var spawn = require('child_process').spawn;
var argv = require('yargs').argv;
var gulpSequence = require('gulp-sequence');

/**
 * Pulls the package json from fs
 */
var getPackageJson = function() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

var newVer;
// one of  major, premajor, minor, preminor, patch, prepatch, or prerelease
var incrementType = argv.type || 'patch';

gulp.task('init', function() {
    // increment version
    var pkg = getPackageJson();
    newVer = semver.inc(pkg.version, incrementType);
});

// Override the tab size for indenting
// (or simply omit to keep the current formatting)
gulp.task('bump', function() {
    gulp.src('./package.json')
        .pipe(bump({
            version: newVer
        }))
        .pipe(gulp.dest('./'));
});

// Run git add
// src is the file(s) to add (or ./*)
gulp.task('git-add', function() {
    return gulp.src('./package.json')
        .pipe(git.add());
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('git-commit', function() {
    return gulp.src('./package.json')
        .pipe(git.commit('Publishing ' + newVer));
});

// Tag the repo with a version
gulp.task('git-tag', function() {
    git.tag('v' + newVer, 'Publishing slush-angular-gulp@v' + newVer, function(err) {
        if (err) throw err;
    });
});

/**
 * Publish the changes to npm repo
 */
gulp.task('npm-publish', function(done) {
    spawn('npm', ['publish'], {
        stdio: 'inherit'
    }).on('close', done);
});

// Run git push
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('git-push', function() {
    git.push('origin', 'master', function(err) {
        if (err) throw err;
    });
});

// Run git push
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('git-push-tag', function() {
    spawn('git', ['push', ' --tags'], {
        stdio: 'inherit'
    }).on('close', done);
});

gulp.task('publish', gulpSequence('init', 'bump', 'git-add', 'git-commit', 'git-push', 'git-tag', 'git-push-tag', 'npm-publish'));
