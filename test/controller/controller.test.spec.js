(function() {
    'use strict';

    var common = require("../common");
    var options = common.options;
    var assert = common.assert;
    var testingUtil = common.testingUtil;
    var mockGulpDest = common.mockGulpDest;
    var gulp = common.gulp;

    it('should put the controller file in the correct directory', function(done) {
        gulp.start('controller').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
            done();
        });
    });
    it('should put the correct controller filename', function(done) {
        gulp.start('controller').once('stop', function() {
            mockGulpDest.assertDestContains('myfilename-controller.js');
            mockGulpDest.assertDestContains('myfilename-controller.spec.js');
            done();
        });
    });

})();
