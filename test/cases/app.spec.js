(function() {
    'use strict';

    var common = require("../common");
    var options = common.options;
    var assert = common.assert;
    var testingUtil = common.testingUtil;
    var mockGulpDest = common.mockGulpDest;
    var gulp = common.gulp;




    it('should put all project files in current working directory', function(done) {
        gulp.start('default').once('stop', function() {
            // mockGulpDest.cwd().should.equal(__dirname);
            // mockGulpDest.basePath().should.equal(__dirname);

            assert.that(mockGulpDest.cwd() + '/app').is.equalTo(__dirname);
            assert.that(mockGulpDest.basePath() + '/app').is.equalTo(__dirname);
            done();
        });
    });
    it('should add dot files to project root', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains([
                '.bowerrc',
                '.csslintrc',
                '.editorconfig',
                '.gitignore',
                '.jshintrc'
            ]);
            done();
        });
    });
    it('should add bower.json and package.json to project root', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains([
                'package.json',
                'bower.json'
            ]);
            done();
        });
    });
    it('should add a gulpfile to project root', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('gulpfile.js');
            done();
        });
    });
    it('should add a karma config file to project root', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('karma.conf.js');
            done();
        });
    });
    it('should add a readme file to project root', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('README.md');
            done();
        });
    });
    it('should add an index.html to the app folder', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/index.html');
            done();
        });
    });
    it('should add a JavaScript app module definition file by default', function(done) {
        testingUtil.mockPrompt({
            name: 'module'
        });
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/app.js');
            done();
        });
    });
    it('should create a gitkeep file in the app assets dir', function(done) {
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/assets/.gitkeep');
            done();
        });
    });

})();
