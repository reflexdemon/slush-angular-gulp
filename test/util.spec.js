(function() {
    'use strict';

    var inquirer = require('inquirer');

    /**
     * Mock inquirer prompt
     */
    module.exports.mockPrompt = function(answers) {
        inquirer.prompt = function(prompts, done) {
            [].concat(prompts).forEach(function(prompt) {
                if (!(prompt.name in answers)) {
                    answers[prompt.name] = prompt.default;
                }
            });
            done(answers);
        };
    }
})();
