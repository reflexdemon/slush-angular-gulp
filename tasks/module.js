/**
 * module Task
 * This is the main task that is invoked for the processing of the slushfile.js
 */
(function() {

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    _ = require('underscore.string');

//Local dependencies
var util = require('../util');

module.exports = function(gulp) {
    'use strict';

    gulp.task('module', function(done) {
        var _this = this;
        var options  = util.getGlobalOptions();

        inquirer.prompt([{
            type: 'input',
            name: 'module',
            message: 'What is the name of your module?',
            default: util.getDefaultOption(_this.args, 0)
        }], function(answers) {
            //Init
            answers.nameDashed = _.slugify(util.getNameProposal());
            answers.scriptAppName =  _.camelize(answers.nameDashed) + '.' + answers.module ;
            //Generate
            gulp.src(__dirname + '/../templates/module/module.js')
                .pipe(template(answers))
                .pipe(rename(answers.module + '-module.js'))
                .pipe(conflict(options.base + options.appDir +'/'+ answers.module))
                .pipe(gulp.dest(options.base + options.appDir +'/'+ answers.module))
                .on('finish', function() {
                    done();
                });
        });
    });
}

})();
