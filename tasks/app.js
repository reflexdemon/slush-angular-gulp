(function() {
    /**
     * App Task
     * This is the main task that is invoked for the processing of the slushfile.js
     */
    var gulp = require('gulp'),
        install = require('gulp-install'),
        conflict = require('gulp-conflict'),
        template = require('gulp-template'),
        rename = require('gulp-rename'),
        inquirer = require('inquirer'),
        _ = require('lodash');

    //Local dependencies
    var util = require('../util');

    module.exports = function(gulp) {
        'use strict';
        _.extend(_, require('underscore.string'));
        var examples = ["todo", "heat"];

        gulp.task('app', function(done) {
            var _this = this;
            //User Input
            inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'What do you want to name your AngularJS app?',
                    default: util.getDefaultOption(_this.args, 0) || util.getNameProposal()
                }, {
                    type: 'list',
                    name: 'csstype',
                    message: 'What CSS preprocessor do you want to use?',
                    default: 'less',
                    choices: [{
                        name: 'LESS',
                        value: 'less'
                    }, {
                        name: 'Stylus',
                        value: 'styl'
                    }, {
                        name: 'Sass',
                        value: 'sass'
                    }]
                }, {
                    type: 'confirm',
                    name: 'middleware',
                    message: 'Do you want to use middleware for proxy support?',
                    default: true
                }, {
                    type: 'checkbox',
                    name: 'example',
                    message: 'Please select the examples that needs to be included:',
                    choices: [{
                            name: 'A Simple TODO application to demo the AngularJS',
                            value: 'todo',
                            checked: true
                        },
                        new inquirer.Separator("These require server side REST calls and it is highly recommended to use the middleware support:"), {
                            name: 'A Simple example to show how to make server call for non persistance service calls (heat)',
                            value: 'heat',
                            checked: true
                        }
                    ]
                }],
                function(answers) {
                    //Hande for user response
                    answers.nameDashed = _.slugify(answers.name);
                    answers.modulename = _.camelize(answers.nameDashed);
                    var files = [__dirname + '/../templates/app/**'];
                    var exclude = _.xor(examples, answers.example);
                    _.each(exclude, function(choice) {
                        files.push('!' + __dirname + '/../templates/app/src/app/' + choice + '/**');
                        files.push('!' + __dirname + '/../templates/app/src/app/' + choice);
                    });
                    /*
                    { name: 'my-angular-app',
                      csstype: 'less',
                      middleware: true,
                      example: [ 'todo', 'heat', settings: { todo: 'todo', heat: 'heat' } ],
                      nameDashed: 'my-angular-app',
                      modulename: 'myAngularApp',
                      styleData:
                       { plugin: 'gulp-less',
                         pluginVersion: '^1.2.3',
                         pipeCommand: 'g.less()',
                         extension: 'less' } }
                     */
                    answers.exampleSettings = {};
                    _.each(answers.example, function(item) {
                        answers.exampleSettings[item] = item;
                    });
                    answers.styleData = util.cssTypeData[answers.csstype];
                    console.log("ANSWERS:", answers);
                    return gulp.src(files)
                        .pipe(template(answers))
                        .pipe(rename(function(file) {
                            if (file.extname === '.css') {
                                file.extname = '.' + answers.styleData.extension;
                            } else if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
                        .pipe(conflict('./'))
                        .pipe(gulp.dest('./'))
                        .pipe(install())
                        .on('finish', function() {
                            done();
                        });
                });
        });
    }

})();
