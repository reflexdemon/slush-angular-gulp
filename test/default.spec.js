/* jshint node:true */
/**
 * MIT licensed, see LICENSE file
 * Copyright (c) Venkateswara VP <reflexdemon@github>
 */
// mocha test/default.spec.js -R html-cov > coverage.html
(function() {
    'use strict';
    require('blanket')({
        pattern: function(filename) {
            return !/node_modules/.test(filename);
        }
    });
    var gulp = require('gulp'),
        testingUtil = require('./testing_util'),
        util = require('../util'),
        _ = require('lodash'),
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
                    name: 'module'
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
            describe('Todo example', function() {
                it('should not add any todo example files by default', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module'
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestNotContains({
                            'src/app/components/todo': [
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
                    beforeEach(function() {
                        testingUtil.mockPrompt({
                            name: 'module',
                            example: ['todo']
                        });
                    });
                    it('should add a module specific template', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/components/todo/todo.html');
                            done();
                        });
                    });
                    it('should add a module definition file for the Todo module', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/components/todo/todo.js');
                            done();
                        });
                    });
                    it('should add a Todo controller with a corresponding test file', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains([
                                'src/app/components/todo/todo-controller.js',
                                'src/app/components/todo/todo-controller.spec.js'
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
                            'src/app/components/todo/todo.less'
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
                            'src/app/components/todo/todo.less'
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
                            'src/app/components/todo/todo.scss'
                        ]);
                        done();
                    });
                });
            });
        });
        ///////////// Constants ////////////
        describe('constant generator', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myconstant'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the constant file in the correct directory', function(done) {
                gulp.start('constant').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct constant filename', function(done) {
                gulp.start('constant').once('stop', function() {
                    mockGulpDest.assertDestContains('myconstant-constant.js')
                    done();
                });
            });
        });
        ///////////// Controllers ////////////
        describe('controller generator with test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'mycontroller',
                    test: true
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the controller file in the correct directory', function(done) {
                gulp.start('controller').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct controller filename', function(done) {
                gulp.start('controller').once('stop', function() {
                    mockGulpDest.assertDestContains('mycontroller-controller.js');
                    mockGulpDest.assertDestContains('mycontroller-controller.spec.js');
                    done();
                });
            });

        }); // With test controller
        describe('controller generator without test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'mycontroller',
                    test: false
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the controller file in the correct directory', function(done) {
                gulp.start('controller').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct controller filename', function(done) {
                gulp.start('controller').once('stop', function() {
                    mockGulpDest.assertDestContains('mycontroller-controller.js');
                    done();
                });
            });

        }); // With out test controller
        describe('decorator generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'mydecorator'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the decorator file in the correct directory', function(done) {
                gulp.start('decorator').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct decorator filename', function(done) {
                gulp.start('decorator').once('stop', function() {
                    mockGulpDest.assertDestContains('mydecorator-decorator.js');
                    done();
                });
            });

        }); // decorator test
        describe('directive generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'mydirective'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the directive file in the correct directory', function(done) {
                gulp.start('directive').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct directive filename', function(done) {
                gulp.start('directive').once('stop', function() {
                    mockGulpDest.assertDestContains('mydirective-directive.js');
                    done();
                });
            });

        }); // directive test
        describe('factory generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myfactory'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the factory file in the correct directory', function(done) {
                gulp.start('factory').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct factory filename', function(done) {
                gulp.start('factory').once('stop', function() {
                    mockGulpDest.assertDestContains('myfactory-factory.js');
                    done();
                });
            });

        }); // factory test
        describe('filter generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myfilter'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the filter file in the correct directory', function(done) {
                gulp.start('filter').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct filter filename', function(done) {
                gulp.start('filter').once('stop', function() {
                    mockGulpDest.assertDestContains('myfilter-filter.js');
                    done();
                });
            });

        }); // filter test
        describe('module - config generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'mymodule',
                    config: 'config'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the module file in the correct directory', function(done) {
                gulp.start('module').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/mymodule');
                    done();
                });
            });
            it('should put the correct module filename', function(done) {
                gulp.start('module').once('stop', function() {
                    mockGulpDest.assertDestContains('mymodule-config.js');
                    done();
                });
            });

        }); // module test
        describe('module - routes generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'mymodule',
                    config: 'routes'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the module file in the correct directory', function(done) {
                gulp.start('module').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/mymodule');
                    done();
                });
            });
            it('should put the correct module filename', function(done) {
                gulp.start('module').once('stop', function() {
                    mockGulpDest.assertDestContains('mymodule-routes.js');
                    done();
                });
            });

        }); // module test
        describe('provider generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myprovider'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the provider file in the correct directory', function(done) {
                gulp.start('provider').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct provider filename', function(done) {
                gulp.start('provider').once('stop', function() {
                    mockGulpDest.assertDestContains('myprovider-provider.js');
                    done();
                });
            });

        }); // provider test
        describe('route generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myroute'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the route file in the correct directory', function(done) {
                gulp.start('route').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct route filename', function(done) {
                gulp.start('route').once('stop', function() {
                    mockGulpDest.assertDestContains('myroute-route.js');
                    done();
                });
            });

        }); // route test
        describe('service generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myservice'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the service file in the correct directory', function(done) {
                gulp.start('service').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct service filename', function(done) {
                gulp.start('service').once('stop', function() {
                    mockGulpDest.assertDestContains('myservice-service.js');
                    done();
                });
            });

        }); // service test
        describe('value generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myvalue'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the value file in the correct directory', function(done) {
                gulp.start('value').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct value filename', function(done) {
                gulp.start('value').once('stop', function() {
                    mockGulpDest.assertDestContains('myvalue-value.js');
                    done();
                });
            });

        }); // value test
        describe('view generator test', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'myview'
                });
                util.setRuntimeMode('TEST');
            });
            it('should put the view file in the correct directory', function(done) {
                gulp.start('view').once('stop', function() {
                    assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
                    done();
                });
            });
            it('should put the correct view filename', function(done) {
                gulp.start('view').once('stop', function() {
                    mockGulpDest.assertDestContains('myview-view.html');
                    done();
                });
            });

        }); // view test
        describe('Negative case testing:', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    module: 'module1',
                    fileName: 'strangefilename',
                    test : true
                });
                util.setRuntimeMode('LIVE');
            });
            it('test for error constant', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('constant', ['test']);
                }).is.throwing();
            });
            it('test for error controller', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('controller');
                }).is.throwing();
            });
            it('test for error service', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('service');
                }).is.throwing();
            });
            it('test for error decorator', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('decorator');
                }).is.throwing();
            });
            it('test for error directive', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('directive');
                }).is.throwing();
            });
            it('test for error factory', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('factory');
                }).is.throwing();
            });
            it('test for error filter', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('filter');
                }).is.throwing();
            });
            it('test for error provider', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('provider');
                }).is.throwing();
            });
            it('test for error route', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('route');
                }).is.throwing();
            });
            it('test for error value', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('value');
                }).is.throwing();
            });
            it('test for error view', function(done) {
                assert.that(function() {
                    done();
                    gulp.start('view');
                }).is.throwing();
            });

        }); // view negative

    });

})();
