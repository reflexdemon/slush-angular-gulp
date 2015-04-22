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
        },{
            type: 'checkbox',
            name: 'config',
            message: 'Which configuration files would you like to be seperate?',
            choices:[{
                name: 'config',
                value: 'config'
            },{
                name: 'routes',
                value: 'routes'
            }]
        }/*,{
            type: 'confirm',
            name: 'css',
            message: 'Will this module encapsulate its own styles?',
            default: false
        }*/], function(answers) {
            //Init
            answers.nameDashed = _.slugify(util.getNameProposal());
            answers.scriptAppName =  _.camelize(answers.nameDashed) + '.' + answers.module ;
            //Generate
            if(answers.config.indexOf('config')>-1) {
                gulp.src(__dirname + '/../templates/module/config.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.module + '-config.js'))
                    .pipe(conflict(options.base + options.appDir +'/components/'+ answers.module))
                    .pipe(gulp.dest(options.base + options.appDir +'/components/'+ answers.module))
            }
            if(answers.config.indexOf('routes')>-1) {
                gulp.src(__dirname + '/../templates/module/routes.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.module + '-routes.js'))
                    .pipe(conflict(options.base + options.appDir +'/components/'+ answers.module))
                    .pipe(gulp.dest(options.base + options.appDir +'/components/'+ answers.module))
            }
            /* todo(Aquila) check what preprocessor is being used and name files appropriately
            if(answers.css) {
                gulp.src(__dirname + '/../templates/module/styles.css')
                    .pipe(rename(answers.module + '.css'))
                    .pipe(conflict(options.base + options.appDir +'/'+ answers.module))
                    .pipe(gulp.dest(options.base + options.appDir +'/'+ answers.module))
            }*/
            gulp.src(__dirname + '/../templates/module/module.js')
                .pipe(template(answers))
                .pipe(rename(answers.module + '-module.js'))
                .pipe(conflict(options.base + options.appDir +'/components/'+ answers.module))
                .pipe(gulp.dest(options.base + options.appDir +'/components/'+ answers.module))
                .on('finish', function() {
                    done();
                });
        });
    });
}

})();
