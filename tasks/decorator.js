/**
 * decorator Task
 * This is the main task that is invoked for the processing of the slushfile.js
 */

(function() {
var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer')
    _ = require('underscore.string');

//Local dependencies
var util = require('../util');

module.exports = function(gulp) {
    'use strict';

    gulp.task('decorator', function(done) {
        var _this = this;
        var name = util.getDefaultOption(_this.args, 0);
        var options  = util.getGlobalOptions();
        var modules = util.getModuleProposal(options.appDir);

        if (modules.length === 0) {
          throw new Error('decorator must be created in a module, but no modules exist. Create a module using "slush angular-gulp:module <module-Name>".');
        }

        inquirer.prompt([{
            type: 'input',
            name: 'fileName',
            message: 'What is the name of your decorator?',
            default: name
        }, {
            type: 'list',
            name: 'module',
            message: 'What is your AngularJS module name?',
            choices: modules
        }], function(answers) {
            //Init
            answers.nameDashed = _.slugify(util.getNameProposal());
            answers.scriptAppName =  _.camelize(answers.nameDashed) + '.' +answers.module ;
            answers.classedName = _.camelize(answers.fileName);
            answers.classedNameDashed = _.slugify(answers.fileName);
            answers.classedModule = _.capitalize(_.camelize(answers.module));

            //Source
            gulp.src(__dirname + '/../templates/decorator/decorator.js')
                .pipe(template(answers))
                .pipe(rename(answers.fileName + '-decorator.js'))
                .pipe(conflict(options.base + options.appDir + '/components/' + answers.module))
                .pipe(gulp.dest(options.base + options.appDir + '/components/' + answers.module))
                .on('finish', function() {
                    done();
                });
        });
    });
}
})();
