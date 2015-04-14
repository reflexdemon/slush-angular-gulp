/* jshint node:true */
/**
 * MIT licensed, see LICENSE file
 * Copyright (c) Venkateswara VP <reflexdemon@github>
 */

(function() {
    'use strict';
    var gulp = require('gulp'),
        testingUtil = require('./util.spec'),
        mockGulpDest = require('mock-gulp-dest')(gulp);

    var assert = require('assertthat');

    require('../slushfile');
    describe('slush-angular-gulp', function() {
        before(function() {
            process.chdir(__dirname);
        });
        describe('default generator', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    name: 'module',
                    example: false
                });
            });
            it('should put all project files in current working directory', function(done) {
                gulp.start('default').once('stop', function() {
                    // mockGulpDest.cwd().should.equal(__dirname);
                    // mockGulpDest.basePath().should.equal(__dirname);

                    assert.that(mockGulpDest.cwd()).is.equalTo(__dirname);
                    assert.that(mockGulpDest.basePath()).is.equalTo(__dirname);
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
                    name: 'module',
                    example: false
                });
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/app.js');
                    mockGulpDest.assertDestNotContains('src/app/app.coffee');
                    done();
                });
            });
            it('should add a CoffeeScript app module definition file if CoffeeScript is chosen', function(done) {
                testingUtil.mockPrompt({
                    name: 'module',
                    example: false,
                    coffee: true
                });
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestNotContains('src/app/app.js');
                    mockGulpDest.assertDestContains('src/app/app.coffee');
                    done();
                });
            });
            it('should create a gitkeep file in the app assets dir', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/assets/.gitkeep');
                    done();
                });
            });
            describe('Todo example', function() {
                it('should not add any todo example files by default', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        example: false
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestNotContains({
                            'src/app/todo': [
                                'todo.html',
                                'todo.js',
                                'todo-controller.js',
                                'todo-controller.spec.js',
                                'todo.coffee',
                                'todo-controller.coffee',
                                'todo-controller_test.coffee',
                                'todo.styl',
                                'todo.less',
                                'todo.scss'
                            ]
                        });
                        done();
                    });
                });
                describe('When Todo example is included', function() {
                    beforeEach(function() {
                        testingUtil.mockPrompt({
                            name: 'module',
                            example: true
                        });
                    });
                    it('should add a module specific template', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/todo/todo.html');
                            done();
                        });
                    });
                    it('should add a module definition file for the Todo module', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/todo/todo.js');
                            done();
                        });
                    });
                    it('should add a Todo controller with a corresponding test file', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains([
                                'src/app/todo/todo-controller.js',
                                'src/app/todo/todo-controller.spec.js'
                            ]);
                            done();
                        });
                    });
                    describe('When CoffeeScript is chosen', function() {
                        beforeEach(function() {
                            testingUtil.mockPrompt({
                                name: 'module',
                                example: true,
                                coffee: true
                            });
                        });
                        it('should add a CoffeeScript module definition file', function(done) {
                            gulp.start('default').once('stop', function() {
                                mockGulpDest.assertDestContains('src/app/todo/todo.coffee');
                                done();
                            });
                        });
                        it('should add a CoffeeScript Todo controller with a corresponding test file', function(done) {
                            gulp.start('default').once('stop', function() {
                                mockGulpDest.assertDestContains([
                                    'src/app/todo/todo-controller.coffee',
                                    'src/app/todo/todo-controller_test.coffee'
                                ]);
                                done();
                            });
                        });
                    });
                });
            });
            describe('CSS files', function() {
                it('should add stylus stylesheets by default', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        example: true
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestContains([
                            'src/app/app.styl',
                            'src/app/styles/_base.styl',
                            'src/app/todo/todo.styl'
                        ]);
                        done();
                    });
                });
                it('should add LESS stylesheets when LESS is chosen', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        csstype: 'less',
                        example: true
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
                        example: true
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
        });

    });

})();
