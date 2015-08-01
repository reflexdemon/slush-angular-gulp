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
            module: 'mymodule',
            config: 'config'
        });
        util.setRuntimeMode('TEST');
    }

    it('should put the module file in the correct directory', function(done) {
        beforeEach();
        gulp.start('module').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/mymodule');
            done();
        });
    });
    it('should put the correct module filename', function(done) {
        beforeEach();
        gulp.start('module').once('stop', function() {
            mockGulpDest.assertDestContains('mymodule-config.js');
            done();
        });
    });

})();
