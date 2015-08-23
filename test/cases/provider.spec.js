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
            fileName: 'myprovider'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the provider file in the correct directory', function(done) {
        beforeEach();
        gulp.start('provider').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/module1');
            done();
        });
    });
    it('should put the correct provider filename', function(done) {
        beforeEach();
        gulp.start('provider').once('stop', function() {
            mockGulpDest.assertDestContains('myprovider-provider.js');
            done();
        });
    });

})();
