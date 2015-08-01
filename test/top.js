(function() {
    'use strict';

    function importTest(name, path) {
        describe(name, function() {
            require(path);
        });
    }

    var common = require("./common");
    var testingUtil = common.testingUtil;
    var util = common.util;
    var _ = common._;

    var testSuite = [{
        description: 'Test the Application generator',
        testcase: './cases/app.spec'
    }, {
        description: 'Test the Constants generator',
        testcase: './cases/constant.spec'
    }, {
        description: 'Test controller generator with test',
        testcase: './cases/controller.test.spec'
    }];

    require('blanket')({
        pattern: function(filename) {
            return !/node_modules/.test(filename);
        }
    });

    //Load the main slush file for testing
    require('../slushfile');

    describe('slush-angular-gulp', function() {
        // before(function() {
        //     process.chdir(__dirname);
        // });

        function beforeEach() {
            process.chdir(__dirname);
            testingUtil.mockPrompt({
                name: 'module',
                example: ['todo'],
                module: 'module1',
                fileName: 'myfilename',
                test: true
            });
            util.setRuntimeMode('TEST');
        }
        _.each(testSuite, function(tCase) {
            importTest(tCase.description, tCase.testcase);
        });


        after(function() {
            console.log('Completed.');
        });
    });

})();
