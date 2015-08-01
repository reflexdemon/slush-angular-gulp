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
            fileName: 'myservice'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the service file in the correct directory', function(done) {
        beforeEach();
        gulp.start('service').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
            done();
        });
    });
    it('should put the correct service filename', function(done) {
        beforeEach();
        gulp.start('service').once('stop', function() {
            mockGulpDest.assertDestContains('myservice-service.js');
            done();
        });
    });

})();
