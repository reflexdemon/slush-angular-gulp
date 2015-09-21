(function() {
    'use strict';
    var chai = require("chai");

    var gulp = require('gulp'),
        testingUtil = require('./testing_util'),
        util = require('../util'),
        path = require('path'),
        _ = require('lodash'),
        mockGulpDest = require('mock-gulp-dest')(gulp);

    var assert = require('assertthat')

    var options = {
      runtime : 'TEST'
    };


    exports._  =  _;
    exports.assert = assert;
    exports.chai = chai;
    exports.path = path;
    exports.gulp  =  gulp;
    exports.mockGulpDest  =  mockGulpDest;
    exports.testingUtil  =  testingUtil;
    exports.util  =  util;

    exports.options = options;

})();
