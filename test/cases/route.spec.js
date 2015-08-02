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
            fileName: 'myroute'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the route file in the correct directory', function(done) {
        beforeEach();
        gulp.start('route').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
            done();
        });
    });
    it('should put the correct route filename', function(done) {
        beforeEach();
        gulp.start('route').once('stop', function() {
            mockGulpDest.assertDestContains('myroute-route.js');
            done();
        });
    });

})();
