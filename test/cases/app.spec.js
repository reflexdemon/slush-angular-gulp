(function() {
    'use strict';

    var common = require("../common");
    var options = common.options;
    var assert = common.assert;
    var testingUtil = common.testingUtil;
    var util = common.util;
    var mockGulpDest = common.mockGulpDest;
    var gulp = common.gulp;


    function beforeEach() {
        process.chdir(__dirname);
        testingUtil.mockPrompt({
            name: 'module'
        });
        util.setRuntimeMode('TEST');
    }


    it('should put all project files in current working directory', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            // mockGulpDest.cwd().should.equal(__dirname);
            // mockGulpDest.basePath().should.equal(__dirname);

            assert.that(mockGulpDest.cwd()).is.equalTo(__dirname);
            assert.that(mockGulpDest.basePath()).is.equalTo(__dirname);
            done();
        });
    });
    it('should add dot files to project root', function(done) {
        beforeEach();
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
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains([
                'package.json',
                'bower.json'
            ]);
            done();
        });
    });
    it('should add a gulpfile to project root', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('gulpfile.js');
            done();
        });
    });
    it('should add a karma config file to project root', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('karma.conf.js');
            done();
        });
    });
    it('should add a readme file to project root', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('README.md');
            done();
        });
    });
    it('should add an index.html to the app folder', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/index.html');
            done();
        });
    });
    it('should add a JavaScript app module definition file by default', function(done) {
        testingUtil.mockPrompt({
            name: 'module'
        });
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/app.js');
            done();
        });
    });
    it('should create a gitkeep file in the app assets dir', function(done) {
        beforeEach();
        gulp.start('default').once('stop', function() {
            mockGulpDest.assertDestContains('src/app/assets/.gitkeep');
            done();
        });
    });

    //Deep example
    describe('Todo example', function() {
        it('should not add any todo example files by default', function(done) {
            testingUtil.mockPrompt({
                name: 'module'
            });
            gulp.start('default').once('stop', function() {
                mockGulpDest.assertDestNotContains({
                    'src/app/todo': [
                        'todo.js',
                        'todo.html',
                        'todo.css',
                        'todo-route.js',
                        'todo-controller.spec.js',
                        'todo-controller.js'
                    ]
                });
                done();
            });
        });
        describe('When Todo example is included', function() {
            function beforeEachTODO() {
                testingUtil.mockPrompt({
                    name: 'module',
                    example: ['todo']
                });
            }
            it('should add a module specific template', function(done) {
                beforeEachTODO();
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/todo/todo.html');
                    done();
                });
            });
            it('should add a module definition file for the Todo module', function(done) {
                beforeEachTODO();
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/todo/todo.js');
                    done();
                });
            });
            it('should add a Todo controller with a corresponding test file', function(done) {
                beforeEachTODO();
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains([
                        'src/app/todo/todo-controller.js',
                        'src/app/todo/todo-controller.spec.js'
                    ]);
                    done();
                });
            });
        });
    });
    describe('CSS files', function() {
        it('should add less stylesheets by default', function(done) {
            testingUtil.mockPrompt({
                name: 'module',
                example: ['todo']
            });
            gulp.start('default').once('stop', function() {
                mockGulpDest.assertDestContains([
                    'src/app/app.less',
                    'src/app/styles/_base.less',
                    'src/app/todo/todo.less'
                ]);
                done();
            });
        });
        it('should add LESS stylesheets when LESS is chosen', function(done) {
            testingUtil.mockPrompt({
                name: 'module',
                csstype: 'less',
                example: ['todo']
            });
            gulp.start('default').once('stop', function() {
                mockGulpDest.assertDestContains([
                    'src/app/app.less',
                    'src/app/styles/_base.less',
                    'src/app/todo/todo.less'
                ]);
                done();
            });
        });
        it('should add Sass stylesheets when Sass is chosen', function(done) {
            testingUtil.mockPrompt({
                name: 'module',
                csstype: 'sass',
                example: ['todo']
            });
            gulp.start('default').once('stop', function() {
                mockGulpDest.assertDestContains([
                    'src/app/app.scss',
                    'src/app/styles/_base.scss',
                    'src/app/todo/todo.scss'
                ]);
                done();
            });
        });
    });

})();
