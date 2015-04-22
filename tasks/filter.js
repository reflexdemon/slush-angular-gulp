/**
 * filter Task
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

    gulp.task('filter', function(done) {
        var _this = this;
        var name = util.getDefaultOption(_this.args, 0);
        var options  = util.getGlobalOptions();
        var modules = util.getModuleProposal(options.appDir);

        if (modules.length === 0) {
          throw new Error('filter must be created in a module, but no modules exist. Create a module using "slush angular-gulp:module <module-Name>".');
        }

        inquirer.prompt([{
            type: 'input',
            name: 'fileName',
            message: 'What is the name of your filter?',
            default: name
        }, {
            type: 'list',
            name: 'module',
            message: 'What is your AngularJS module name?',
            choices: modules
        }, {
            type: 'confirm',
            name: 'test',
            message: 'Do you want to include unit testing?',
            default: true
        }], function(answers) {
            //Init
            answers.nameDashed = _.slugify(util.getNameProposal());
            answers.scriptAppName =  _.camelize(answers.nameDashed) + '.' +answers.module ;
            answers.classedName = _.camelize(answers.fileName);
            answers.classedNameDashed = _.slugify(answers.fileName);

            // test
            if (answers.test) {
                gulp.src(__dirname + '/../templates/filter/filter.spec.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.fileName + '-filter.spec.js'))
                    .pipe(conflict(options.base + options.appDir + '/components/' + answers.module))
                    .pipe(gulp.dest(options.base + options.appDir + '/components/' + answers.module))
            }

            //Source
            gulp.src(__dirname + '/../templates/filter/filter.js')
                .pipe(template(answers))
                .pipe(rename(answers.fileName + '-filter.js'))
                .pipe(conflict(options.base + options.appDir + '/components/' + answers.module))
                .pipe(gulp.dest(options.base + options.appDir + '/components/' + answers.module))
                .on('finish', function() {
                    done();
                });
        });
    });
}
})();
