/**
 * Controller Task
 * This is the main task that is invoked for the processing of the slushfile.js
 */

(function () {
    var gulp = require('gulp'),
        install = require('gulp-install'),
        conflict = require('gulp-conflict'),
        template = require('gulp-template'),
        rename = require('gulp-rename'),
        inquirer = require('inquirer')
    _ = require('underscore.string');

    //Local dependencies
    var util = require('../util');

    module.exports = function (gulp) {
        'use strict';

        gulp.task('controller', function (done) {
            var _this = this;
            var name = util.getDefaultOption(_this.args, 0);
            var options = util.getGlobalOptions();
            var modules = util.getModuleProposal(options.appDir);

            if (modules.length === 0) {
                throw new Error('Controller must be created in a module, but no modules exist. Create a module using "slush angular-gulp:module <module-Name>".');
            }

            inquirer.prompt([{
                type: 'input',
                name: 'fileName',
                message: 'What is the name of your controller?'
            }, {
                type: 'list',
                name: 'module',
                message: 'What is your AngularJS module name?',
                choices: modules
            }, {
                type: 'confirm',
                name: 'spec',
                message: 'Do you want to include unit testing?',
                default: true
            }]).then(function (answers) {
                //Init
                answers.nameDashed = _.slugify(util.getNameProposal());
                answers.scriptAppName = _.camelize(answers.nameDashed) + '.' + answers.module;
                answers.classedName = _.capitalize(_.camelize(answers.fileName));
                 //console.log('answers:', answers);
                // test
                if (answers.spec === true) {
                    var counter = 0;

                    gulp.src(__dirname + '/../templates/controller/controller.spec.js')
                        .pipe(template(answers))
                        .pipe(rename(answers.fileName + '-controller.spec.js'))
                        .pipe(conflict(options.base + options.appDir + '/' + answers.module))
                        .pipe(gulp.dest(options.base + options.appDir + '/' + answers.module))
                        .on('finish', function() {
                            if (++counter > 1) {
                                done();
                            }
                        });

                    gulp.src(__dirname + '/../templates/controller/controller.js')
                        .pipe(template(answers))
                        .pipe(rename(answers.fileName + '-controller.js'))
                        .pipe(conflict(options.base + options.appDir + '/' + answers.module))
                        .pipe(gulp.dest(options.base + options.appDir + '/' + answers.module))
                        .on('finish', function() {
                            if (++counter > 1) {
                                done();
                            }
                        });

                } else {
                    gulp.src(__dirname + '/../templates/controller/controller.js')
                        .pipe(template(answers))
                        .pipe(rename(answers.fileName + '-controller.js'))
                        .pipe(conflict(options.base + options.appDir + '/' + answers.module))
                        .pipe(gulp.dest(options.base + options.appDir + '/' + answers.module))
                        .on('finish', function () {
                            done();
                        });

                }
                // //Source
                // gulp.src(__dirname + '/../templates/controller/controller.js')
                //     .pipe(template(answers))
                //     .pipe(rename(answers.fileName + '-controller.js'))
                //     .pipe(conflict(options.base + options.appDir + '/' + answers.module))
                //     .pipe(gulp.dest(options.base + options.appDir + '/' + answers.module))
                //     .on('finish', function() {
                //         done();
                //     });
            });
        });
    }
})();
