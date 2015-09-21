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
            fileName: 'myvalue'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the value file in the correct directory', function(done) {
        beforeEach();
        gulp.start('value').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src' + common.path.sep + 'app' + common.path.sep + 'module1');
            done();
        });
    });
    it('should put the correct value filename', function(done) {
        beforeEach();
        gulp.start('value').once('stop', function() {
            mockGulpDest.assertDestContains('myvalue-value.js');
            done();
        });
    });

})();
