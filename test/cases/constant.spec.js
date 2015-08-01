(function() {
    'use strict';

    var common = require("../common");
    var options = common.options;
    var assert = common.assert;
    var testingUtil = common.testingUtil;
    var mockGulpDest = common.mockGulpDest;
    var gulp = common.gulp;

    it('should put the constant file in the correct directory', function(done) {
        gulp.start('constant').once('stop', function() {
            assert.that(mockGulpDest.basePath()).is.endingWith('src/app/components/module1');
            done();
        });
    });
    it('should put the correct constant filename', function(done) {
        gulp.start('constant').once('stop', function() {
          console.log('mockGulpDest.files', mockGulpDest.files());
            mockGulpDest.assertDestContains('myfilename-constant.js')
            done();
        });
    });

})();

