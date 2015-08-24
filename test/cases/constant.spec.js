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
            module: 'module1',
            fileName: 'myconstant'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the constant file in the correct directory', function(done) {
        beforeEach();
        gulp.start('constant').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/module1');
            done();
        });
    });
    it('should put the correct constant filename', function(done) {
        beforeEach();
        gulp.start('constant').once('stop', function() {
            mockGulpDest.assertDestContains('myconstant-constant.js')
            done();
        });
    });

})();
