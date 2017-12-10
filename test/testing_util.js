(function() {
    'use strict';

    var _ = require('lodash')
    var inquirer = require('inquirer');

    /**
     * Mock inquirer prompt
     */
    module.exports.mockPrompt = function(answers) {

        inquirer.prompt = function(prompts) {
            [].concat(prompts).forEach(function(prompt) {
                if (!(prompt.name in answers)) {
                    if (_.isNumber(prompt) && prompt.choices && _.isArray(prompt.choices)) {
                        answers[prompt.name] = prompt.choices[prompt.default];
                    } else {
                        answers[prompt.name] = prompt.default;
                    }
                }
            });
            return new Promise(function(done, reject) {
                done(answers);
            })
        };
        inquirer.prompt.UI = {};

    };


    module.exports.promisedMap = function(array, transform) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
              resolve(array.map(transform));
            }, 100);
          });
    }
})();
