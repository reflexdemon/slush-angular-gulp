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
        testcase: './app/app.spec'
    }, {
        description: 'Test the Constants generator',
        testcase: './constant/constant.spec'
    }, {
        description: 'Test controller generator with test',
        testcase: './controller/controller.test.spec'
    }];

    //Load the main slush file for testing
    require('../slushfile');

    describe('slush-angular-gulp', function() {
        before(function() {
            process.chdir(__dirname);
        });

        function beforeEach() {
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
