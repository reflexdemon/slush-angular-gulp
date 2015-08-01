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
            fileName: 'mydirective'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the directive file in the correct directory', function(done) {
        beforeEach();
        gulp.start('directive').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
            done();
        });
    });
    it('should put the correct directive filename', function(done) {
        beforeEach();
        gulp.start('directive').once('stop', function() {
            mockGulpDest.assertDestContains('mydirective-directive.js');
            done();
        });
    });

})();
