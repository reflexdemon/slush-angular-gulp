var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

module.exports = function(dir) {
	'use strict';

	if (typeof dir != 'string') {
		dir = 'tasks';
	}

	if (dir[0] !== path.sep && dir.slice(0, 2) !== '.' + path.sep) {
		dir = path.join(process.cwd(), dir);
	}

	fs
		.readdirSync(dir)
		.forEach(function(filename) {
			var file = path.join(dir, filename);
			var stat = fs.statSync(file);

			if (stat.isFile() && filename.slice(-3) !== '.js') {
				return;
			}

			var taskname = filename.slice(0, -3);
			var taskinfo = require(file);

			gulp.task.apply(gulp, [taskname].concat(taskinfo));
		});
};
