(function() {
    'use strict';

    var common = require("../common");
    var options = common.options;
    var assert = common.assert;
    var testingUtil = common.testingUtil;
    var mockGulpDest = common.mockGulpDest;
    var gulp = common.gulp;
    var util = common.util;

    function beforeEach() {
        process.chdir(__dirname);
        testingUtil.mockPrompt({
            module: 'module1',
            fileName: 'mydecorator'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the decorator file in the correct directory', function(done) {
        beforeEach();
        gulp.start('decorator').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src' + common.path.sep + 'app' + common.path.sep + 'module1');
            done();
        });
    });
    it('should put the correct decorator filename', function(done) {
        beforeEach();
        gulp.start('decorator').once('stop', function() {
            mockGulpDest.assertDestContains('mydecorator-decorator.js');
            done();
        });
    });

})();
