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
        util.setRuntimeMode('LIVE');
        testingUtil.mockPrompt({
            module: 'module1',
            fileName: 'strangefilename',
            test: true
        });
    }

    it('test for error constant', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('constant', ['test']);
        }).is.throwing();
    });
    it('test for error controller', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('controller');
        }).is.throwing();
    });
    it('test for error service', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('service');
        }).is.throwing();
    });
    it('test for error decorator', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('decorator');
        }).is.throwing();
    });
    it('test for error directive', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('directive');
        }).is.throwing();
    });
    it('test for error factory', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('factory');
        }).is.throwing();
    });
    it('test for error filter', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('filter');
        }).is.throwing();
    });
    it('test for error provider', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('provider');
        }).is.throwing();
    });
    it('test for error route', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('route');
        }).is.throwing();
    });
    it('test for error value', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('value');
        }).is.throwing();
    });
    it('test for error view', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('view');
        }).is.throwing();
    });
it('test for error constant', function(done) {
        beforeEach();
        assert.that(function() {
            done();
            gulp.start('constant', ['test']);
        }).is.throwing();
    });
})();
